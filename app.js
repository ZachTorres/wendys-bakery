// Global cart state
let cart = JSON.parse(localStorage.getItem('bakeryCart')) || [];

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    initializeAddToCartButtons();
    initializeContactForm();
    initializeCountdownTimers();
});

// Update cart count display
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('#cartCount, .cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElements.forEach(el => {
        if (el) el.textContent = totalItems;
    });
}

// Initialize Add to Cart buttons
function initializeAddToCartButtons() {
    const addToCartButtons = document.querySelectorAll('.btn-cart, .add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();

            // Get product information from the card
            const productCard = this.closest('.product-card, .featured-card, .special-card');
            if (!productCard) return;

            const title = productCard.querySelector('.product-title, h3')?.textContent || 'Product';
            const priceText = productCard.querySelector('.product-price, .special-price, .price-amount')?.textContent || '$0';
            const price = parseFloat(priceText.replace('$', '').replace(',', ''));
            const image = productCard.querySelector('img')?.src || '';

            // Add to cart
            addToCart({
                id: title.toLowerCase().replace(/\s+/g, '-'),
                title: title,
                price: price,
                image: image,
                quantity: 1
            });

            // Visual feedback
            showAddedToCartFeedback(this);
        });
    });
}

// Add item to cart
function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push(product);
    }

    // Save to localStorage
    localStorage.setItem('bakeryCart', JSON.stringify(cart));

    // Update cart count
    updateCartCount();
}

// Show visual feedback when item added to cart
function showAddedToCartFeedback(button) {
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i> Added!';
    button.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';

    setTimeout(() => {
        button.innerHTML = originalText;
        button.style.background = '';
    }, 1500);
}

// Initialize contact form
function initializeContactForm() {
    const contactForm = document.querySelector('.contact-form form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = {
                name: document.getElementById('name')?.value,
                email: document.getElementById('email')?.value,
                phone: document.getElementById('phone')?.value,
                message: document.getElementById('message')?.value
            };

            // Show success message
            showFormSuccessMessage(this);

            // Log to console (in a real app, this would send to a server)
            console.log('Form submitted:', formData);

            // Reset form
            this.reset();
        });
    }
}

// Show form success message
function showFormSuccessMessage(form) {
    const submitButton = form.querySelector('.btn-submit');
    const originalText = submitButton.innerHTML;

    submitButton.innerHTML = '<i class="fas fa-check-circle"></i> Message Sent!';
    submitButton.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
    submitButton.disabled = true;

    setTimeout(() => {
        submitButton.innerHTML = originalText;
        submitButton.style.background = '';
        submitButton.disabled = false;
    }, 3000);
}

// Initialize countdown timers for specials page
function initializeCountdownTimers() {
    const countdownElements = document.querySelectorAll('.countdown-timer');

    countdownElements.forEach(element => {
        const days = parseInt(element.dataset.days) || 3;
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + days);

        updateCountdown(element, endDate);

        // Update every second
        setInterval(() => updateCountdown(element, endDate), 1000);
    });
}

// Update countdown display
function updateCountdown(element, endDate) {
    const now = new Date().getTime();
    const distance = endDate - now;

    if (distance < 0) {
        element.innerHTML = '<span class="expired">Expired</span>';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    element.innerHTML = `
        <div class="countdown-item"><span class="countdown-number">${days}</span><span class="countdown-label">Days</span></div>
        <div class="countdown-item"><span class="countdown-number">${hours}</span><span class="countdown-label">Hours</span></div>
        <div class="countdown-item"><span class="countdown-number">${minutes}</span><span class="countdown-label">Min</span></div>
        <div class="countdown-item"><span class="countdown-number">${seconds}</span><span class="countdown-label">Sec</span></div>
    `;
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add active state to current navigation link
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.style.color = '#FF5C8D';
        }
    });
}

// Call on page load
setActiveNavLink();

// Handle "View Recipe" buttons on recipes page
document.querySelectorAll('.view-recipe-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const recipeCard = this.closest('.recipe-card');
        const recipeName = recipeCard.querySelector('.recipe-title')?.textContent || 'Recipe';

        alert(`Full recipe for "${recipeName}" coming soon! Check back later or follow us on Instagram for more recipes.`);
    });
});

// Handle "Claim This Deal" buttons on specials page
document.querySelectorAll('.claim-deal-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const dealCard = this.closest('.special-card');
        const dealName = dealCard.querySelector('.special-title, h3')?.textContent || 'Special';

        // Add to cart or redirect to shop
        window.location.href = 'shop.html';
    });
});

// Mobile menu toggle (if needed)
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
}

// Image lazy loading error handler
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.src = 'https://images.unsplash.com/photo-1587241321921-91a834d82e89?w=800';
        this.alt = 'Bakery Image';
    });
});
