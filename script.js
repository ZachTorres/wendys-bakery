// ===================================
// Mobile Navigation Toggle
// ===================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
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

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ===================================
// Smooth Scroll for Navigation Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Skip if it's just a hash
        if (href === '#') {
            e.preventDefault();
            return;
        }

        const target = document.querySelector(href);

        if (target) {
            e.preventDefault();
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Active Navigation Link on Scroll
// ===================================
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active-link'));
            navLink.classList.add('active-link');
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ===================================
// Contact Form Handling
// ===================================
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Here you would typically send the data to a server
    // For now, we'll just simulate a successful submission
    console.log('Form submitted with data:', data);

    // Hide form and show success message
    contactForm.style.display = 'none';
    formSuccess.classList.add('active');

    // Reset form after 5 seconds and show it again
    setTimeout(() => {
        contactForm.reset();
        contactForm.style.display = 'flex';
        formSuccess.classList.remove('active');
    }, 5000);
});

// ===================================
// Scroll Animations (Fade In on Scroll)
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate cards and gallery items
const animateElements = document.querySelectorAll('.featured-card, .gallery-item, .contact-card');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===================================
// Header Shadow on Scroll
// ===================================
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.12)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.08)';
    }
});

// ===================================
// Gallery Item Click (Optional)
// ===================================
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        // You could add a lightbox/modal functionality here
        console.log('Gallery item clicked');
    });
});

// ===================================
// Add hover effect for featured cards
// ===================================
const featuredCards = document.querySelectorAll('.featured-card');

featuredCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// ===================================
// Initialize on page load
// ===================================
window.addEventListener('load', () => {
    // Add loaded class to body for any CSS animations
    document.body.classList.add('loaded');

    // Initial highlight of navigation
    highlightNavigation();
});

// ===================================
// Parallax effect for hero section (subtle)
// ===================================
const heroSection = document.querySelector('.hero');

if (heroSection) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;

        if (scrolled <= window.innerHeight) {
            heroSection.style.transform = `translateY(${rate}px)`;
        }
    });
}

// ===================================
// Form validation feedback
// ===================================
const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea, .contact-form select');

formInputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value.trim() !== '') {
            this.style.borderColor = '#4caf50';
        } else if (this.hasAttribute('required')) {
            this.style.borderColor = '#e74c3c';
        }
    });

    input.addEventListener('focus', function() {
        this.style.borderColor = 'var(--primary-color)';
    });
});

// ===================================
// Console welcome message
// ===================================
console.log('%cWelcome to Wendy\'s Whisk & Wonder! 🍰', 'color: #d4917e; font-size: 20px; font-weight: bold;');
console.log('%cBaked with love, coded with care.', 'color: #8b6f5c; font-size: 14px;');
