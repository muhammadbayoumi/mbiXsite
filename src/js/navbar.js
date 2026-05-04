// ═══════════════════════════════════════════
// NAVBAR — Scroll behavior + mobile menu
// ═══════════════════════════════════════════

export function initNavbar() {
  const navbars = document.querySelectorAll('.navbar-mbx, .navbar-mbx-light');
  if (!navbars.length) return;

  // Scroll class for background change
  let ticking = false;
  const onScroll = () => {
    const y = window.scrollY;
    navbars.forEach(nav => {
      nav.classList.toggle('scrolled', y > 50);
    });
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });

  // Close mobile menu on link click
  navbars.forEach(nav => {
    const links = nav.querySelectorAll('.nav-link');
    const toggler = nav.querySelector('.navbar-toggler');
    const collapse = nav.querySelector('.navbar-collapse');
    links.forEach(link => {
      link.addEventListener('click', () => {
        if (collapse?.classList.contains('show')) toggler?.click();
      });
    });
  });
}
