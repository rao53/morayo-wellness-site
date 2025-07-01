// Animation functionality
document.addEventListener('DOMContentLoaded', () => {
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

  // Add animation classes and observe elements
  // Add fade-in to section headings
  const headings = document.querySelectorAll('section h2');
  headings.forEach(heading => {
    heading.classList.add('fade-in');
    observer.observe(heading);
  });

  // Add fade-in to cards
  const cards = document.querySelectorAll('.service-card, .involvement-card, .challenge-item, .evidence-item');
  cards.forEach((card, index) => {
    card.classList.add('fade-in');
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
  });

  // Add slide animations to about cards
  const aboutCards = document.querySelectorAll('.about-card');
  aboutCards.forEach((card, index) => {
    card.classList.add('fade-in');
    card.style.transitionDelay = `${index * 0.15}s`;
    observer.observe(card);
  });
  
  // Animate step items
  const stepItems = document.querySelectorAll('.step-item');
  stepItems.forEach((item, index) => {
    item.classList.add('fade-in');
    item.style.transitionDelay = `${index * 0.2}s`;
    observer.observe(item);
  });

  // Add gentle parallax effect to hero background
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero::before');
    if (parallax) {
      const speed = scrolled * 0.5;
      parallax.style.transform = `translateY(${speed}px)`;
    }
  });
}); 