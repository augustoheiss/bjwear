/**
 * BJ-Wear Main Interactive Engine (agency-frontend-developer & agency-whimsy-injector)
 */

document.addEventListener('DOMContentLoaded', () => {
  /* --- 1. Mobile Menu Toggle --- */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      navLinks.classList.toggle('active');
    });

    // Close menu when clicking on any link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* --- 2. Audience Mode Switcher (Header) --- */
  const audienceTabs = document.querySelectorAll('.audience-tab');
  audienceTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      audienceTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const funnelType = tab.getAttribute('data-target-funnel');
      const targetId = funnelType === 'd2c' ? '#varejo-shopee' : '#calculadora-b2b';
      const targetEl = document.querySelector(targetId);

      if (targetEl) {
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* --- 3. Interactive Product Showcase Gallery --- */
  const mainImage = document.getElementById('gallery-main');
  const thumbBtns = document.querySelectorAll('.thumb-btn');
  const colorBtns = document.querySelectorAll('.color-option-btn');

  function updateMainImage(src, alt) {
    if (!mainImage) return;
    mainImage.style.opacity = '0.3';
    setTimeout(() => {
      mainImage.src = src;
      if (alt) mainImage.alt = alt;
      mainImage.style.opacity = '1';
    }, 120);
  }

  thumbBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      thumbBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const imgSrc = btn.getAttribute('data-img');
      const imgAlt = btn.getAttribute('data-alt');
      updateMainImage(imgSrc, imgAlt);
    });
  });

  colorBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      colorBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const targetImg = btn.getAttribute('data-target-img');
      const targetAlt = btn.getAttribute('data-alt');
      if (targetImg) {
        updateMainImage(targetImg, targetAlt);
        // Highlight matching thumbnail if any
        thumbBtns.forEach(b => {
          if (b.getAttribute('data-img') === targetImg) {
            thumbBtns.forEach(t => t.classList.remove('active'));
            b.classList.add('active');
          }
        });
      }
    });
  });

  /* --- 4. Interactive Macro Zoom Effect --- */
  const macroTarget = document.getElementById('macro-lens-target');
  if (macroTarget) {
    const macroImg = macroTarget.querySelector('img');
    macroTarget.addEventListener('mousemove', (e) => {
      const { left, top, width, height } = macroTarget.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      if (macroImg) {
        macroImg.style.transformOrigin = `${x}% ${y}%`;
      }
    });

    macroTarget.addEventListener('mouseleave', () => {
      if (macroImg) {
        macroImg.style.transformOrigin = 'center center';
      }
    });
  }

  /* --- 5. Telemetry Counter Animation on Scroll --- */
  const counters = document.querySelectorAll('.telemetry-value[data-target]');
  let hasAnimated = false;

  function animateCounters() {
    counters.forEach(counter => {
      const target = parseFloat(counter.getAttribute('data-target'));
      const prefix = counter.getAttribute('data-prefix') || '';
      const suffix = counter.getAttribute('data-suffix') || '';
      const isDecimal = counter.getAttribute('data-decimal') === 'true';
      const duration = 1800;
      const startTime = performance.now();

      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out quad
        const easeProgress = 1 - (1 - progress) * (1 - progress);
        const currentVal = easeProgress * target;

        if (isDecimal) {
          counter.textContent = `${prefix}${currentVal.toFixed(1)}${suffix}`;
        } else {
          counter.textContent = `${prefix}${Math.floor(currentVal).toLocaleString('pt-BR')}${suffix}`;
        }

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          if (isDecimal) {
            counter.textContent = `${prefix}${target.toFixed(1)}${suffix}`;
          } else {
            counter.textContent = `${prefix}${target.toLocaleString('pt-BR')}${suffix}`;
          }
        }
      }

      requestAnimationFrame(update);
    });
  }

  const telemetrySection = document.querySelector('.telemetry-grid');
  if (telemetrySection && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          animateCounters();
        }
      });
    }, { threshold: 0.25 });

    observer.observe(telemetrySection);
  }

  /* --- 6. FAQ Accordion --- */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close other items
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherBtn = otherItem.querySelector('.faq-question');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          }
        });

        // Toggle current item
        item.classList.toggle('active', !isActive);
        questionBtn.setAttribute('aria-expanded', !isActive);
      });
    }
  });

  /* --- 7. Smooth Scroll for Internal Anchors --- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});
