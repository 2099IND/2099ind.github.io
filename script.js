/* ==========================================================================
   2099 Industries — script.js
   Progressive enhancement only: the page is complete without JavaScript.
   1. Section reveal   2. Hero drift   3. Index panel   4. Back to top
   5. Hero geometry replay   6. Copy email
   ========================================================================== */

(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Spanish text from i18n.js when it is active; English otherwise.
  const t = (key, en) => (window.i18n && window.i18n.t(key)) || en;

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

  /* 3. Index panel ------------------------------------------------------- */
  // Open, close, Esc and outside clicks are native (Popover API).
  // This closes the panel after jumping to a section and moves focus there,
  // since hidePopover() would otherwise return focus to the toggle.
  const indexPanel = document.getElementById('index-panel');
  const indexToggle = document.querySelector('.index-toggle');

  if (indexPanel && typeof indexPanel.hidePopover === 'function') {
    indexPanel.addEventListener('click', (event) => {
      const link = event.target.closest('a[href^="#"]');
      if (!link) return;
      indexPanel.hidePopover();

      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true }); // the link's own navigation does the scrolling
      }
    });
  }

  // Mark the section currently crossing the middle of the screen.
  const indexLinks = indexPanel ? indexPanel.querySelectorAll('a[href^="#"]') : [];

  if (indexLinks.length && 'IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const link = indexPanel.querySelector(`a[href="#${entry.target.id}"]`);
        if (!link) return;
        if (entry.isIntersecting) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }, { rootMargin: '-45% 0px -55% 0px' });

    indexLinks.forEach((link) => {
      const section = document.querySelector(link.getAttribute('href'));
      if (section) sectionObserver.observe(section);
    });
  }

  /* 4. Back to top ------------------------------------------------------- */
  // Shown once the hero has fully left the screen. Activating it scrolls to the
  // top and puts focus on INDEX, the next likely action.
  const toTop = document.querySelector('[data-to-top]');
  const hero = document.querySelector('.hero');

  if (toTop && hero && 'IntersectionObserver' in window) {
    toTop.hidden = false;

    new IntersectionObserver(([entry]) => {
      toTop.classList.toggle('is-shown', !entry.isIntersecting);
    }).observe(hero);

    toTop.addEventListener('click', (event) => {
      // Scroll here instead of following #top: the hero is not focusable, so the
      // native jump would drop focus to <body>. CSS scroll-behavior still applies.
      event.preventDefault();
      window.scrollTo({ top: 0 });
      const destination = indexToggle && indexToggle.offsetParent ? indexToggle : document.querySelector('.wordmark');
      if (destination) destination.focus({ preventScroll: true });
    });
  }

  /* 5. Hero geometry replay ---------------------------------------------- */
  // Hovering (or touching) the hexagons replays their opening trace. It never
  // restarts mid-trace, and fires again only after the pointer has left.
  const geometry = document.querySelector('.hero__geometry');

  if (geometry && !reduceMotion) {
    const parts = geometry.querySelectorAll('.geo-line, .geo-nodes');
    const TRACE_MS = 3400; // longest part: inner hexagon, 600ms delay + 2800ms trace
    let busy = false;
    let inside = false;
    let frame = 0;

    const replay = () => {
      if (busy) return;
      busy = true;
      parts.forEach((el) => { el.style.animation = 'none'; });
      void geometry.getBoundingClientRect(); // flush, so the animation restarts
      parts.forEach((el) => { el.style.animation = ''; });
      setTimeout(() => { busy = false; }, TRACE_MS);
    };

    // The hexagon sits behind the content, so test the pointer against its shape.
    const isOver = (x, y) => {
      const r = geometry.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      return Math.hypot(x - cx, y - cy) < r.width * 0.45;
    };

    document.addEventListener('pointermove', (event) => {
      if (event.pointerType !== 'mouse' || frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const now = isOver(event.clientX, event.clientY);
        if (now && !inside) replay();
        inside = now;
      });
    }, { passive: true });

    document.addEventListener('pointerdown', (event) => {
      if (event.pointerType !== 'mouse' && isOver(event.clientX, event.clientY)) replay();
    }, { passive: true });
  }

  /* 6. Copy email -------------------------------------------------------- */
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
        button.textContent = t('ui.copied', 'Copied');
        button.classList.add('is-copied');
        if (status) status.textContent = t('ui.copy-status', '{value} copied to clipboard.').replace('{value}', value);

        clearTimeout(resetTimer);
        resetTimer = setTimeout(() => {
          button.textContent = t('ui.copy', 'Copy');
          button.classList.remove('is-copied');
          if (status) status.textContent = '';
        }, 2000);
      } catch {
        if (status) status.textContent = t('ui.copy-failed', 'Copy failed. Select the address to copy it manually.');
      }
    });
  });
})();
