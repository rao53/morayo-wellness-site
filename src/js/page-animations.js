// Page animations for all pages

// Reuse common functions from home animations
document.addEventListener('DOMContentLoaded', function() {
  // Setup mobile menu
  if (window.homeAnimations && window.homeAnimations.setupMobileMenu) {
    window.homeAnimations.setupMobileMenu();
  } else {
    setupMobileMenuLocal();
  }
  
  // Setup scroll progress
  setupScrollProgress();
  
  // Setup navbar scroll
  setupNavbarScroll();
  
  // Setup intersection observer
  setupPageIntersectionObserver();
  
  // Setup forms
  setupForms();
});

// Local mobile menu setup
function setupMobileMenuLocal() {
  const navToggle = document.createElement('div');
  navToggle.className = 'nav-toggle';
  navToggle.innerHTML = '<i class="fas fa-bars"></i>';
  
  const navLeft = document.querySelector('.nav-left');
  if (navLeft && !navLeft.querySelector('.nav-toggle')) {
    navLeft.appendChild(navToggle);
    
    navToggle.addEventListener('click', function() {
      const navMenu = document.querySelector('.nav-menu');
      navMenu.classList.toggle('nav-menu-open');
      const icon = navToggle.querySelector('i');
      if (icon.classList.contains('fa-bars')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  }
}

// Scroll progress
function setupScrollProgress() {
  window.addEventListener('scroll', function() {
    const scrollIndicator = document.getElementById('scrollIndicator');
    if (!scrollIndicator) return;
    
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / scrollHeight) * 100;
    scrollIndicator.style.width = scrolled + '%';
  });
}

// Navbar scroll
function setupNavbarScroll() {
  window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  });
}

// Page intersection observer
function setupPageIntersectionObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Add animation classes and observe
  const elementsToAnimate = document.querySelectorAll(
    '.section-title, .eligibility-item, .challenge-card, ' +
    '.approach-featured, .approach-card, .vmv-card-enhanced, ' +
    '.founder-content-enhanced, .coming-soon-card, ' +
    '.page-hero, .story-wrapper, .eligibility-section'
  );
  
  elementsToAnimate.forEach((element, index) => {
    if (element.classList.contains('eligibility-item') || 
        element.classList.contains('challenge-card') ||
        element.classList.contains('approach-card')) {
      element.style.transitionDelay = `${(index % 4) * 0.1}s`;
    }
    element.classList.add('fade-in');
    observer.observe(element);
  });
  
  // Special animations for specific elements
  const slideLeftElements = document.querySelectorAll('.about-story-section, .founder-image-wrapper');
  slideLeftElements.forEach(element => {
    element.classList.add('slide-in-left');
    observer.observe(element);
  });
  
  const slideRightElements = document.querySelectorAll('.founder-info-enhanced, .approach-featured');
  slideRightElements.forEach(element => {
    element.classList.add('slide-in-right');
    observer.observe(element);
  });
}

// Setup forms
function setupForms() {
  // Newsletter forms
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = form.querySelector('input[type="email"]').value;
      alert(`Thank you for subscribing! We'll send updates to ${email}`);
      form.reset();
    });
  });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
}); 