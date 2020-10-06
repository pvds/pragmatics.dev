import { createFocusTrap } from 'focus-trap';

const SELECTORS = {
  nav: '.js-nav',
  toggleBtn: '.js-nav-toggle',
};

const CLASSES = {
  open: 'is-open',
};

/**
 * Navigation menu singleton
 */
class Navigation {
  /**
   * Setup nav trigger action and add focus trap
   *
   * @hideconstructor
   */
  constructor() {
    this.isOpen = false;

    this.nav = document.querySelector(SELECTORS.nav);
    this.toggleBtn = this.nav.querySelector(SELECTORS.toggleBtn);
    this.focusTrap = createFocusTrap(this.nav, { allowOutsideClick: true });

    this.toggleBtn.addEventListener('click', () => this.toggleMenu());
    this.close = this.toggleMenu(false);

    this.clickOutsideMenu = (e) => {
      if (!this.nav.contains(e.target)) return this.toggleMenu(false);
    };
  }

  /**
   * Toggle navigation menu
   * @param {boolean} force
   */
  toggleMenu(force) {
    this.isOpen = typeof force === 'boolean' ? force : !this.isOpen;

    this.nav.classList.toggle(CLASSES.open, this.isOpen);
    this.toggleBtn.setAttribute('aria-expanded', String(this.isOpen));

    if (this.isOpen) {
      this.focusTrap.activate();
      window.addEventListener('click', this.clickOutsideMenu, true);
    } else {
      this.focusTrap.deactivate();
      window.removeEventListener('click', this.clickOutsideMenu, true);
    }
  }
}

if (document.querySelector(SELECTORS.nav)) {
  new Navigation();
}
