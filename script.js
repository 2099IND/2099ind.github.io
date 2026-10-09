/* ==========================================================================
   2099 Industries — script.js
   Progressive enhancement only: the page is complete without JavaScript.
   1. Section reveal   2. Hero drift   3. Index panel   4. Back to top
   5. Ruler shimmer   6. Hexagon response   7. Copy email
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
    let pending = revealItems.length;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
        if (--pending === 0) observer.disconnect();
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

    revealItems.forEach((el) => observer.observe(el));
  }
  // Tells the fail-safe in index.html that reveals are handled.
  window.__revealReady = true;

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

  /* 5. Ruler shimmer ------------------------------------------------------ */
  // CSS plays the first pass 1.7s after load. This repeats it every 15s, only
  // while the tab is visible and the ruler is on screen. One timer at a time:
  // a pass that falls in a hidden tab or off screen is skipped, never queued.
  const track = document.querySelector('.horizon__track');

  if (track && !reduceMotion && !track.dataset.shimmer) {
    track.dataset.shimmer = 'on';
    const EVERY = 15000;
    let last = 1700;   // start of the CSS pass, in ms since the page started
    let timer = 0;
    let inView = true;

    const play = () => {
      track.style.setProperty('--sweep-delay', '0ms');
      track.classList.add('is-resetting');
      void track.offsetWidth; // flush, so the animation restarts
      track.classList.remove('is-resetting');
    };

    // Time to the next slot on the 15s grid that started with the CSS pass.
    const nextIn = () => {
      const since = performance.now() - last;
      return since < 0 ? EVERY - since : EVERY - (since % EVERY);
    };

    const schedule = () => {
      clearTimeout(timer);
      timer = setTimeout(tick, nextIn());
    };

    function tick() {
      last = performance.now();
      if (!document.hidden && inView) play();
      schedule();
    }

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; }).observe(track);
    }

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) clearTimeout(timer);
      else schedule();
    });

    schedule();
  }

  /* 6. Hexagon response --------------------------------------------------- */
  // After the opening trace, the hexagons answer the pointer: a mouse or pen
  // over them tints and lifts the lines (CSS), and entering or tapping plays
  // one outline ripple. The opening trace itself never replays.
  const geometry = document.querySelector('.hero__geometry');

  if (geometry && hero && !reduceMotion) {
    const READY_MS = 3400; // inner hexagon: 600ms delay + 2800ms trace
    let inside = false;
    let frame = 0;
    let point = null;
    let tapTimer = 0;

    // The hexagon sits behind the content, so test the pointer against its shape.
    const isOver = (x, y) => {
      const r = geometry.getBoundingClientRect();
      return Math.hypot(x - (r.left + r.width / 2), y - (r.top + r.height / 2)) < r.width * 0.45;
    };

    const ripple = () => geometry.classList.add('is-rippling'); // no-op while one runs
    geometry.addEventListener('animationend', (event) => {
      if (event.animationName === 'geo-ripple') geometry.classList.remove('is-rippling');
    });

    const setInside = (now) => {
      if (now === inside) return;
      inside = now;
      geometry.classList.toggle('is-engaged', now);
      if (now) ripple();
    };

    // Mouse and pen: checked at most once per frame, only while moving.
    hero.addEventListener('pointermove', (event) => {
      if (event.pointerType === 'touch') return;
      point = event;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        if (performance.now() >= READY_MS) setInside(isOver(point.clientX, point.clientY));
      });
    }, { passive: true });
    hero.addEventListener('pointerleave', () => setInside(false));

    // A tap (or click) on the hexagons. Browsers do not fire click after a
    // scroll gesture, so scrolling past them never triggers it.
    hero.addEventListener('click', (event) => {
      if (performance.now() < READY_MS || event.target.closest('a, button')) return;
      if (!isOver(event.clientX, event.clientY)) return;
      ripple();
      if (inside) return;
      geometry.classList.add('is-engaged');
      clearTimeout(tapTimer);
      tapTimer = setTimeout(() => { if (!inside) geometry.classList.remove('is-engaged'); }, 700);
    });
  }

  /* 7. Copy email -------------------------------------------------------- */
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
