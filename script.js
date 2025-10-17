// ===================================
// Global Variables & State
// ===================================
let cart = [];
let currentTestimonial = 0;
let currentLightboxImage = 0;
let quizStep = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');
const galleryImages = document.querySelectorAll('.gallery-item');

// ===================================
// Loading Screen
// ===================================
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingProgress = document.getElementById('loadingProgress');

    // Simulate loading
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        document.body.classList.add('loaded');

        // Show newsletter modal after 10 seconds
        setTimeout(() => {
            if (!sessionStorage.getItem('newsletterShown')) {
                document.getElementById('newsletterModal').classList.add('active');
                sessionStorage.setItem('newsletterShown', 'true');
            }
        }, 10000);
    }, 2000);
});

// ===================================
// Custom Cursor
// ===================================
const cursor = document.getElementById('customCursor');
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;

    cursorX += dx * 0.1;
    cursorY += dy * 0.1;

    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';

    requestAnimationFrame(animateCursor);
}

if (window.innerWidth > 1024) {
    animateCursor();
}

// ===================================
// Particle System
// ===================================
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 50;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;

        // Particle types: cookie, heart, star
        this.type = Math.floor(Math.random() * 3);
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 2 - 1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;

        // Wrap around screen
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = '#FF6B9D';

        if (this.type === 0) {
            // Cookie
            ctx.beginPath();
            ctx.arc(0, 0, this.size * 3, 0, Math.PI * 2);
            ctx.fill();
        } else if (this.type === 1) {
            // Heart
            ctx.beginPath();
            ctx.moveTo(0, this.size);
            ctx.bezierCurveTo(-this.size * 2, -this.size, -this.size * 4, this.size, 0, this.size * 4);
            ctx.bezierCurveTo(this.size * 4, this.size, this.size * 2, -this.size, 0, this.size);
            ctx.fill();
        } else {
            // Star
            const spikes = 5;
            const outerRadius = this.size * 3;
            const innerRadius = this.size * 1.5;

            ctx.beginPath();
            for (let i = 0; i < spikes * 2; i++) {
                const radius = i % 2 === 0 ? outerRadius : innerRadius;
                const angle = (i * Math.PI) / spikes;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.closePath();
            ctx.fill();
        }

        ctx.restore();
    }
}

// Initialize particles
for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    requestAnimationFrame(animateParticles);
}

animateParticles();

// Resize canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ===================================
// Mobile Navigation Toggle
// ===================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

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
// Counter Animation for Stats
// ===================================
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
}

const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.textContent === '0') {
            animateCounter(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-number[data-target]').forEach(counter => {
    counterObserver.observe(counter);
});

// ===================================
// Shopping Cart Functionality
// ===================================
const cartBtn = document.getElementById('cartBtn');
const cartSidebar = document.getElementById('cartSidebar');
const cartClose = document.getElementById('cartClose');
const cartOverlay = document.getElementById('cartOverlay');
const cartCount = document.getElementById('cartCount');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');

function openCart() {
    cartSidebar.classList.add('active');
    cartOverlay.classList.add('active');
}

function closeCart() {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
}

cartBtn.addEventListener('click', openCart);
cartClose.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

