// Magnetic elements effect

class MagneticElement {
  constructor(element) {
    this.element = element;
    this.boundingRect = element.getBoundingClientRect();
    this.magnetStrength = 0.25;
    this.magnetRadius = 100;
    
    this.init();
  }
  
  init() {
    // Update bounding rect on resize
    window.addEventListener('resize', () => {
      this.boundingRect = this.element.getBoundingClientRect();
    });
    
    // Add mouse events
    this.element.addEventListener('mouseenter', () => {
      this.element.style.transition = 'transform 0.2s ease';
    });
    
    this.element.addEventListener('mouseleave', () => {
      this.element.style.transform = 'translate(0, 0)';
      this.element.style.transition = 'transform 0.3s ease';
    });
    
    this.element.addEventListener('mousemove', (e) => {
      this.magnetize(e);
    });
  }
  
  magnetize(e) {
    const centerX = this.boundingRect.left + this.boundingRect.width / 2;
    const centerY = this.boundingRect.top + this.boundingRect.height / 2;
    
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    if (distance < this.magnetRadius) {
      const translateX = deltaX * this.magnetStrength;
      const translateY = deltaY * this.magnetStrength;
      
      this.element.style.transform = `translate(${translateX}px, ${translateY}px)`;
    }
  }
}

// Initialize magnetic elements
document.addEventListener('DOMContentLoaded', function() {
  const magneticElements = document.querySelectorAll('.magnetic-element');
  
  magneticElements.forEach(element => {
    new MagneticElement(element);
  });
  
  // Add cursor glow effect
  const cursor = document.createElement('div');
  cursor.className = 'cursor-glow';
  document.body.appendChild(cursor);
  
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  // Smooth cursor follow
  function animateCursor() {
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;
    
    cursorX += dx * 0.1;
    cursorY += dy * 0.1;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    requestAnimationFrame(animateCursor);
  }
  
  animateCursor();
  
  // Hide cursor glow on mobile
  if ('ontouchstart' in window) {
    cursor.style.display = 'none';
  }
});

// Add CSS for cursor glow
const style = document.createElement('style');
style.textContent = `
  .cursor-glow {
    position: fixed;
    width: 40px;
    height: 40px;
    background: radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    mix-blend-mode: screen;
    transition: width 0.3s ease, height 0.3s ease;
  }
  
  .magnetic-element:hover ~ .cursor-glow,
  .cursor-glow:has(~ .magnetic-element:hover) {
    width: 60px;
    height: 60px;
  }
`;
document.head.appendChild(style); 