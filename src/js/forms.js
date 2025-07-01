// Form handling functionality
document.addEventListener('DOMContentLoaded', () => {
  // Form submission handling
  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for submitting your intake form! We will review your information and get back to you within 24-48 hours to discuss next steps.');
      this.reset();
    });
  }
}); 