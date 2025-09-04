// Initialize particle background
document.addEventListener('DOMContentLoaded', function() {
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#00f3ff" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#cf00ff",
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" },
                resize: true
            }
        },
        retina_detect: true
    });
    
    // Mobile menu toggle functionality
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenu.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Service tabs functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button and corresponding pane
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Service type selector functionality
    const serviceTypeButtons = document.querySelectorAll('.service-type-btn');
    const servicePricing = document.querySelectorAll('.service-pricing');
    
    serviceTypeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const serviceType = this.getAttribute('data-service');
            
            // Remove active class from all buttons and pricing sections
            serviceTypeButtons.forEach(btn => btn.classList.remove('active'));
            servicePricing.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked button and corresponding pricing section
            this.classList.add('active');
            document.getElementById(`${serviceType}-pricing`).classList.add('active');
            
            // Update prices for the new service type
            const currentCurrency = document.getElementById('currency').value;
            updatePrices(currentCurrency);
        });
    });
    
    // Currency conversion functionality
    const currencySelector = document.getElementById('currency');
    if (currencySelector) {
        currencySelector.addEventListener('change', function() {
            updatePrices(this.value);
        });
    }
    
    // FAQ accordion functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isActive = answer.classList.contains('active');
            
            // Close all answers
            document.querySelectorAll('.faq-answer').forEach(ans => {
                ans.classList.remove('active');
            });
            
            // Toggle icon
            document.querySelectorAll('.faq-question i').forEach(icon => {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            });
            
            // Open clicked answer if it wasn't active
            if (!isActive) {
                answer.classList.add('active');
                this.querySelector('i').classList.remove('fa-chevron-down');
                this.querySelector('i').classList.add('fa-chevron-up');
            }
        });
    });
    
    // Form handling with better user experience
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let valid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const service = document.getElementById('service');
            const message = document.getElementById('message');
            
            // Reset previous error styles
            name.style.borderColor = '';
            email.style.borderColor = '';
            service.style.borderColor = '';
            message.style.borderColor = '';
            formStatus.style.display = 'none';
            
            // Validate form
            if (!name.value.trim()) {
                valid = false;
                name.style.borderColor = 'red';
            }
            
            if (!email.value.trim() || !email.validity.valid) {
                valid = false;
                email.style.borderColor = 'red';
            }
            
            if (!service.value) {
                valid = false;
                service.style.borderColor = 'red';
            }
            
            if (!message.value.trim()) {
                valid = false;
                message.style.borderColor = 'red';
            }
            
            if (!valid) {
                showFormStatus('Please fill out all required fields correctly.', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Use FormSubmit with AJAX to avoid redirect
            const formData = new FormData();
            formData.append('name', name.value);
            formData.append('email', email.value);
            formData.append('company', document.getElementById('company').value);
            formData.append('service', service.value);
            formData.append('message', message.value);
            formData.append('_subject', 'New Professional Inquiry - AfrixaTech Website');
            formData.append('_template', 'table');
            formData.append('_captcha', 'false');
            
            fetch('https://formsubmit.co/ajax/afrixaai@gmail.com', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (response.ok) {
                    showFormStatus('Thank you for your inquiry! Our team will contact you within 24 hours to discuss your project.', 'success');
                    contactForm.reset();
                } else {
                    throw new Error('Submission failed');
                }
            })
            .catch(error => {
                console.error('Form submission error:', error);
                showFormStatus('Sorry, there was an error sending your message. Please try again later or email us directly at afrixaai@gmail.com.', 'error');
            })
            .finally(() => {
                // Reset button state
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            });
        });
    }
    
    function showFormStatus(message, type) {
        formStatus.textContent = message;
        formStatus.style.display = 'block';
        
        if (type === 'success') {
            formStatus.style.backgroundColor = 'rgba(46, 204, 113, 0.2)';
            formStatus.style.color = '#2ecc71';
            formStatus.style.border = '1px solid #2ecc71';
        } else {
            formStatus.style.backgroundColor = 'rgba(231, 76, 60, 0.2)';
            formStatus.style.color = '#e74c3c';
            formStatus.style.border = '1px solid #e74c3c';
        }
        
        // Scroll to status message
        formStatus.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    // Initialize currency prices
    updatePrices('NGN');
});

// Currency conversion function - Updated for multiple services
function updatePrices(currency) {
    const currencySymbols = {
        'NGN': '₦',
        'USD': '$',
        'EUR': '€',
        'GBP': '£',
        'GHS': '₵',
        'KES': 'KSh',
        'RWF': 'FRw',
        'TZS': 'TSh',
        'UGX': 'USh',
        'ZAR': 'R',
        'ZMW': 'ZK'
    };
    
    const prices = document.querySelectorAll('.price');
    prices.forEach(priceEl => {
        const priceValue = priceEl.getAttribute(`data-${currency.toLowerCase()}`);
        
        if (priceValue === 'custom') {
            priceEl.innerHTML = 'Custom<span>' + (priceEl.querySelector('span') ? priceEl.querySelector('span').textContent : '/month') + '</span>';
        } else {
            // Format the number with commas
            const formattedPrice = Number(priceValue).toLocaleString();
            priceEl.innerHTML = `${currencySymbols[currency]}${formattedPrice}<span>` + 
                               (priceEl.querySelector('span') ? priceEl.querySelector('span').textContent : '/month') + '</span>';
        }
    });
}

// Floating elements animation
function animateFloatingElements() {
    const elements = document.querySelectorAll('.floating-element');
    elements.forEach((el, index) => {
        el.style.animationDelay = `${index * 2}s`;
    });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', function() {
    animateFloatingElements();
    
    // Add intersection observer for animations
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
    
    // Observe all cards and sections
    document.querySelectorAll('.glass-card, .section-title').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});