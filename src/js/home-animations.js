// Home page animations

// Create floating particles
function createParticles() {
  const container = document.getElementById('particlesContainer');
  if (!container) return;
  
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 20 + 's';
    particle.style.animationDuration = (20 + Math.random() * 10) + 's';
    container.appendChild(particle);
  }
}

// Scroll progress indicator
function updateScrollProgress() {
  const scrollIndicator = document.getElementById('scrollIndicator');
  if (!scrollIndicator) return;
  
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (window.scrollY / scrollHeight) * 100;
  scrollIndicator.style.width = scrolled + '%';
}

// Navbar scroll effect
function handleNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('navbar-scrolled');
  } else {
    navbar.classList.remove('navbar-scrolled');
  }
}

// Mobile menu toggle
function setupMobileMenu() {
  const navToggle = document.createElement('div');
  navToggle.className = 'nav-toggle';
  navToggle.innerHTML = '<i class="fas fa-bars"></i>';
  
  const navLeft = document.querySelector('.nav-left');
  if (navLeft) {
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

// Intersection Observer for animations
function setupIntersectionObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Trigger SVG animations
        if (entry.target.classList.contains('impact-infographic')) {
          animateSVG();
        }
      }
    });
  }, observerOptions);

  // Observe elements
  const elementsToObserve = document.querySelectorAll(
    '.section-title, .stat-card, .service-preview-card, ' +
    '.about-preview-content, .about-preview-visual, ' +
    '.impact-infographic, .cta-wrapper'
  );
  
  elementsToObserve.forEach(element => {
    element.classList.add('fade-in');
    observer.observe(element);
  });
}

// Animate SVG infographic
function animateSVG() {
  const statGroups = document.querySelectorAll('.stat-group');
  statGroups.forEach((group, index) => {
    setTimeout(() => {
      group.style.opacity = '1';
    }, index * 300);
  });
}

// Newsletter form handling
function setupNewsletterForm() {
  const forms = document.querySelectorAll('.newsletter-form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = form.querySelector('input[type="email"]').value;
      alert(`Thank you for subscribing! We'll send updates to ${email}`);
      form.reset();
    });
  });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  createParticles();
  setupMobileMenu();
  setupIntersectionObserver();
  setupNewsletterForm();
});

// Window scroll events
window.addEventListener('scroll', function() {
  updateScrollProgress();
  handleNavbarScroll();
});

// Export for use in other pages
window.homeAnimations = {
  createParticles,
  updateScrollProgress,
  handleNavbarScroll,
  setupMobileMenu
}; 