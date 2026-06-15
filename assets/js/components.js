// Reusable Header and Footer Web Components with Dynamic Path Routing

function getPathPrefix() {
  const path = window.location.pathname;
  // If URL contains subdirectories, append path prefix
  if (
    path.includes('/products/') ||
    path.includes('/services/') ||
    path.includes('/knowledge-bank/') ||
    path.includes('/requests/') ||
    path.includes('/about/')
  ) {
    return '../';
  }
  return '';
}

class SiteHeader extends HTMLElement {
  connectedCallback() {
    const prefix = getPathPrefix();

    // Set active link highlight based on current page
    const currentPath = window.location.pathname;

    this.innerHTML = `
      <header class="site-header">
        <div class="container header-wrap">
          <a href="${prefix}index.html" class="logo-link">
            <img src="${prefix}assets/logo2s.svg" class="logo-img logo-white" alt="Eximius Power & Energy">
            <img src="${prefix}assets/logo1s.svg" class="logo-img logo-color" alt="Eximius Power & Energy">
          </a>
          
          <button class="hamburger" id="hamburgerBtn" aria-label="Toggle Navigation">
            <span></span>
            <span></span>
            <span></span>
          </button>
          
          <nav>
            <ul class="nav-menu" id="navMenu">
              <li class="nav-item ${currentPath.endsWith('index.html') || currentPath.endsWith('/') ? 'active' : ''}">
                <a href="${prefix}index.html" class="nav-link">Home</a>
              </li>
              
              <li class="nav-item dropdown-toggle">
                <a href="#" class="nav-link">Products</a>
                <ul class="dropdown">
                  <li class="dropdown-item">
                    <a href="${prefix}products/sineng-inverter.html" class="dropdown-link">Sineng Inverter</a>
                  </li>
                  <li class="dropdown-item">
                    <a href="${prefix}products/energy-storage.html" class="dropdown-link">Energy Storage System</a>
                  </li>
                </ul>
              </li>
              
              <li class="nav-item dropdown-toggle">
                <a href="#" class="nav-link">Our Services</a>
                <ul class="dropdown">
                  <li class="dropdown-item">
                    <a href="${prefix}services/solar-pv-installation.html" class="dropdown-link">Solar PV Installation</a>
                  </li>
                  <li class="dropdown-item">
                    <a href="${prefix}services/after-sales-maintenance.html" class="dropdown-link">After-Sales & Maintenance</a>
                  </li>
                </ul>
              </li>
              
              <li class="nav-item dropdown-toggle">
                <a href="#" class="nav-link">Knowledge Bank</a>
                <ul class="dropdown">
                  <li class="dropdown-item">
                    <a href="${prefix}knowledge-bank/select-inverter.html" class="dropdown-link">Inverter Selection Guide</a>
                  </li>
                  <li class="dropdown-item">
                    <a href="${prefix}knowledge-bank/select-battery.html" class="dropdown-link">Battery Selection Guide</a>
                  </li>
                  <li class="dropdown-item">
                    <a href="${prefix}knowledge-bank/advancements-innovations.html" class="dropdown-link">Solar Tech Advancements</a>
                  </li>
                  <li class="dropdown-item">
                    <a href="${prefix}knowledge-bank/footstep-power.html" class="dropdown-link">Footstep Power Tech</a>
                  </li>
                </ul>
              </li>
              
              <li class="nav-item dropdown-toggle">
                <a href="#" class="nav-link">Requests</a>
                <ul class="dropdown">
                  <li class="dropdown-item">
                    <a href="${prefix}requests/auth-letter.html" class="dropdown-link">Authorization Letter</a>
                  </li>
                  <li class="dropdown-item">
                    <a href="${prefix}requests/quotation.html" class="dropdown-link">Product Quotation</a>
                  </li>
                </ul>
              </li>
              
              <li class="nav-item dropdown-toggle">
                <a href="#" class="nav-link">About</a>
                <ul class="dropdown">
                  <li class="dropdown-item">
                    <a href="${prefix}about/epe.html" class="dropdown-link">Eximius P&E Profile</a>
                  </li>
                  <li class="dropdown-item">
                    <a href="${prefix}about/sineng.html" class="dropdown-link">Sineng Tech Profile</a>
                  </li>
                  <li class="dropdown-item">
                    <a href="${prefix}about/news.html" class="dropdown-link">News & Updates</a>
                  </li>
                </ul>
              </li>
              
              <li class="nav-item ${currentPath.endsWith('careers.html') ? 'active' : ''}">
                <a href="${prefix}careers.html" class="nav-link">Careers</a>
              </li>
              
              <li class="nav-item ${currentPath.endsWith('contact.html') ? 'active' : ''}">
                <a href="${prefix}contact.html" class="nav-link">Contact Us</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    `;

    this.setupInteractions();
  }

