#!/usr/bin/env python3
"""Checks for the LLM Wiki homework project. Standard library only.

    python tools/check_project.py          print the report
    python tools/check_project.py --log    also write logs/check_<timestamp>.txt

Exit code 1 if any FAIL. WARN never fails the run.
"""
import datetime
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
rows = []  # (level, check, message)

LEAK_PATTERNS = [
    r"SKILL\.md", r"mc_modeling", r"anti有話要說", r"briefs[/\\]",
    r"learning_budget", r"C:\\", r"Users[/\\]ASUS", r"模組開發2", r"MC審計",
]
LATEX_MD = re.compile(r"\$|\\(?:text|times|sim|le|cdot|circ|omega|phi|sin)\b")
LATEX_HTML = re.compile(r"\\(?:text|times|sim|le|cdot|circ)\b|\$\d")
REF = re.compile(r'(?:href|src)="([^"]+)"|\]\(([^)\s]+)\)')
RULE = re.compile(r"([^{}]+)\{([^{}]*)\}")
FONT = re.compile(r"font-size:\s*([\d.]+)rem")


def add(level, check, msg):
    rows.append((level, check, msg))


def rd(p):
    return p.read_text(encoding="utf-8", errors="replace")


def rel(p):
    return p.relative_to(ROOT).as_posix()


def gif_transparent(p):
    data = p.read_bytes()
    i = data.find(b"\x21\xf9\x04")
    while i != -1:
        if data[i + 3] & 1:
            return True
        i = data.find(b"\x21\xf9\x04", i + 1)
    return False


def check_sources():
    files = sorted((ROOT / "sources").glob("S[0-9]*_*.md"))
    ids = set()
    if len(files) >= 5:
        add("PASS", "sources.count", f"{len(files)} 份來源筆記（需要 >= 5）")
    else:
        add("FAIL", "sources.count", f"只有 {len(files)} 份來源筆記（需要 >= 5）")
    for f in files:
        ids.add(f.name.split("_")[0])
        t = rd(f)
        if re.search(r"^- URL: https?://\S+", t, re.M):
            add("PASS", f"sources.url {rel(f)}", "有網址")
        else:
            add("FAIL", f"sources.url {rel(f)}", "缺少 `- URL:` 行")
        if re.search(r"^- 抓取日期: \d{4}-\d{2}-\d{2}", t, re.M):
            add("PASS", f"sources.date {rel(f)}", "有抓取日期")
        else:
            add("FAIL", f"sources.date {rel(f)}", "缺少 `- 抓取日期:` 行")
    return ids


def check_wiki(source_ids):
    pages = sorted((ROOT / "wiki").glob("[0-9][0-9]_*.md"))
    if len(pages) >= 5:
        add("PASS", "wiki.pages", f"{len(pages)} 篇 wiki 頁")
    else:
        add("FAIL", "wiki.pages", f"只有 {len(pages)} 篇 wiki 頁（需要 >= 5）")
    for name in ("index.md", "log.md"):
        p = ROOT / "wiki" / name
        if p.exists():
            add("PASS", f"wiki.{name}", "存在")
        else:
            add("FAIL", f"wiki.{name}", "缺少")
    for p in pages:
        cites = set(re.findall(r"\[(S\d+)\]", rd(p)))
        if not cites:
            add("FAIL", f"wiki.cite {rel(p)}", "沒有任何 [S#] 來源引用")
        elif cites - source_ids:
            add("FAIL", f"wiki.cite {rel(p)}", f"引用了不存在的來源：{sorted(cites - source_ids)}")
        else:
            add("PASS", f"wiki.cite {rel(p)}", f"引用 {len(cites)} 個來源：{', '.join(sorted(cites))}")


def check_latex():
    bad = []
    md_files = list((ROOT / "wiki").glob("*.md")) + list((ROOT / "sources").glob("*.md"))
    md_files += list((ROOT / "docs").glob("*.md")) + [ROOT / "README.md"]
    for p in md_files:
        if not p.exists():
            continue
        for n, line in enumerate(rd(p).splitlines(), 1):
            if LATEX_MD.search(line):
                bad.append(f"{rel(p)}:{n}")
    html = ROOT / "index.html"
    for n, line in enumerate(rd(html).splitlines(), 1):
        if LATEX_HTML.search(line):
            bad.append(f"{rel(html)}:{n}")
    if bad:
        shown = ", ".join(bad[:10]) + (" …" if len(bad) > 10 else "")
        add("FAIL", "latex", f"{len(bad)} 行仍含 LaTeX 或 $ 符號：{shown}")
    else:
        add("PASS", "latex", "沒有 LaTeX 或 $ 符號")


