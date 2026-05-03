/* ===== NAV SCROLL SHADOW ===== */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

/* ===== MOBILE MENU ===== */
const menuBtn    = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');

menuBtn.addEventListener('click', () => mobileMenu.classList.add('open'));
mobileClose.addEventListener('click', () => mobileMenu.classList.remove('open'));
document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

/* ===== SCROLL REVEAL ===== */
const fadeEls = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); }
  });
}, { threshold: 0.1 });
fadeEls.forEach(el => observer.observe(el));

/* ===== ACTIVE NAV LINK HIGHLIGHT ===== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const id = e.target.getAttribute('id');
      navLinks.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${id}` ? 'var(--rose)' : '';
      });
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => sectionObserver.observe(s));

/* ===== CONTACT FORM VALIDATION ===== */
const form = document.getElementById('contactForm');

function validate(id, errId, condition) {
  const el  = document.getElementById(id);
  const err = document.getElementById(errId);
  if (!condition(el.value)) {
    el.classList.add('error');
    err.classList.add('show');
    return false;
  }
  el.classList.remove('error');
  err.classList.remove('show');
  return true;
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const v1 = validate('name',    'nameErr',    v => v.trim().length > 1);
  const v2 = validate('email',   'emailErr',   v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v));
  const v3 = validate('subject', 'subjectErr', v => v.trim().length > 2);
  const v4 = validate('message', 'messageErr', v => v.trim().length >= 20);
  if (v1 && v2 && v3 && v4) {
    document.getElementById('formSuccess').classList.add('show');
    form.reset();
    setTimeout(() => document.getElementById('formSuccess').classList.remove('show'), 5000);
  }
});

/* Real-time error clear */
['name', 'email', 'subject', 'message'].forEach(id => {
  document.getElementById(id).addEventListener('input', () => {
    document.getElementById(id).classList.remove('error');
  });
});