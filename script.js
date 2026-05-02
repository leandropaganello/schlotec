// Schlotec — light interactivity
(() => {
  const header = document.querySelector('.site-header');
  const onScroll = () => header && header.classList.toggle('scrolled', window.scrollY > 12);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const toggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  toggle && toggle.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', mobileNav.classList.contains('open'));
  });

  // Reveal-on-scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  // Year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Contact form (no backend) — fallback to mailto
  const form = document.getElementById('contact-form');
  form && form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent('Anfrage über schlotec.de');
    const body = encodeURIComponent(
      `Name: ${data.get('name')}\nE-Mail: ${data.get('email')}\nTelefon: ${data.get('phone') || '-'}\n\nNachricht:\n${data.get('message')}`
    );
    window.location.href = `mailto:beratung@schlotec.de?subject=${subject}&body=${body}`;
  });
})();
