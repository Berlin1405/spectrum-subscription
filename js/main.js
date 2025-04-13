document.addEventListener('DOMContentLoaded', () => {
    // Modal Management
    const modalContainer = document.getElementById('modalContainer');
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    const planModal = document.getElementById('planModal');
    const successModal = document.getElementById('successModal');
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const heroSignupBtn = document.getElementById('heroSignupBtn');
    const ctaSignupBtn = document.getElementById('ctaSignupBtn');
    const switchToSignup = document.getElementById('switchToSignup');
    const switchToLogin = document.getElementById('switchToLogin');
    const modalCloseBtns = document.querySelectorAll('.modal-close');

    // Show modal function
    function showModal(modal) {
        modalContainer.classList.add('show');
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
        document.body.style.overflow = 'hidden';
    }

    // Hide modal function
    function hideModal() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('show');
        });
        setTimeout(() => {
            modalContainer.classList.remove('show');
            document.body.style.overflow = 'auto';
        }, 300);
    }

    // Event listeners for modal buttons
    loginBtn.addEventListener('click', () => showModal(loginModal));
    signupBtn.addEventListener('click', () => showModal(signupModal));
    heroSignupBtn.addEventListener('click', () => showModal(signupModal));
    ctaSignupBtn.addEventListener('click', () => showModal(signupModal));

    // Switch between login and signup
    switchToSignup.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.classList.remove('show');
        setTimeout(() => {
            loginModal.style.display = 'none';
            signupModal.style.display = 'block';
            setTimeout(() => {
                signupModal.classList.add('show');
            }, 10);
        }, 300);
    });

    switchToLogin.addEventListener('click', (e) => {
        e.preventDefault();
        signupModal.classList.remove('show');
        setTimeout(() => {
            signupModal.style.display = 'none';
            loginModal.style.display = 'block';
            setTimeout(() => {
                loginModal.classList.add('show');
            }, 10);
        }, 300);
    });

    // Close modal when clicking outside
    modalContainer.addEventListener('click', (e) => {
        if (e.target === modalContainer) {
            hideModal();
        }
    });

    // Close modal when clicking close button
    modalCloseBtns.forEach(btn => {
        btn.addEventListener('click', hideModal);
    });

    // Pricing Toggle
    const billingToggle = document.getElementById('billing-toggle');
    const priceMonthly = document.querySelectorAll('.price-monthly');
    const priceYearly = document.querySelectorAll('.price-yearly');

    billingToggle.addEventListener('change', () => {
        const isYearly = billingToggle.checked;
        priceMonthly.forEach(price => price.style.display = isYearly ? 'none' : 'inline');
        priceYearly.forEach(price => price.style.display = isYearly ? 'inline' : 'none');
    });

    // Plan Selection
    const planButtons = document.querySelectorAll('[data-plan]');
    const selectedPlan = document.getElementById('selectedPlan');
    const selectedPlanPrice = document.getElementById('selectedPlanPrice');
    const selectedBillingCycle = document.getElementById('selectedBillingCycle');

    planButtons.forEach(button => {
        button.addEventListener('click', () => {
            const plan = button.dataset.plan;
            const isYearly = billingToggle.checked;
            let price = '';

            switch(plan) {
                case 'basic':
                    price = isYearly ? '$9.60' : '$12';
                    break;
                case 'pro':
                    price = isYearly ? '$19.20' : '$24';
                    break;
                case 'enterprise':
                    price = isYearly ? '$39.20' : '$49';
                    break;
            }

            selectedPlan.textContent = plan.charAt(0).toUpperCase() + plan.slice(1);
            selectedPlanPrice.textContent = price;
            selectedBillingCycle.textContent = isYearly ? 'yearly' : 'monthly';
            showModal(planModal);
        });
    });

    // Testimonial Slider
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.control-btn.prev');
    const nextBtn = document.querySelector('.control-btn.next');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;

    function showSlide(index) {
        testimonialCards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonialCards[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % testimonialCards.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + testimonialCards.length) % testimonialCards.length;
        showSlide(currentSlide);
    }

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });

    // Auto-advance testimonials
    setInterval(nextSlide, 5000);

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const toggle = item.querySelector('.faq-toggle i');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-toggle i').className = 'fas fa-plus';
            });

            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
                toggle.className = 'fas fa-minus';
            }
        });
    });

    // Form Validation
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validatePassword(password) {
        return password.length >= 8;
    }

    function showError(input, message) {
        const formGroup = input.parentElement;
        const error = formGroup.querySelector('.error-message') || document.createElement('div');
        error.className = 'error-message';
        error.textContent = message;
        if (!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(error);
        }
        input.classList.add('error');
    }

    function removeError(input) {
        const formGroup = input.parentElement;
        const error = formGroup.querySelector('.error-message');
        if (error) {
            error.remove();
        }
        input.classList.remove('error');
    }

    // Login Form Validation
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;

            const email = this.querySelector('input[type="email"]');
            const password = this.querySelector('input[type="password"]');

            // Validate email
            if (!validateEmail(email.value)) {
                showError(email, 'Please enter a valid email address');
                isValid = false;
            } else {
                removeError(email);
            }

            // Validate password
            if (!validatePassword(password.value)) {
                showError(password, 'Password must be at least 8 characters long');
                isValid = false;
            } else {
                removeError(password);
            }

            if (isValid) {
                // Here you would typically make an API call to authenticate the user
                console.log('Login form is valid');
                // Redirect to dashboard or home page
                window.location.href = 'index.html';
            }
        });
    }

    // Signup Form Validation
    const signupForm = document.querySelector('.signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;

            const name = this.querySelector('input[type="text"]');
            const email = this.querySelector('input[type="email"]');
            const password = this.querySelector('input[type="password"]');
            const terms = this.querySelector('input[type="checkbox"]');

            // Validate name
            if (name.value.trim() === '') {
                showError(name, 'Please enter your full name');
                isValid = false;
            } else {
                removeError(name);
            }

            // Validate email
            if (!validateEmail(email.value)) {
                showError(email, 'Please enter a valid email address');
                isValid = false;
            } else {
                removeError(email);
            }

            // Validate password
            if (!validatePassword(password.value)) {
                showError(password, 'Password must be at least 8 characters long');
                isValid = false;
            } else {
                removeError(password);
            }

            // Validate terms
            if (!terms.checked) {
                const termsError = document.createElement('div');
                termsError.className = 'error-message';
                termsError.textContent = 'You must agree to the terms of service';
                const checkboxGroup = terms.parentElement;
                if (!checkboxGroup.querySelector('.error-message')) {
                    checkboxGroup.appendChild(termsError);
                }
                isValid = false;
            } else {
                const termsError = checkboxGroup.querySelector('.error-message');
                if (termsError) {
                    termsError.remove();
                }
            }

            if (isValid) {
                // Here you would typically make an API call to create a new user
                console.log('Signup form is valid');
                // Redirect to success page or login page
                window.location.href = 'login.html';
            }
        });
    }

    // Password Strength Checker
    const passwordInput = document.querySelector('input[type="password"]');
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            const strengthMeter = this.parentElement.querySelector('.strength-meter span');
            const strengthText = this.parentElement.querySelector('.strength-text span');

            let strength = 0;
            let color = '#ef4444'; // red
            let text = 'Weak';

            if (password.length >= 8) strength++;
            if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
            if (password.match(/[0-9]/)) strength++;
            if (password.match(/[^a-zA-Z0-9]/)) strength++;

            switch (strength) {
                case 1:
                    color = '#ef4444'; // red
                    text = 'Weak';
                    break;
                case 2:
                    color = '#f59e0b'; // yellow
                    text = 'Fair';
                    break;
                case 3:
                    color = '#10b981'; // green
                    text = 'Good';
                    break;
                case 4:
                    color = '#3b82f6'; // blue
                    text = 'Strong';
                    break;
            }

            strengthMeter.style.width = `${(strength / 4) * 100}%`;
            strengthMeter.style.backgroundColor = color;
            strengthText.textContent = text;
            strengthText.style.color = color;
        });
    }

    // Real-time Validation
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.type === 'email' && this.value) {
                if (!validateEmail(this.value)) {
                    showError(this, 'Please enter a valid email address');
                } else {
                    removeError(this);
                }
            }
            
            if (this.type === 'password' && this.value) {
                if (!validatePassword(this.value)) {
                    showError(this, 'Password must be at least 8 characters long');
                } else {
                    removeError(this);
                }
            }
        });
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const authButtons = document.querySelector('.auth-buttons');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        authButtons.classList.toggle('active');
    });

    // Smooth Scrolling
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

    // Add fade-in animation to sections on scroll
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
}); 

