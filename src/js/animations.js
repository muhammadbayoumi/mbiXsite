// ═══════════════════════════════════════════
// ANIMATIONS — IntersectionObserver (reliable)
// ═══════════════════════════════════════════

export function initAnimations() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  // Simple fade-in on scroll using IntersectionObserver
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  // Observe all animated elements
  document.querySelectorAll(
    '.js-anim, .js-anim-left, .js-anim-right, .js-anim-scale, .stagger-children, .feature-card, .timeline-item'
  ).forEach(el => observer.observe(el));

  // Hero entrance animation
  animateHero();
}

function animateHero() {
  const heroElements = document.querySelectorAll(
    '.hero-badge, .hero-title, .hero-sub, .hero .btn-pill-green, .hero .btn-pill-dark-on-dark, .stat-value'
  );

  heroElements.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      });
    });
  });
}
