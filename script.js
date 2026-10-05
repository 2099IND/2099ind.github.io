/* ==========================================================================
   2099 Industries — script.js
   Progressive enhancement only: the page is complete without JavaScript.
   1. Section reveal   2. Hero drift   3. Copy email
   ========================================================================== */

(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* 1. Section reveal ---------------------------------------------------- */
  const revealItems = document.querySelectorAll('[data-reveal]');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((el) => el.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

    revealItems.forEach((el) => observer.observe(el));
  }

  /* 2. Hero drift: the title moves slightly slower than the page ----------- */
  const heroTitle = document.querySelector('.hero__title');

  if (heroTitle && !reduceMotion) {
    let ticking = false;

    const update = () => {
      const y = Math.min(window.scrollY, window.innerHeight);
      heroTitle.style.setProperty('--drift', `${(y * 0.12).toFixed(1)}px`);
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    }, { passive: true });
  }

  /* 3. Copy email -------------------------------------------------------- */
  // Buttons ship hidden and are only shown where the Clipboard API exists.
  const copyButtons = document.querySelectorAll('[data-copy]');
  const status = document.querySelector('[data-copy-status]');

  if (!navigator.clipboard || !window.isSecureContext) return;

  copyButtons.forEach((button) => {
    button.hidden = false;
    let resetTimer;

    button.addEventListener('click', async () => {
      const value = button.dataset.copy;
      try {
        await navigator.clipboard.writeText(value);
        button.textContent = 'Copied';
        button.classList.add('is-copied');
        if (status) status.textContent = `${value} copied to clipboard.`;

        clearTimeout(resetTimer);
        resetTimer = setTimeout(() => {
          button.textContent = 'Copy';
          button.classList.remove('is-copied');
          if (status) status.textContent = '';
        }, 2000);
      } catch {
        if (status) status.textContent = 'Copy failed. Select the address to copy it manually.';
      }
    });
  });
})();
