// Contact Form Interactions and Animations
document.addEventListener('DOMContentLoaded', function() {
    const intakeForm = document.querySelector('.intake-form');
    const formGroups = document.querySelectorAll('.form-group');
    const submitBtn = document.querySelector('.submit-btn');
    
    // Animate form groups on load
    if (formGroups.length > 0) {
        formGroups.forEach((group, index) => {
            setTimeout(() => {
                group.style.opacity = '0';
                group.style.transform = 'translateY(20px)';
                group.style.transition = 'all 0.5s ease';
                
                setTimeout(() => {
                    group.style.opacity = '1';
                    group.style.transform = 'translateY(0)';
                }, 100);
            }, index * 50);
        });
    }
    
    // Form field animations
    const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    formInputs.forEach(input => {
        // Add floating label effect
        input.addEventListener('focus', function() {
            const icon = this.parentElement.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.1)';
                icon.style.color = '#ec4899';
            }
        });
        
        input.addEventListener('blur', function() {
            const icon = this.parentElement.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1)';
                icon.style.color = '#a855f7';
            }
        });
    });
    
    // Form submission handling
    if (intakeForm) {
        intakeForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Add loading state to button
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'form-success-message';
                successMessage.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <h3>Thank You!</h3>
                    <p>We've received your submission and will be in touch within 24-48 hours.</p>
                `;
                
                // Style the success message
                Object.assign(successMessage.style, {
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: 'white',
                    padding: '3rem',
                    borderRadius: '20px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                    textAlign: 'center',
                    zIndex: '1000',
                    opacity: '0',
                    transition: 'opacity 0.3s ease'
                });
                
                // Style the icon
                const icon = successMessage.querySelector('i');
                Object.assign(icon.style, {
                    fontSize: '3rem',
                    color: '#10b981',
                    marginBottom: '1rem',
                    display: 'block'
                });
                
                // Add overlay
                const overlay = document.createElement('div');
                Object.assign(overlay.style, {
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0,0,0,0.5)',
                    zIndex: '999',
                    opacity: '0',
                    transition: 'opacity 0.3s ease'
                });
                
                document.body.appendChild(overlay);
                document.body.appendChild(successMessage);
                
                // Animate in
                setTimeout(() => {
                    overlay.style.opacity = '1';
                    successMessage.style.opacity = '1';
                }, 10);
                
                // Reset form
                intakeForm.reset();
                
                // Remove success message after delay
                setTimeout(() => {
                    overlay.style.opacity = '0';
                    successMessage.style.opacity = '0';
                    
                    setTimeout(() => {
                        overlay.remove();
                        successMessage.remove();
                        
                        // Reset button
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                    }, 300);
                }, 3000);
            }, 1500);
        });
    }
    
    // Animate contact details on scroll
    const contactDetails = document.querySelectorAll('.contact-detail');
    if (contactDetails.length > 0) {
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const contactObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateX(-20px)';
                    
                    setTimeout(() => {
                        entry.target.style.transition = 'all 0.5s ease';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, 100);
                    
                    contactObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        contactDetails.forEach(detail => {
            contactObserver.observe(detail);
        });
    }
    
    // Add ripple effect to submit button
    if (submitBtn) {
        submitBtn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            Object.assign(ripple.style, {
                width: size + 'px',
                height: size + 'px',
                left: x + 'px',
                top: y + 'px',
                position: 'absolute',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.5)',
                transform: 'scale(0)',
                animation: 'rippleAnimation 0.6s ease-out'
            });
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    }
    
    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rippleAnimation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}); 