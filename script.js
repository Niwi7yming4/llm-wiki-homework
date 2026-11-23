/**
 * ==============================================================================
 * ANTI ACADEMY // MINECRAFT PRESENTATION CONTROLLER
 * Vanilla JS: Dynamic Particle Canvas, MC HUD (Hearts/XP/Hunger), Hotbar, Drawer
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  const slides = Array.from(document.querySelectorAll('.slide'));
  const totalSlides = slides.length;
  let currentSlide = 1;

  // DOM elements
  const heartsContainer = document.getElementById('hearts-container');
  const hungerContainer = document.getElementById('hunger-container');
  const xpFill = document.getElementById('xp-fill');
  const xpLevel = document.getElementById('xp-level');
  const slideCounter = document.getElementById('slide-counter');
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');
  const hotbarSlots = Array.from(document.querySelectorAll('.hotbar-slot'));

  const btnOverview = document.getElementById('btn-overview');
  const btnFullscreen = document.getElementById('btn-fullscreen');
  const btnParticles = document.getElementById('btn-particles');
  const txtParticles = document.getElementById('txt-particles');
  const btnReport = document.getElementById('btn-report');
  const reportModal = document.getElementById('report-modal');

  const drawerOverlay = document.getElementById('drawer-overlay');
  const slideDrawer = document.getElementById('slide-drawer');
  const drawerList = document.getElementById('drawer-list');
  const btnCloseDrawer = document.getElementById('btn-close-drawer');
  const canvas = document.getElementById('bg-canvas');

  // Slide titles for drawer
  const slideTitles = [
    '01. 封面 // 狐獴 3D 體素建模大師班',
    '02. 空間尺度 // 16px 鐵律與梨形解剖學',
    '03. 骨骼拓撲 // Pivot 樞軸吸附定律',
    '04. 反髒貼圖 // 1:1 像素簇與結構化矩陣',
    '05. 四階色相 // 冷陰影與陽光暖高光',
    '06. 生物動力 // 預備動作與非同步律動',
    '07. 阻尼物理 // 刨土、日光浴與尾部慣性',
    '08. 家族微劇場 // 荒漠聚落與相位差',
    '09. 學院訓練法 // 讀檔預算與 4 大變體',
    '10. 結業自檢 // 6 大關卡與作業報告'
  ];

  /* --------------------------------------------------------------------------
   * 1. MINECRAFT HUD INITIALIZATION (Hearts, Hunger)
   * -------------------------------------------------------------------------- */
  const HEART_SVG = `
    <svg viewBox="0 0 9 9" class="pixel-icon-xs">
      <path d="M1 1h2v1h1v1h1V2h1V1h2v1h1v3H8v1H7v1H6v1H5v1H4V8H3V7H2V6H1V5H0V2h1V1z" fill="#000000"/>
      <path d="M1 2h2v1h1v1h1V3h1V2h2v3H7v1H6v1H5v1H4V7H3V6H2V5H1V2z" fill="#ff1a1a"/>
      <rect x="2" y="2" width="1" height="1" fill="#ff9999"/>
    </svg>`;

  const HUNGER_SVG = `
    <svg viewBox="0 0 9 9" class="pixel-icon-xs">
      <path d="M4 1h4v4H7v1H5v1H3v1H1V6h1V4h1V2h1V1z" fill="#000000"/>
      <path d="M4 2h3v3H5v1H4V4H3V3h1V2z" fill="#b86f35"/>
      <rect x="5" y="2" width="1" height="1" fill="#e09b5e"/>
      <rect x="2" y="6" width="1" height="1" fill="#ffffff"/>
    </svg>`;

  function initHUD() {
    heartsContainer.innerHTML = '';
    hungerContainer.innerHTML = '';
    for (let i = 0; i < 10; i++) {
      const h = document.createElement('div');
      h.innerHTML = HEART_SVG;
      heartsContainer.appendChild(h);

      const d = document.createElement('div');
      d.innerHTML = HUNGER_SVG;
      hungerContainer.appendChild(d);
    }
  }

  /* --------------------------------------------------------------------------
   * 2. DRAWER LIST INITIALIZATION
   * -------------------------------------------------------------------------- */
  function initDrawer() {
    drawerList.innerHTML = '';
    slides.forEach((_, idx) => {
      const slideNum = idx + 1;
      const li = document.createElement('li');
      li.className = `drawer-item mc-slot ${slideNum === 1 ? 'active' : ''}`;
      li.innerHTML = `
        <span class="mc-text-gold font-mono">${String(slideNum).padStart(2, '0')}</span>
        <span>${slideTitles[idx] || `Slide ${slideNum}`}</span>
      `;
      li.addEventListener('click', () => {
        goToSlide(slideNum);
        closeDrawer();
      });
      drawerList.appendChild(li);
    });
  }

  /* --------------------------------------------------------------------------
   * 3. SLIDE NAVIGATION & STATE SYNC
   * -------------------------------------------------------------------------- */
  function goToSlide(target) {
    if (target < 1) target = 1;
    if (target > totalSlides) target = totalSlides;
    currentSlide = target;

    // Toggle slide visibility
    slides.forEach((slide, idx) => {
      slide.classList.toggle('active', idx + 1 === currentSlide);
    });

    // Update XP Bar & Level
    const pct = (currentSlide / totalSlides) * 100;
    xpFill.style.width = `${pct}%`;
    xpLevel.textContent = currentSlide;

    // Update slide counter
    slideCounter.textContent = `${String(currentSlide).padStart(2, '0')} / ${String(totalSlides).padStart(2, '0')}`;

    // Update Hotbar Active Slot
    hotbarSlots.forEach((slot, idx) => {
      slot.classList.toggle('active-slot', idx + 1 === currentSlide);
    });

    // Update Drawer Active Item
    const drawerItems = drawerList.querySelectorAll('.drawer-item');
    drawerItems.forEach((item, idx) => {
      item.classList.toggle('active', idx + 1 === currentSlide);
    });

    // Button states
    btnPrev.disabled = currentSlide === 1;

    // Sync hash
    window.location.hash = `slide-${currentSlide}`;
  }

  function nextSlide() {
    if (currentSlide < totalSlides) {
      goToSlide(currentSlide + 1);
    } else {
      goToSlide(1);
    }
  }

  function prevSlide() {
    if (currentSlide > 1) {
      goToSlide(currentSlide - 1);
    }
  }

  // Hotbar clicks
  hotbarSlots.forEach(slot => {
    slot.addEventListener('click', () => {
      const target = parseInt(slot.getAttribute('data-slide'), 10);
      if (!isNaN(target)) goToSlide(target);
    });
  });

  btnNext.addEventListener('click', nextSlide);
  btnPrev.addEventListener('click', prevSlide);

  /* --------------------------------------------------------------------------
   * 4. OVERVIEW DRAWER & REPORT MODAL TOGGLES
   * -------------------------------------------------------------------------- */
  function openDrawer() {
    drawerOverlay.classList.add('open');
    slideDrawer.classList.add('open');
  }

  function closeDrawer() {
    drawerOverlay.classList.remove('open');
    slideDrawer.classList.remove('open');
  }

  btnOverview.addEventListener('click', openDrawer);
  btnCloseDrawer.addEventListener('click', closeDrawer);
  drawerOverlay.addEventListener('click', closeDrawer);

  btnReport.addEventListener('click', () => {
    reportModal.classList.add('open');
  });

  reportModal.addEventListener('click', (e) => {
    if (e.target === reportModal) {
      reportModal.classList.remove('open');
    }
  });

  /* --------------------------------------------------------------------------
   * 5. FULLSCREEN HANDLER
   * -------------------------------------------------------------------------- */
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => console.warn(err));
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
    }
  }
  btnFullscreen.addEventListener('click', toggleFullscreen);

  /* --------------------------------------------------------------------------
   * 6. BACKGROUND PARTICLES CANVAS (Sand dust / spore drift)
   * -------------------------------------------------------------------------- */
  let particlesActive = true;
  let animId = null;
  const ctx = canvas.getContext('2d');
  let width, height;
  const particles = [];

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  const PARTICLE_COLORS = ['#d4b288', '#ba966e', '#8b5a2b', '#80ff20', '#3de0e5'];

  for (let i = 0; i < 40; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() > 0.8 ? 4 : 2,
      color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
      speedY: 0.3 + Math.random() * 0.7,
      speedX: (Math.random() - 0.5) * 0.4,
      sway: Math.random() * Math.PI * 2
    });
  }

  function drawParticles() {
    if (!particlesActive) {
      ctx.clearRect(0, 0, width, height);
      return;
    }
    ctx.clearRect(0, 0, width, height);

    for (let p of particles) {
      p.sway += 0.02;
      p.x += p.speedX + Math.sin(p.sway) * 0.3;
      p.y += p.speedY;

      if (p.y > height) {
        p.y = -10;
        p.x = Math.random() * width;
      }
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;

      ctx.fillStyle = p.color;
      ctx.fillRect(Math.floor(p.x), Math.floor(p.y), p.size, p.size);
    }
    animId = requestAnimationFrame(drawParticles);
  }

  btnParticles.addEventListener('click', () => {
    particlesActive = !particlesActive;
    txtParticles.textContent = particlesActive ? '粒子: 開' : '粒子: 關';
    if (particlesActive) {
      drawParticles();
    }
  });

  /* --------------------------------------------------------------------------
   * 7. KEYBOARD CONTROLS & GESTURES
   * -------------------------------------------------------------------------- */
  document.addEventListener('keydown', (e) => {
    if (reportModal.classList.contains('open')) {
      if (e.key === 'Escape') reportModal.classList.remove('open');
      return;
    }
    if (slideDrawer.classList.contains('open')) {
      if (e.key === 'Escape') closeDrawer();
      return;
    }

    // Number keys 1-9, 0 -> Direct jump
    if (e.key >= '1' && e.key <= '9') {
      goToSlide(parseInt(e.key, 10));
      return;
    }
    if (e.key === '0') {
      goToSlide(10);
      return;
    }

    switch (e.key) {
      case 'ArrowRight':
      case 'PageDown':
      case ' ':
        e.preventDefault();
        nextSlide();
        break;
      case 'ArrowLeft':
      case 'PageUp':
        e.preventDefault();
        prevSlide();
        break;
      case 'f':
      case 'F':
        toggleFullscreen();
        break;
      case 'o':
      case 'O':
        if (slideDrawer.classList.contains('open')) closeDrawer();
        else openDrawer();
        break;
      case 'p':
      case 'P':
        btnParticles.click();
        break;
      case 'r':
      case 'R':
        reportModal.classList.toggle('open');
        break;
      case 'Home':
        goToSlide(1);
        break;
      case 'End':
        goToSlide(totalSlides);
        break;
      default:
        break;
    }
  });

  // Touch Swipe for Mobile
  let touchStartX = 0;
  let touchEndX = 0;
  document.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, false);
  document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 50) {
      if (diff < 0) nextSlide();
      else prevSlide();
    }
  }, false);

  // Parse Initial Hash
  function parseInitialHash() {
    const match = window.location.hash.match(/slide-(\d+)/);
    if (match && match[1]) {
      const num = parseInt(match[1], 10);
      if (num >= 1 && num <= totalSlides) return num;
    }
    return 1;
  }

  // Start
  initHUD();
  initDrawer();
  goToSlide(parseInitialHash());
  drawParticles();
});