def check_leaks():
    hits = []
    for p in ROOT.rglob("*"):
        if not p.is_file():
            continue
        parts = p.relative_to(ROOT).parts
        if parts[0] in ("tools", "logs", ".git"):
            continue
        if p.suffix.lower() not in (".md", ".html", ".css", ".js", ".json", ".txt"):
            continue
        t = rd(p)
        for pat in LEAK_PATTERNS:
            if re.search(pat, t):
                hits.append(f"{rel(p)} 命中 {pat}")
    if hits:
        add("FAIL", "leak", "可能外洩內部路徑或檔名：" + "；".join(hits))
    else:
        add("PASS", "leak", "沒有內部路徑或私有檔名")


def check_html():
    h = rd(ROOT / "index.html")
    n = len(re.findall(r'<section class="slide', h))
    add("PASS" if n == 10 else "FAIL", "html.slides", f"{n} 頁投影片（需要 10）")
    hot = set(re.findall(r'<button data-slide="(\d+)"[^>]*hotbar-slot', h))
    want = {str(i) for i in range(1, 11)}
    if hot == want:
        add("PASS", "html.hotbar", "熱鍵 1–10 對應 10 頁")
    else:
        add("FAIL", "html.hotbar", f"熱鍵頁碼不完整：{sorted(hot)}")


def check_links():
    files = [ROOT / "index.html", ROOT / "README.md"]
    for d in ("wiki", "sources", "docs"):
        files += list((ROOT / d).glob("*.md"))
    broken = []
    for p in files:
        if not p.exists():
            continue
        for m in REF.finditer(rd(p)):
            target = (m.group(1) or m.group(2) or "").split("#")[0].split("?")[0]
            if not target or re.match(r"^(https?:|mailto:|data:|javascript:)", target):
                continue
            if not (p.parent / target).exists():
                broken.append(f"{rel(p)} → {target}")
    if broken:
        add("FAIL", "links", f"{len(broken)} 個連結找不到檔案：" + "；".join(broken[:10]))
    else:
        add("PASS", "links", "index.html、README 與 md 內的本地連結都存在")


def check_gifs():
    h = rd(ROOT / "index.html")
    for g in sorted(set(re.findall(r'src="(\./assets/[^"]+\.gif)"', h))):
        p = ROOT / g[2:]
        ok = p.exists() and gif_transparent(p)
        if ok:
            add("PASS", f"gif.transparent {g}", "有透明旗標")
        else:
            add("FAIL", f"gif.transparent {g}", "沒有透明旗標或檔案不存在")


def check_fonts():
    css = re.sub(r"/\*.*?\*/", "", rd(ROOT / "style.css"), flags=re.S)
    small = []
    for sel, body in RULE.findall(css):
        m = FONT.search(body)
        if m and float(m.group(1)) < 0.95:
            small.append(f"{' '.join(sel.split())} {m.group(1)}rem")
    if small:
        add("WARN", "css.font", f"{len(small)} 處字級小於 0.95rem：" + "；".join(small))
    else:
        add("PASS", "css.font", "沒有小於 0.95rem 的字級")


def check_unused_assets():
    corpus = rd(ROOT / "index.html") + rd(ROOT / "README.md")
    for d in ("wiki", "sources", "docs"):
        for p in (ROOT / d).glob("*.md"):
            corpus += rd(p)
    unused = [rel(p) for p in sorted((ROOT / "assets").rglob("*"))
              if p.is_file() and p.name not in corpus]
    if unused:
        add("WARN", "assets.unused", f"{len(unused)} 個素材沒有被引用：" + "、".join(unused))
    else:
        add("PASS", "assets.unused", "所有素材都有被引用")


def check_readme():
    t = rd(ROOT / "README.md")
    need = ["wiki/index.md", "logs/", "tools/check_project.py"]
    miss = [n for n in need if n not in t]
    if miss:
        add("FAIL", "readme.links", f"README 缺少：{miss}")
    else:
        add("PASS", "readme.links", "README 連到 wiki 索引、logs 與檢查腳本")


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    ids = check_sources()
    check_wiki(ids)
    check_latex()
    check_leaks()
    check_html()
    check_links()
    check_gifs()
    check_fonts()
    check_unused_assets()
    check_readme()
    now = datetime.datetime.now()
    lines = [f"檢查時間: {now:%Y-%m-%d %H:%M:%S}", f"專案資料夾: {ROOT.name}", ""]
    lines += [f"[{lv}] {ck} — {msg}" for lv, ck, msg in rows]
    counts = {k: sum(1 for r in rows if r[0] == k) for k in ("PASS", "WARN", "FAIL")}
    lines += ["", f"合計: PASS {counts['PASS']} / WARN {counts['WARN']} / FAIL {counts['FAIL']}"]
    text = "\n".join(lines)
    print(text)
    if "--log" in sys.argv:
        out = ROOT / "logs" / f"check_{now:%Y%m%d_%H%M%S}.txt"
        out.parent.mkdir(exist_ok=True)
        out.write_text(text + "\n", encoding="utf-8")
        print(f"已寫入 {rel(out)}")
    return 1 if counts["FAIL"] else 0


if __name__ == "__main__":
    sys.exit(main())
