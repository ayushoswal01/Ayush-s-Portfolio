// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initPreloader();
    initMobileNav();
    initTypingAnimation();
    initContactForm();
    initSmoothScrolling();
    initScrollEffects();
});

// Preloader functionality
function initPreloader() {
    const preloader = document.getElementById('preloader');
    
    // Hide preloader after page loads
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.classList.add('hidden');
            // Remove preloader from DOM after animation
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1000); // Show preloader for at least 1 second
    });
}

// Mobile Navigation
function initMobileNav() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Typing Animation
function initTypingAnimation() {
    const typingText = document.getElementById('typingText');
    const texts = [
        'Software Engineer',
        'Python Developer', 
        'Web Developer',
        'Full Stack Developer',
        'Problem Solver'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            // Pause at end of word
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500;
        }

        setTimeout(typeEffect, typingSpeed);
    }

    // Start typing animation after preloader
    setTimeout(() => {
        typeEffect();
    }, 1500);
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showNotification('Thank you! Your message has been sent successfully.', 'success');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    `;
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    `;
    
    // Insert into DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close functionality
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto close after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Smooth Scrolling
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    const buttons = document.querySelectorAll('a[href^="#"]');
    
    [...navLinks, ...buttons].forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Scroll Effects
function initScrollEffects() {
    const header = document.querySelector('.header');
    const projectCards = document.querySelectorAll('.project-card');
    const profileImg = document.querySelector('.profile-img');
    
    // Header background on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(18, 18, 18, 0.98)';
        } else {
            header.style.background = 'rgba(18, 18, 18, 0.95)';
        }
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe project cards
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Profile image entrance animation
    if (profileImg) {
        profileImg.style.opacity = '0';
        profileImg.style.transform = 'scale(0.8)';
        profileImg.style.transition = 'opacity 1s ease, transform 1s ease';
        
        setTimeout(() => {
            profileImg.style.opacity = '1';
            profileImg.style.transform = 'scale(1)';
        }, 1200);
    }
}

// Particle Background Animation
function initParticleBackground() {
    const particles = document.querySelectorAll('.bg-particle');
    
    particles.forEach((particle, index) => {
        // Random starting positions
        const randomX = Math.random() * window.innerWidth;
        const randomY = Math.random() * window.innerHeight;
        
        particle.style.left = randomX + 'px';
        particle.style.top = randomY + 'px';
        
        // Add mouse interaction
        document.addEventListener('mousemove', function(e) {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            const rect = particle.getBoundingClientRect();
            const particleX = rect.left + rect.width / 2;
            const particleY = rect.top + rect.height / 2;
            
            const distance = Math.sqrt(
                Math.pow(mouseX - particleX, 2) + Math.pow(mouseY - particleY, 2)
            );
            
            if (distance < 200) {
                const moveX = (mouseX - particleX) * 0.1;
                const moveY = (mouseY - particleY) * 0.1;
                
                particle.style.transform = `translate(${moveX}px, ${moveY}px)`;
            } else {
                particle.style.transform = 'translate(0, 0)';
            }
        });
    });
}

// Initialize particle background after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initParticleBackground, 1000);
});

// Image loading fallback handler
function initImageFallbacks() {
    const profileImg = document.querySelector('.profile-img');
    const projectImgs = document.querySelectorAll('.project-img');

    // Handle profile image fallback
    if (profileImg) {
        profileImg.addEventListener('error', function() {
            console.log('Profile image failed to load, using fallback');
        });
    }

    // Handle project image fallbacks
    projectImgs.forEach(img => {
        img.addEventListener('error', function() {
            console.log('Project image failed to load, showing fallback');
        });
    });
}

// Keyboard Navigation
document.addEventListener('keydown', function(e) {
    // Escape key to close mobile menu
    if (e.key === 'Escape') {
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        
        if (navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Performance optimization - Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(function() {
    // Any scroll-based animations can go here
}, 16)); // ~60fps

// Add loading states for external links
document.addEventListener('DOMContentLoaded', function() {
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    
    externalLinks.forEach(link => {
        link.addEventListener('click', function() {
            const originalText = this.textContent;
            this.textContent = 'Opening...';
            
            setTimeout(() => {
                this.textContent = originalText;
            }, 1000);
        });
    });
    
    // Initialize image fallbacks
    initImageFallbacks();
});

// Enhanced profile picture interactions
function initProfileInteractions() {
    const profileImg = document.querySelector('.profile-img');
    
    if (profileImg) {
        // Add click effect
        profileImg.addEventListener('click', function() {
            this.style.transform = 'scale(1.1)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });

        // Add loading state
        profileImg.addEventListener('load', function() {
            this.style.opacity = '1';
        });
    }
}

// Initialize profile interactions
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initProfileInteractions, 800);
});

// Console welcome message
console.log(`
🚀 Welcome to Ayush Oswal's Portfolio!
📧 Contact: ayushoswal1@gmail.com
🔗 GitHub: https://github.com/ayushoswal01
💼 LinkedIn: https://linkedin.com/in/ayush_oswal

Thanks for checking out the code! 🎉

📝 How to update images:
1. Profile Picture: Replace 'assets/profile-picture.jpg'
2. Project Images: Replace files in 'assets/' folder:
   - ecommerce-project.jpg
   - conference-clarity-project.jpg  
   - smart-doc-extractor-project.jpg
3. Resume: Replace 'resume/Ayush_Oswal_Resume.pdf'
`);