document.addEventListener("DOMContentLoaded", () => {
    const toggleSwitch = document.querySelector("#billing-toggle");
    const monthlyPrices = document.querySelectorAll(".price-monthly");
    const yearlyPrices = document.querySelectorAll(".price-yearly");

    const updatePrices = () => {
        if (toggleSwitch.checked) {
            // Show yearly prices and hide monthly prices
            monthlyPrices.forEach(price => price.style.display = "none");
            yearlyPrices.forEach(price => price.style.display = "inline");
        } else {
            // Show monthly prices and hide yearly prices
            monthlyPrices.forEach(price => price.style.display = "inline");
            yearlyPrices.forEach(price => price.style.display = "none");
        }
    };

    // Add event listener to toggle switch
    toggleSwitch.addEventListener("change", updatePrices);

    // Initialize the prices on page load
    updatePrices();
});

document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".testimonial-card");
    const dots = document.querySelectorAll(".dot");
    const prevButton = document.querySelector(".control-btn.prev");
    const nextButton = document.querySelector(".control-btn.next");
    let currentSlide = 0;
    let autoSlideInterval;

    // Function to show the current slide
    const showSlide = (index) => {
        slides.forEach((slide, i) => {
            slide.classList.toggle("active", i === index);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === index);
        });
    };

    // Function to go to the next slide
    const nextSlide = () => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    };

    // Function to go to the previous slide
    const prevSlide = () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    };

    // Function to start automatic sliding
    const startAutoSlide = () => {
        autoSlideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    };

    // Function to stop automatic sliding
    const stopAutoSlide = () => {
        clearInterval(autoSlideInterval);
    };

    // Add event listeners to buttons
    nextButton.addEventListener("click", () => {
        stopAutoSlide(); // Stop auto-slide when manually navigating
        nextSlide();
        startAutoSlide(); // Restart auto-slide
    });

    prevButton.addEventListener("click", () => {
        stopAutoSlide(); // Stop auto-slide when manually navigating
        prevSlide();
        startAutoSlide(); // Restart auto-slide
    });

    // Add event listeners to dots
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            stopAutoSlide(); // Stop auto-slide when manually navigating
            currentSlide = index;
            showSlide(currentSlide);
            startAutoSlide(); // Restart auto-slide
        });
    });

    // Initialize the slider
    showSlide(currentSlide);
    startAutoSlide(); // Start automatic sliding on page load
});