  setupInteractions() {
    const hamburger = this.querySelector('#hamburgerBtn');
    const navMenu = this.querySelector('#navMenu');
    const dropdownToggles = this.querySelectorAll('.dropdown-toggle');

    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('hamburger-open');
      navMenu.classList.toggle('mobile-active');
    });

    // Manage mobile dropdown clicks
    dropdownToggles.forEach(toggle => {
      const link = toggle.querySelector('.nav-link');
      link.addEventListener('click', (e) => {
        if (window.innerWidth <= 992) {
          e.preventDefault();
          toggle.classList.toggle('dropdown-open');
        }
      });
    });

    // Change navigation background on scroll
    window.addEventListener('scroll', () => {
      const header = this.querySelector('.site-header');
      if (window.scrollY > 50) {
        header.classList.add('header-active');
      } else {
        header.classList.remove('header-active');
      }
    });
  }
}

class SiteFooter extends HTMLElement {
  connectedCallback() {
    const prefix = getPathPrefix();
    const currentYear = new Date().getFullYear();

    this.innerHTML = `
      <footer class="site-footer">
        <div class="container">
          <div class="footer-top">
            <div class="footer-brand">
              <div class="footer-logo">EXIMIUS <span>P&E</span></div>
              <p class="footer-desc">
                Leading Sri Lanka toward a cleaner, greener tomorrow. Partnered with Sineng Electric to deliver intelligent solar inverters and next-generation utility-scale storage.
              </p>
              <div class="footer-socials">
                <a href="#" class="social-icon flex-center" aria-label="Facebook">
                  <svg viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                </a>
                <a href="#" class="social-icon flex-center" aria-label="Twitter">
                  <svg viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </a>
                <a href="#" class="social-icon flex-center" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
              </div>
            </div>
            
            <div class="footer-col">
              <div class="footer-title">Products</div>
              <ul class="footer-links">
                <li><a href="${prefix}products/sineng-inverter.html">Sineng Inverter</a></li>
                <li><a href="${prefix}products/energy-storage.html">Energy Storage Systems</a></li>
              </ul>
            </div>
            
            <div class="footer-col">
              <div class="footer-title">Requests</div>
              <ul class="footer-links">
                <li><a href="${prefix}requests/auth-letter.html">Authorization Letter</a></li>
                <li><a href="${prefix}requests/quotation.html">Quotation Request</a></li>
                <li><a href="${prefix}about/epe.html">About EPE</a></li>
                <li><a href="${prefix}careers.html">Join Our Team</a></li>
              </ul>
            </div>
            
            <div class="footer-col">
              <div class="footer-title">Contact Coordinates</div>
              <ul class="footer-info">
                <li>
                  <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                  <span>No. 45, Galle Road, Colombo 03, Sri Lanka</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                  <span>+94 11 234 5678 / +94 11 234 5679</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                  <span>info@eximiuspe.com / support@eximiuspe.com</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div class="footer-bottom">
            <div>&copy; ${currentYear} Eximius Power & Energy (Pvt) Ltd. All Rights Reserved.</div>
            <div>Registered SLSEA Provider: SLSEA/PV/2023/108</div>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define('site-header', SiteHeader);
customElements.define('site-footer', SiteFooter);

/* ═══════════════════════════════════════════════
   CURSOR PARTICLE SYSTEM — All Pages
   Neon green/blue particles that trail the cursor
   ═══════════════════════════════════════════════ */
(function initCursorParticles() {
  // Inject global cursor styles
  const style = document.createElement('style');
  style.textContent = `
    *, *::before, *::after { cursor: none !important; }

    #epe-cursor {
      position: fixed;
      width: 10px;
      height: 10px;
      background: #00e676;
      border-radius: 50%;
      pointer-events: none;
      z-index: 99999;
      transform: translate(-50%, -50%);
      transition: transform 0.08s ease, background 0.3s ease;
      box-shadow: 0 0 10px #00e676, 0 0 20px rgba(0,230,118,0.5);
      mix-blend-mode: normal;
    }

