// ====== Mobile menu toggle (creates overlay panel) ======
const menuBtn = document.querySelector('.menu-btn');

function createMobileNav() {
  // don't recreate if exists
  if (document.querySelector('.nav-mobile')) return;

  const mobileNav = document.createElement('div');
  mobileNav.className = 'nav-mobile';

  mobileNav.innerHTML = `
    <div class="panel" role="dialog" aria-modal="true" aria-label="Mobile navigation">
      <button class="close-mobile" aria-label="Close menu">&times;</button>
      <ul class="nav-list-mobile">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#testimonials">Testimonials</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </div>
  `;

  document.body.appendChild(mobileNav);
  // lock background scroll
  document.body.style.overflow = 'hidden';

  // wire close button
  mobileNav.querySelector('.close-mobile').addEventListener('click', removeMobileNav);

  // close when clicking outside panel
  mobileNav.addEventListener('click', (e) => {
    if (e.target === mobileNav) removeMobileNav();
  });

  // close when any mobile link clicked (smooth scroll handled elsewhere)
  mobileNav.querySelectorAll('.nav-list-mobile a').forEach(a => {
    a.addEventListener('click', () => {
      removeMobileNav();
    });
  });
}

function removeMobileNav() {
  const m = document.querySelector('.nav-mobile');
  if (m) m.remove();
  document.body.style.overflow = '';
  if (menuBtn) {
    menuBtn.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  }
}

if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    const isOpen = !!document.querySelector('.nav-mobile');
    if (!isOpen) {
      createMobileNav();
      menuBtn.classList.add('open');
      menuBtn.setAttribute('aria-expanded', 'true');
    } else {
      removeMobileNav();
    }
  });
}

// ====== Smooth scroll for anchor links ======
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // close mobile nav if open
      removeMobileNav();
    }
  });
});

// ====== Testimonials simple slider ======
(function() {
  const testimonials = document.querySelectorAll('.testimonials .testimonial');
  if (!testimonials.length) return;
  let idx = 0;
  const show = i => {
    testimonials.forEach((t, j) => {
      t.classList.toggle('hidden', j !== i);
    });
  };
  show(0);
  const nextBtn = document.querySelector('.testimonials .next');
  const prevBtn = document.querySelector('.testimonials .prev');
  if (nextBtn) nextBtn.addEventListener('click', () => { idx = (idx + 1) % testimonials.length; show(idx); });
  if (prevBtn) prevBtn.addEventListener('click', () => { idx = (idx - 1 + testimonials.length) % testimonials.length; show(idx); });
})();

// ====== Update year in footer ======
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
