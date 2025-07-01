// Work page specific animations

document.addEventListener('DOMContentLoaded', function() {
  // Setup intersection observer for progress bars
  setupProgressBars();
  
  // Animate process timeline
  animateTimeline();
});

// Progress bar animation
function setupProgressBars() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const progressObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
        const progressFill = entry.target.querySelector('.progress-fill');
        if (progressFill) {
          const percent = progressFill.getAttribute('data-percent');
          setTimeout(() => {
            progressFill.style.width = percent + '%';
          }, 100);
          entry.target.classList.add('animated');
        }
      }
    });
  }, observerOptions);

  // Observe all progress bars
  const progressBars = document.querySelectorAll('.progress-bar');
  progressBars.forEach(bar => {
    progressObserver.observe(bar);
  });
}

// Animate timeline on scroll
function animateTimeline() {
  const timelineLine = document.querySelector('.timeline-line');
  if (!timelineLine) return;
  
  // Create gradient effect on scroll
  window.addEventListener('scroll', function() {
    const timeline = document.querySelector('.process-timeline');
    if (!timeline) return;
    
    const rect = timeline.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    if (rect.top < windowHeight && rect.bottom > 0) {
      const scrollProgress = Math.min(1, Math.max(0, (windowHeight - rect.top) / (rect.height + windowHeight)));
      timelineLine.style.background = `linear-gradient(180deg, #a855f7 ${scrollProgress * 100}%, #ec4899 ${scrollProgress * 100}%, rgba(168, 85, 247, 0.2) ${scrollProgress * 100}%)`;
    }
  });
  
  // Animate process steps
  const processSteps = document.querySelectorAll('.process-step');
  const stepObserver = new IntersectionObserver(function(entries) {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 200);
      }
    });
  }, { threshold: 0.3 });
  
  processSteps.forEach(step => {
    step.classList.add('fade-in');
    stepObserver.observe(step);
  });
}

// Animate SVG elements on hover
document.querySelectorAll('.impact-node').forEach(node => {
  node.addEventListener('mouseenter', function() {
    const circle = this.querySelector('circle');
    if (circle) {
      circle.style.transform = 'scale(1.1)';
    }
  });
  
  node.addEventListener('mouseleave', function() {
    const circle = this.querySelector('circle');
    if (circle) {
      circle.style.transform = 'scale(1)';
    }
  });
});

// Animate location connector
const locationConnector = document.querySelector('.location-connector');
if (locationConnector) {
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const path = locationConnector.querySelector('path');
        if (path) {
          path.style.strokeDashoffset = '0';
        }
      }
    });
  }, { threshold: 0.5 });
  
  observer.observe(locationConnector);
} 