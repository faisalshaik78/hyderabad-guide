'use strict';

const toggle = document.getElementById('nav-toggle');
const menu = document.querySelector('.menu');

if (toggle && menu) {
  const syncToggleState = () => {
    toggle.setAttribute('aria-expanded', String(toggle.checked));
  };

  const closeMenu = () => {
    toggle.checked = false;
    syncToggleState();
  };

  const setActiveLink = () => {
    const hash = window.location.hash || '#home';
    const links = menu.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
      const matches = link.getAttribute('href') === hash;
      const isParent = link.classList.contains('parent') && (hash === '#landmarks' || hash === '#food');
      const active = matches || isParent;

      link.classList.toggle('is-active', active);
      if (active) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  toggle.addEventListener('change', syncToggleState);

  menu.addEventListener('click', event => {
    const link = event.target.closest('a');
    if (!link) return;

    if (window.innerWidth <= 760) {
      closeMenu();
    }
  });

  document.addEventListener('click', event => {
    if (window.innerWidth > 760) return;
    if (!menu.contains(event.target) && !toggle.contains(event.target)) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.checked) {
      closeMenu();
      toggle.focus();
    }
  });

  setActiveLink();
  window.addEventListener('hashchange', setActiveLink);
}
