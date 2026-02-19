// Mobile drawer
const mobileDrawer = document.getElementById('mobileDrawer');
const mobileDrawerOverlay = document.getElementById('mobileDrawerOverlay');
const mobileDrawerClose = document.getElementById('mobileDrawerClose');
const navHamburger = document.querySelector('.nav-hamburger');

function openDrawer() {
  mobileDrawer.classList.add('active');
  mobileDrawerOverlay.style.display = 'block';
  requestAnimationFrame(() => mobileDrawerOverlay.classList.add('active'));
  document.body.style.overflow = 'hidden';
}

function closeDrawer() {
  mobileDrawer.classList.remove('active');
  mobileDrawerOverlay.classList.remove('active');
  document.body.style.overflow = '';
  mobileDrawerOverlay.addEventListener('transitionend', () => {
    mobileDrawerOverlay.style.display = 'none';
  }, { once: true });
}

navHamburger.addEventListener('click', openDrawer);
mobileDrawerClose.addEventListener('click', closeDrawer);
mobileDrawerOverlay.addEventListener('click', closeDrawer);

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

// Analytics Event Tracking
function trackEvent(eventName, eventParams = {}) {
  if (typeof gtag === 'function') {
    gtag('event', eventName, eventParams);
    console.log(`Event tracked: ${eventName}`, eventParams);
  } else {
    console.warn(`GA4 not loaded. Would track: ${eventName}`, eventParams);
  }
}

// WhatsApp Clicks
document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
  link.addEventListener('click', () => {
    trackEvent('whatsapp_click', {
      link_location: link.classList.contains('floating-whatsapp') ? 'floating' :
        link.classList.contains('btn-whatsapp-primary') ? 'hero' :
          link.classList.contains('info-contact') ? 'infobar' : 'other'
    });
  });
});

// Directions Clicks
document.querySelectorAll('a[href*="maps.google.com"], a[href*="maps.apple.com"]').forEach(link => {
  link.addEventListener('click', () => {
    trackEvent('directions_click', {
      map_type: link.href.includes('google.com') ? 'google' : 'apple'
    });
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
