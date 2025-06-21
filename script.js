// GSAP Registration
gsap.registerPlugin(ScrollTrigger);

// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const animatedSubtitle = document.getElementById('animated-subtitle');
const contactForm = document.getElementById('contact-form');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section');
const observerOptions = {
    threshold: 0.3,
    rootMargin: '-100px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const currentSection = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// Animated subtitle typewriter effect
const subtitles = [
    "I build beautiful, functional websites.",
    "I create amazing user experiences.",
    "I turn ideas into digital reality.",
    "I craft modern web solutions."
];

let currentSubtitle = 0;
let currentChar = 0;
let isDeleting = false;

function typeWriter() {
    const current = subtitles[currentSubtitle];
    
    if (isDeleting) {
        animatedSubtitle.textContent = current.substring(0, currentChar - 1);
        currentChar--;
    } else {
        animatedSubtitle.textContent = current.substring(0, currentChar + 1);
        currentChar++;
    }
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && currentChar === current.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && currentChar === 0) {
        isDeleting = false;
        currentSubtitle = (currentSubtitle + 1) % subtitles.length;
        typeSpeed = 500;
    }
    
    setTimeout(typeWriter, typeSpeed);
}

// Start typewriter effect after page load
window.addEventListener('load', () => {
    setTimeout(typeWriter, 2000);
});

// GSAP Animations for scroll-triggered elements
gsap.utils.toArray('.section-title').forEach(title => {
    gsap.from(title, {
        scrollTrigger: {
            trigger: title,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out'
    });
});

// About section animations
gsap.from('.about-img', {
    scrollTrigger: {
        trigger: '.about-content',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
    },
    duration: 1,
    x: -100,
    opacity: 0,
    ease: 'power3.out'
});

gsap.from('.about-text', {
    scrollTrigger: {
        trigger: '.about-content',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
    },
    duration: 1,
    x: 100,
    opacity: 0,
    ease: 'power3.out'
});

// Stats counter animation
gsap.utils.toArray('.stat-number').forEach(stat => {
    const finalValue = stat.textContent;
    const numericValue = parseInt(finalValue);
    
    gsap.from(stat, {
        scrollTrigger: {
            trigger: stat,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        duration: 2,
        textContent: 0,
        snap: { textContent: 1 },
        ease: 'power2.out',
        onUpdate: function() {
            if (finalValue.includes('%')) {
                stat.textContent = Math.ceil(this.targets()[0].textContent) + '%';
            } else if (finalValue.includes('+')) {
                stat.textContent = Math.ceil(this.targets()[0].textContent) + '+';
            } else {
                stat.textContent = Math.ceil(this.targets()[0].textContent);
            }
        }
    });
});

// Skills section animations
gsap.utils.toArray('.skill-card').forEach((card, index) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        duration: 0.8,
        y: 50,
        opacity: 0,
        delay: index * 0.1,
        ease: 'power3.out'
    });
});

// Skill bars animation
gsap.utils.toArray('.skill-progress').forEach(bar => {
    const width = bar.getAttribute('data-width');
    
    gsap.to(bar, {
        scrollTrigger: {
            trigger: bar,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        duration: 1.5,
        width: width,
        ease: 'power2.out',
        delay: 0.5
    });
});

// Projects section animations
gsap.utils.toArray('.project-card').forEach((card, index) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        duration: 0.8,
        y: 50,
        opacity: 0,
        delay: index * 0.2,
        ease: 'power3.out'
    });
});

// Contact section animations
gsap.from('.contact-info', {
    scrollTrigger: {
        trigger: '.contact-content',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
    },
    duration: 1,
    x: -100,
    opacity: 0,
    ease: 'power3.out'
});

gsap.from('.contact-form', {
    scrollTrigger: {
        trigger: '.contact-content',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
    },
    duration: 1,
    x: 100,
    opacity: 0,
    ease: 'power3.out'
});

// Contact form handling
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Simple form validation
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields.', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
    contactForm.reset();
});

// Notification system
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : '#dc3545'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Smooth scroll for anchor links
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

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    const speed = scrolled * 0.5;
    
    if (parallax) {
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Remove any loading screens if they exist
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 500);
    }
});

// Add resize handler for responsive adjustments
window.addEventListener('resize', () => {
    // Refresh ScrollTrigger on resize
    ScrollTrigger.refresh();
});

// Performance optimization: Lazy loading for images
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));