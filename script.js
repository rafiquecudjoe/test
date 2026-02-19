// Navbar scroll effect
const navbarWrapper = document.querySelector('.navbar-wrapper');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbarWrapper.style.paddingTop = '8px';
  } else {
    navbarWrapper.style.paddingTop = '16px';
  }
});

// Product card button clicks (informational only)
document.querySelectorAll('.product-card-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.product-card');
    const title = card.querySelector('.product-card-title').innerText.replace('\n', ' ');
    alert(`${title} bölümü hakkında daha fazla bilgi için lütfen mağazamızı ziyaret edin.`);
  });
});

// Smooth reveal on scroll using IntersectionObserver
const revealElements = document.querySelectorAll(
  '.product-card, .info-card, .hero-container, .info-bar-container, .visit-container'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealElements.forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});
