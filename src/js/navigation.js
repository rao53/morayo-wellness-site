// Navigation functionality
document.addEventListener('DOMContentLoaded', () => {
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Close mobile menu if open
        const navMenu = document.querySelector('.nav-menu');
        const navToggle = document.querySelector('.nav-toggle');
        if (navMenu.classList.contains('nav-menu-open')) {
          navMenu.classList.remove('nav-menu-open');
          const icon = navToggle.querySelector('i');
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
    });
  });

  // Mobile menu toggle - commented out because we're using Alpine.js in the HTML
  /*
  const navToggle = document.createElement('div');
  navToggle.className = 'nav-toggle';
  navToggle.innerHTML = '<i class="fas fa-bars"></i>';
  document.querySelector('.nav-left').appendChild(navToggle);

  navToggle.addEventListener('click', function() {
    document.querySelector('.nav-menu').classList.toggle('nav-menu-open');
    const icon = navToggle.querySelector('i');
    if (icon.classList.contains('fa-bars')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });
  */

  // Navbar scroll effect
  window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  });
}); 