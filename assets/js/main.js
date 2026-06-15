// Main Interactivity and Animations Script

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initHeroCanvas();
  initCalculator();
  initProductModals();
  initFileUpload();
});

/* 1. IntersectionObserver for Scroll Reveal Animations */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  
  if (revealElements.length === 0) return;
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
        // Once revealed, no need to track it anymore
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });
  
  revealElements.forEach(element => {
    revealObserver.observe(element);
  });
}

/* 2. Interactive Canvas Particle System (Hero Background) */
function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let animationFrameId;
  
  // Resize canvas to fill parent container
  function resizeCanvas() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
  }
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  // Particle configuration
  const particles = [];
  const particleCount = Math.min(60, Math.floor(window.innerWidth / 25));
  const connectionDistance = 120;
  
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = (Math.random() - 0.5) * 0.6;
      this.radius = Math.random() * 2 + 1;
      // Vibrant green or blue colors
      this.color = Math.random() > 0.5 ? '#00e676' : '#00b0ff';
    }
    
    update() {
      this.x += this.vx;
      this.y += this.vy;
      
      // Boundary checks
      if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
      if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
    }
    
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 6;
      ctx.shadowColor = this.color;
      ctx.fill();
      ctx.shadowBlur = 0; // Reset shadow for line drawing
    }
  }
  
  // Initialize particles
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
  
  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw particles
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    
    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < connectionDistance) {
          const alpha = (1 - dist / connectionDistance) * 0.15;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          // Green to Blue gradient line or solid glow
          ctx.strokeStyle = `rgba(0, 176, 255, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
    
    animationFrameId = requestAnimationFrame(animate);
  }
  
  animate();
  
  // Mouse interaction
  let mouse = { x: null, y: null };
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  
  canvas.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });
}

/* 3. Solar Calculator for Quotation Requests */
function initCalculator() {
  const billSlider = document.getElementById('billSlider');
  const billVal = document.getElementById('billVal');
  const systemSizeText = document.getElementById('systemSizeText');
  const monthlySavingsText = document.getElementById('monthlySavingsText');
  const paybackText = document.getElementById('paybackText');
  const systemSizeInput = document.getElementById('systemSizeInput');
  
  if (!billSlider) return;
  
  function updateSolarCalculation() {
    const monthlyBill = parseInt(billSlider.value);
    
    // Display LKR currency formatting
    billVal.textContent = `LKR ${monthlyBill.toLocaleString()}`;
    
    // Average unit cost in Sri Lanka (LKR per kWh) - Approx 55 LKR base rate avg
    const avgUnitCost = 55;
    const monthlyUnits = monthlyBill / avgUnitCost;
    
    // Daily energy requirement (kWh)
    const dailyUnits = monthlyUnits / 30;
    
    // 1kW solar system produces ~4 units (kWh) per day in Sri Lanka
    const estimatedSystemSize = Math.max(1.5, Math.round((dailyUnits / 4) * 2) / 2);
    
    // Monthly Savings (assuming solar covers ~90% of electricity bill)
    const monthlySavings = Math.round(monthlyBill * 0.9);
    
    // Payback period calculation (Est. cost of LKR 290,000 per kW / Monthly savings)
    const systemCost = estimatedSystemSize * 290000;
    const paybackYears = Math.round((systemCost / (monthlySavings * 12)) * 10) / 10;
    
    // Update UI elements
    systemSizeText.textContent = `${estimatedSystemSize} kW`;
    monthlySavingsText.textContent = `LKR ${monthlySavings.toLocaleString()}`;
    paybackText.textContent = `${paybackYears} Years`;
    
    if (systemSizeInput) {
      systemSizeInput.value = `${estimatedSystemSize} kW System (Est.)`;
    }
  }
  
  billSlider.addEventListener('input', updateSolarCalculation);
  updateSolarCalculation(); // Run once at start
}

/* 4. Product Specification Modals */
function initProductModals() {
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalContent = document.getElementById('modalContent');
  const closeBtn = document.getElementById('modalCloseBtn');
  const viewButtons = document.querySelectorAll('.view-specs-btn');
  
  if (!modalBackdrop || !modalContent) return;
  
  function openModal(title, specsHtml) {
    modalContent.querySelector('#modalTitle').textContent = title;
    modalContent.querySelector('#modalBody').innerHTML = specsHtml;
    
    modalBackdrop.classList.add('active');
    modalContent.style.visibility = 'visible';
    modalContent.style.opacity = '1';
    modalContent.style.transform = 'translate(-50%, -50%)';
  }
  
  function closeModal() {
    modalBackdrop.classList.remove('active');
    modalContent.style.opacity = '0';
    modalContent.style.transform = 'translate(-50%, -40%)';
    setTimeout(() => {
      modalContent.style.visibility = 'hidden';
    }, 300);
  }
  
  viewButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const title = btn.getAttribute('data-product');
      const specDataAttr = btn.getAttribute('data-specs');
      const specs = JSON.parse(specDataAttr);
      
      let html = '<table style="width:100%; border-collapse:collapse; margin-top:15px;">';
      for (const [key, val] of Object.entries(specs)) {
        html += `
          <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
            <td style="padding:12px 0; color:var(--text-muted); font-size:0.9rem;">${key}</td>
            <td style="padding:12px 0; color:var(--text-light); text-align:right; font-weight:600; font-size:0.9rem;">${val}</td>
          </tr>
        `;
      }
      html += '</table>';
      
      openModal(title, html);
    });
  });
  
  closeBtn.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', closeModal);
}

/* 5. Drag & Drop File Upload visual cues (Careers form) */
function initFileUpload() {
  const uploadBox = document.getElementById('fileUploadBox');
  const fileInput = document.getElementById('resumeUpload');
  const fileNameDisplay = document.getElementById('fileNameDisplay');
  
  if (!uploadBox || !fileInput) return;
  
  // Highlight drop area when dragging file over it
  ['dragenter', 'dragover'].forEach(eventName => {
    uploadBox.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      uploadBox.classList.add('dragover');
    }, false);
  });
  
  ['dragleave', 'drop'].forEach(eventName => {
    uploadBox.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      uploadBox.classList.remove('dragover');
    }, false);
  });
  
  // Handle file drop
  uploadBox.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    const files = dt.files;
    
    if (files.length > 0) {
      fileInput.files = files;
      updateFileName(files[0].name);
    }
  });
  
  // Handle click on box to select file
  uploadBox.addEventListener('click', () => {
    fileInput.click();
  });
  
  fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) {
      updateFileName(fileInput.files[0].name);
    }
  });
  
  function updateFileName(name) {
    fileNameDisplay.textContent = `Attached: ${name}`;
    fileNameDisplay.style.color = 'var(--neon-green)';
    fileNameDisplay.style.fontWeight = 'bold';
  }
}

// Reusable alert dispatcher for static forms
function submitStaticForm(e, successMsg) {
  e.preventDefault();
  const form = e.target;
  const originalBtn = form.querySelector('button[type="submit"]');
  const originalHtml = originalBtn.innerHTML;
  
  originalBtn.disabled = true;
  originalBtn.innerHTML = 'DISPATCHING...';
  
  setTimeout(() => {
    originalBtn.innerHTML = 'DISPATCHED ✓';
    originalBtn.style.background = 'var(--neon-green)';
    originalBtn.style.color = 'var(--bg-deep)';
    
    const container = form.parentElement;
    const alertDiv = document.createElement('div');
    alertDiv.className = 'info-alert float-anim';
    alertDiv.innerHTML = `
      <svg class="info-alert-icon" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
      <div class="info-alert-text">
        <strong>Transmission Secured!</strong> ${successMsg}
      </div>
    `;
    container.appendChild(alertDiv);
    
    form.reset();
    
    setTimeout(() => {
      originalBtn.disabled = false;
      originalBtn.innerHTML = originalHtml;
      originalBtn.style.background = '';
      originalBtn.style.color = '';
    }, 4000);
  }, 1200);
}