    #epe-cursor-ring {
      position: fixed;
      width: 36px;
      height: 36px;
      border: 1.5px solid rgba(0, 230, 118, 0.55);
      border-radius: 50%;
      pointer-events: none;
      z-index: 99998;
      transform: translate(-50%, -50%);
      transition: width 0.2s ease, height 0.2s ease,
                  border-color 0.2s ease, transform 0.12s ease;
    }

    .epe-particle {
      position: fixed;
      border-radius: 50%;
      pointer-events: none;
      z-index: 99997;
      transform: translate(-50%, -50%);
      animation: epeParticleFade var(--dur, 700ms) ease-out forwards;
    }

    @keyframes epeParticleFade {
      0%   { opacity: 1;   transform: translate(-50%, -50%) scale(1); }
      100% { opacity: 0;   transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(0.1); }
    }
  `;
  document.head.appendChild(style);

  // Create cursor elements
  const dot  = document.createElement('div'); dot.id  = 'epe-cursor';
  const ring = document.createElement('div'); ring.id = 'epe-cursor-ring';
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let mx = -200, my = -200;
  let rx = -200, ry = -200;
  let lastSpawn = 0;

  // Brand colours
  const COLORS = [
    '#00e676', '#00e676', '#00e676',   // mostly green
    '#00b0ff', '#00b0ff',              // some blue
    '#ffffff',                         // occasional white
  ];

  function spawnParticle(x, y) {
    const p = document.createElement('div');
    p.className = 'epe-particle';

    const size  = 4 + Math.random() * 5;          // 4–9 px
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    const dur   = 500 + Math.random() * 500;       // 500–1000 ms
    const angle = Math.random() * Math.PI * 2;
    const dist  = 20 + Math.random() * 40;
    const dx    = Math.cos(angle) * dist;
    const dy    = Math.sin(angle) * dist - 20;    // slight upward bias

    p.style.cssText = `
      left: ${x}px; top: ${y}px;
      width: ${size}px; height: ${size}px;
      background: ${color};
      box-shadow: 0 0 ${size * 1.5}px ${color};
      --dur: ${dur}ms;
      --dx: ${dx}px;
      --dy: ${dy}px;
    `;

    document.body.appendChild(p);
    setTimeout(() => p.remove(), dur);
  }

  // Smooth ring lag via rAF
  function loop() {
    // Move dot instantly
    dot.style.left  = mx + 'px';
    dot.style.top   = my + 'px';

    // Lag the ring slightly
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'py';
    ring.style.top  = ry + 'px';

    requestAnimationFrame(loop);
  }
  loop();

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;

    // Throttle particle spawn — one every ~30ms
    const now = Date.now();
    if (now - lastSpawn > 30) {
      spawnParticle(mx, my);
      lastSpawn = now;
    }
  });

  // Hide dot/ring when cursor leaves viewport
  document.addEventListener('mouseleave', () => {
    dot.style.opacity  = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity  = '1';
    ring.style.opacity = '1';
  });

  // Shrink ring on click
  document.addEventListener('mousedown', () => {
    dot.style.transform  = 'translate(-50%, -50%) scale(0.5)';
    ring.style.width     = '24px';
    ring.style.height    = '24px';
    ring.style.borderColor = 'rgba(0, 176, 255, 0.9)';
    // Burst of extra particles
    for (let i = 0; i < 8; i++) spawnParticle(mx, my);
  });
  document.addEventListener('mouseup', () => {
    dot.style.transform  = 'translate(-50%, -50%) scale(1)';
    ring.style.width     = '36px';
    ring.style.height    = '36px';
    ring.style.borderColor = 'rgba(0, 230, 118, 0.55)';
  });
})();
