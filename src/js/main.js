// Main JavaScript entry point
// This file is responsible for importing all other JavaScript modules
// and initializing any global functionality

// Import module scripts
// import './navigation.js'; // Commented out - was creating duplicate hamburger menus
import './animations.js';
import './forms.js';

// Add any global initialization code here
document.addEventListener('DOMContentLoaded', () => {
  // Add current year to footer copyright
  const yearSpan = document.querySelector('.footer-bottom script');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}); 