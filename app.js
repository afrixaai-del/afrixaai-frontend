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
    
    // Form handling with direct email
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let valid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            // Reset previous error styles
            name.style.borderColor = '';
            email.style.borderColor = '';
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
            
            // Use direct mailto approach
            const subject = `New message from ${name.value} - AfrixaAI Contact Form`;
            const body = `Name: ${name.value}%0D%0AEmail: ${email.value}%0D%0A%0D%0AMessage:%0D%0A${message.value}`;
            
            // Create a temporary link to trigger the email client
            const mailtoLink = document.createElement('a');
            mailtoLink.href = `mailto:afrixaai@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            mailtoLink.style.display = 'none';
            document.body.appendChild(mailtoLink);
            
            // Trigger the click and clean up
            mailtoLink.click();
            document.body.removeChild(mailtoLink);
            
            // Show success message
            showFormStatus('Thank you for your message! Your email client should open shortly. Please click send to complete the process.', 'success');
            contactForm.reset();
            
            // Reset button state
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
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

// Currency conversion function
function updatePrices(currency) {
    const currencySymbols = {
        'NGN': '₦',
        'USD': '$',
        'EUR': '€',
        'GHS': '₵',
        'KES': 'KSh',
        'ZAR': 'R'
    };
    
    const prices = document.querySelectorAll('.price');
    prices.forEach(priceEl => {
        const priceValue = priceEl.getAttribute(`data-${currency.toLowerCase()}`);
        
        if (priceValue === 'custom') {
            priceEl.innerHTML = 'Custom<span>/month</span>';
        } else {
            // Format the number with commas
            const formattedPrice = Number(priceValue).toLocaleString();
            priceEl.innerHTML = `${currencySymbols[currency]}${formattedPrice}<span>/month</span>`;
        }
    });
}