function updateCart() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Update cart items display
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-basket"></i>
                <p>Your cart is empty</p>
                <small>Add some delicious treats!</small>
            </div>
        `;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="decreaseQuantity('${item.id}')">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="increaseQuantity('${item.id}')">+</button>
                    </div>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart('${item.id}')">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');
    }

    // Update cart total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

function addToCart(productName, price) {
    const id = productName.replace(/\s+/g, '-').toLowerCase();
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: id,
            name: productName,
            price: parseFloat(price),
            quantity: 1
        });
    }

    updateCart();
    openCart();

    // Show success animation
    const btn = event.target.closest('button');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Added!';
    btn.style.background = '#4CAF50';

    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
    }, 2000);
}

window.increaseQuantity = function(id) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity++;
        updateCart();
    }
};

window.decreaseQuantity = function(id) {
    const item = cart.find(item => item.id === id);
    if (item && item.quantity > 1) {
        item.quantity--;
        updateCart();
    }
};

window.removeFromCart = function(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
};

// Add to cart button handlers
document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const productName = e.target.closest('button').getAttribute('data-product');
        const price = e.target.closest('button').getAttribute('data-price');
        addToCart(productName, price);
    });
});

// ===================================
// Countdown Timer
// ===================================
function updateCountdown() {
    const endDate = new Date('2025-10-20T23:59:59').getTime();
    const now = new Date().getTime();
    const distance = endDate - now;

    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
    }
}

updateCountdown();
setInterval(updateCountdown, 60000);

// ===================================
// Testimonials Carousel
// ===================================
const prevBtn = document.getElementById('prevTestimonial');
const nextBtn = document.getElementById('nextTestimonial');
const carouselDots = document.getElementById('carouselDots');

// Create dots
testimonialCards.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.classList.add('carousel-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => showTestimonial(index));
    carouselDots.appendChild(dot);
});

const dots = document.querySelectorAll('.carousel-dot');

function showTestimonial(index) {
    testimonialCards.forEach(card => card.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    testimonialCards[index].classList.add('active');
    dots[index].classList.add('active');
    currentTestimonial = index;
}

prevBtn.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
    showTestimonial(currentTestimonial);
});

nextBtn.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    showTestimonial(currentTestimonial);
});

// Auto-advance testimonials
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    showTestimonial(currentTestimonial);
}, 5000);

// ===================================
// Flavor Quiz
// ===================================
const startQuizBtn = document.getElementById('startQuiz');
const quizContent = document.getElementById('quizContent');

const quizData = [
    {
        question: "What's your favorite flavor profile?",
        options: ["Sweet & Rich", "Light & Fruity", "Buttery & Savory", "Tangy & Tart"]
    },
    {
        question: "What's the occasion?",
        options: ["Everyday Treat", "Special Celebration", "Breakfast/Brunch", "Gift for Someone"]
    },
    {
        question: "What texture do you prefer?",
        options: ["Soft & Chewy", "Crispy & Crunchy", "Fluffy & Light", "Dense & Moist"]
    }
];

const quizResults = {
    "Sweet & Rich-Special Celebration-Dense & Moist": {
        name: "Custom Celebration Cake",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80",
        description: "A decadent custom cake perfect for your special day!"
    },
    "Light & Fruity-Everyday Treat-Fluffy & Light": {
        name: "Seasonal Fruit Pie",
        image: "https://images.unsplash.com/photo-1535920527002-b35e96722eb9?w=600&q=80",
        description: "Fresh, light pie with seasonal fruits!"
    },
    "default": {
        name: "Chocolate Chip Cookies",
        image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&q=80",
        description: "Classic cookies that everyone loves!"
    }
};

let quizAnswers = [];

function renderQuiz() {
    if (quizStep < quizData.length) {
        const question = quizData[quizStep];
        quizContent.innerHTML = `
            <div class="quiz-question">${question.question}</div>
            <div class="quiz-options">
                ${question.options.map(option => `
                    <div class="quiz-option" data-answer="${option}">${option}</div>
                `).join('')}
            </div>
        `;

        document.querySelectorAll('.quiz-option').forEach(option => {
            option.addEventListener('click', (e) => {
                quizAnswers.push(e.target.getAttribute('data-answer'));
                quizStep++;
                renderQuiz();
            });
        });
    } else {
        showQuizResult();
    }
}

function showQuizResult() {
    const answerKey = quizAnswers.join('-');
    const result = quizResults[answerKey] || quizResults.default;

    quizContent.innerHTML = `
        <div class="quiz-result">
            <img src="${result.image}" alt="${result.name}">
            <h3>We recommend: ${result.name}!</h3>
            <p>${result.description}</p>
            <button class="btn btn-primary" onclick="restartQuiz()">
                <i class="fas fa-redo"></i> Take Quiz Again
            </button>
        </div>
    `;
}

window.restartQuiz = function() {
    quizStep = 0;
    quizAnswers = [];
    quizContent.innerHTML = `
        <button class="btn btn-primary btn-large" id="startQuiz">
            <i class="fas fa-play"></i> Start Quiz
        </button>
    `;
    document.getElementById('startQuiz').addEventListener('click', renderQuiz);
};

startQuizBtn.addEventListener('click', renderQuiz);

// ===================================
// Gallery Lightbox
// ===================================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

galleryImages.forEach((item, index) => {
    item.addEventListener('click', () => {
        openLightbox(index);
    });
});

function openLightbox(index) {
    currentLightboxImage = index;
    const img = galleryImages[index].querySelector('img');
    lightboxImg.src = img.src;
    lightbox.classList.add('active');
}

function closeLightbox() {
    lightbox.classList.remove('active');
}

function showPrevImage() {
    currentLightboxImage = (currentLightboxImage - 1 + galleryImages.length) % galleryImages.length;
    const img = galleryImages[currentLightboxImage].querySelector('img');
    lightboxImg.src = img.src;
}

function showNextImage() {
    currentLightboxImage = (currentLightboxImage + 1) % galleryImages.length;
    const img = galleryImages[currentLightboxImage].querySelector('img');
    lightboxImg.src = img.src;
}

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', showPrevImage);
lightboxNext.addEventListener('click', showNextImage);

// Close on background click
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('active')) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrevImage();
        if (e.key === 'ArrowRight') showNextImage();
    }
});

// ===================================
// FAQ Accordion
// ===================================
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all other items
        faqItems.forEach(otherItem => {
            otherItem.classList.remove('active');
        });

        // Toggle current item
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ===================================
// Newsletter Modal
// ===================================
const newsletterModal = document.getElementById('newsletterModal');
const newsletterClose = document.getElementById('newsletterClose');
const newsletterForm = document.getElementById('newsletterForm');

newsletterClose.addEventListener('click', () => {
    newsletterModal.classList.remove('active');
});

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = newsletterForm.querySelector('input[type="email"]').value;

    // Here you would typically send to a server
    console.log('Newsletter signup:', email);

    newsletterModal.classList.remove('active');

    // Show success message
    alert('Thank you for subscribing! Check your email for your 10% discount code.');
    newsletterForm.reset();
});

// Close modal on background click
newsletterModal.addEventListener('click', (e) => {
    if (e.target === newsletterModal) {
        newsletterModal.classList.remove('active');
    }
});

// ===================================
// Product Customizer Modal
// ===================================
const customizerModal = document.getElementById('customizerModal');
const customizerClose = document.getElementById('customizerClose');
const customizerTotal = document.getElementById('customizerTotal');
const addCustomCake = document.getElementById('addCustomCake');
const customizeButtons = document.querySelectorAll('.customize-btn');

let customizerData = {
    size: 0,
    flavor: '',
    frosting: ''
};

customizeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        customizerModal.classList.add('active');
        customizerData = { size: 0, flavor: '', frosting: '' };
        updateCustomizerTotal();
        showCustomizerStep(0);
    });
});

customizerClose.addEventListener('click', () => {
    customizerModal.classList.remove('active');
});

function showCustomizerStep(step) {
    const steps = document.querySelectorAll('.customizer-step');
    steps.forEach((s, index) => {
        s.classList.toggle('active', index === step);
    });
}

// Handle size selection
document.querySelectorAll('input[name="size"]').forEach(input => {
    input.addEventListener('change', (e) => {
        customizerData.size = parseFloat(e.target.getAttribute('data-price'));
        updateCustomizerTotal();
        setTimeout(() => showCustomizerStep(1), 300);
    });
});

// Handle flavor selection
document.querySelectorAll('input[name="flavor"]').forEach(input => {
    input.addEventListener('change', (e) => {
        customizerData.flavor = e.target.value;
        setTimeout(() => showCustomizerStep(2), 300);
    });
});

// Handle frosting selection
document.querySelectorAll('input[name="frosting"]').forEach(input => {
    input.addEventListener('change', (e) => {
        customizerData.frosting = e.target.value;
        updateCustomizerTotal();
    });
});

function updateCustomizerTotal() {
    customizerTotal.textContent = `$${customizerData.size.toFixed(2)}`;
}

addCustomCake.addEventListener('click', () => {
    if (customizerData.size && customizerData.flavor && customizerData.frosting) {
        const cakeName = `Custom ${customizerData.flavor} cake with ${customizerData.frosting}`;
        addToCart(cakeName, customizerData.size);
        customizerModal.classList.remove('active');
    } else {
        alert('Please complete all customization steps!');
    }
});

customizerModal.addEventListener('click', (e) => {
    if (e.target === customizerModal) {
        customizerModal.classList.remove('active');
    }
});

// ===================================
// Checkout Modal
// ===================================
const checkoutModal = document.getElementById('checkoutModal');
const checkoutModalClose = document.getElementById('checkoutModalClose');
const checkoutForm = document.getElementById('checkoutForm');
const checkoutSummary = document.getElementById('checkoutSummary');
const deliveryOptions = document.querySelectorAll('input[name="delivery"]');
const deliveryAddress = document.querySelector('.delivery-address');

checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    updateCheckoutSummary();
    checkoutModal.classList.add('active');
    closeCart();
});

checkoutModalClose.addEventListener('click', () => {
    checkoutModal.classList.remove('active');
});

function updateCheckoutSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    checkoutSummary.innerHTML = `
        <h3>Order Summary</h3>
        ${cart.map(item => `
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                <span>${item.name} x${item.quantity}</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `).join('')}
    `;

    document.getElementById('checkoutSubtotal').textContent = `$${subtotal.toFixed(2)}`;
    updateCheckoutTotal();
}

deliveryOptions.forEach(option => {
    option.addEventListener('change', (e) => {
        if (e.target.value === 'delivery') {
            deliveryAddress.style.display = 'block';
        } else {
            deliveryAddress.style.display = 'none';
        }
        updateCheckoutTotal();
    });
});

function updateCheckoutTotal() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryOption = document.querySelector('input[name="delivery"]:checked').value;
    let deliveryFee = 0;

    if (deliveryOption === 'delivery' && subtotal < 50) {
        deliveryFee = 5;
    }

    document.getElementById('checkoutDelivery').textContent = `$${deliveryFee.toFixed(2)}`;
    document.getElementById('checkoutFinalTotal').textContent = `$${(subtotal + deliveryFee).toFixed(2)}`;
}

checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Here you would typically send order to server
    console.log('Order submitted:', {
        cart: cart,
        customerInfo: {
            name: document.getElementById('checkoutName').value,
            email: document.getElementById('checkoutEmail').value,
            phone: document.getElementById('checkoutPhone').value,
            delivery: document.querySelector('input[name="delivery"]:checked').value,
            address: document.getElementById('checkoutAddress').value,
            date: document.getElementById('checkoutDate').value,
            notes: document.getElementById('checkoutNotes').value
        }
    });

    checkoutModal.classList.remove('active');

    // Show success message
    alert('Order placed successfully! You will receive a confirmation email shortly.');

    // Clear cart
    cart = [];
    updateCart();
    checkoutForm.reset();
});

checkoutModal.addEventListener('click', (e) => {
    if (e.target === checkoutModal) {
        checkoutModal.classList.remove('active');
    }
});

// ===================================
// Contact Form Handling
// ===================================
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Here you would typically send the data to a server
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
const scrollObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, scrollObserverOptions);

// Animate cards and gallery items
const animateElements = document.querySelectorAll('.featured-card, .recipe-card, .special-card');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    scrollObserver.observe(el);
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
// Scroll to Top Button
// ===================================
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

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
// Parallax Effect
// ===================================
const parallaxElements = document.querySelectorAll('[data-parallax]');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    parallaxElements.forEach(element => {
        const speed = 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// ===================================
// Tilt Effect for Images
// ===================================
const tiltElements = document.querySelectorAll('[data-tilt]');

tiltElements.forEach(element => {
    element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });

    element.addEventListener('mouseleave', () => {
        element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});

// ===================================
// Initialize on page load
// ===================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    highlightNavigation();
    updateCart();
});

// ===================================
// Console welcome message
// ===================================
console.log('%cWelcome to Wendy\'s Whisk & Wonder! 🍰', 'color: #FF6B9D; font-size: 20px; font-weight: bold;');
console.log('%cBaked with love, coded with care.', 'color: #5A5A5A; font-size: 14px;');
console.log('%cWebsite fully loaded and ready!', 'color: #4CAF50; font-size: 12px;');
