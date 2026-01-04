    // ===========================================
    // RSH ELECTRICAL PRODUCTS CUSTOM JAVASCRIPT
    // ===========================================

    // Smooth scrolling for all navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Don't smooth scroll if it's a dropdown or has special class
            if (this.classList.contains('dropdown-toggle') || this.getAttribute('data-bs-toggle')) {
                return;
            }
            
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '#!') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Update URL hash without scrolling
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    location.hash = targetId;
                }
            }
        });
    });

    // Highlight active navigation link on scroll (complements Bootstrap scrollspy)
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('#navbarResponsive .nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && href.includes('#' + current)) {
                link.classList.add('active');
            }
        });
    });

    // Member login form handling
    const memberLoginForm = document.querySelector('.member-login-box form');
    if (memberLoginForm) {
        memberLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('memberUsername');
            const password = document.getElementById('memberPassword');
            
            // Basic validation
            if (!username.value || !password.value) {
                alert('Please enter both username and password.');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Logging in...';
            submitBtn.disabled = true;
            
            // Simulate API call (replace with actual authentication)
            setTimeout(() => {
                // In production, this would make an actual API call
                // For demo purposes, we'll just show a success message
                alert('Login functionality would connect to your member portal backend.\n\nDemo: Username: ' + username.value);
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Clear form (in production, you'd redirect to member dashboard)
                // this.reset();
            }, 1000);
        });
    }

    // Product inquiry buttons
    document.querySelectorAll('.product-card .btn-primary').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h4').textContent;
            const productPrice = productCard.querySelector('.fw-bold').textContent;
            
            // Store product info for contact form
            sessionStorage.setItem('productInquiry', JSON.stringify({
                name: productName,
                price: productPrice
            }));
            
            // Scroll to contact section
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                window.scrollTo({
                    top: contactSection.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Pre-fill message in contact form (optional)
                const messageField = document.getElementById('message');
                if (messageField) {
                    messageField.value = `I'm interested in: ${productName}\n\nPlease send me more information about this product.`;
                }
                
                // Highlight the product inquiry
                setTimeout(() => {
                    alert(`You're inquiring about: ${productName}\n\nThe contact form is now ready for your inquiry.`);
                }, 500);
            }
        });
    });

    // Contact form enhancement for product inquiries
    document.addEventListener('DOMContentLoaded', function() {
        const contactForm = document.getElementById('contactForm');
        const messageField = document.getElementById('message');
        
        // Check if there's a product inquiry in session storage
        const productInquiry = sessionStorage.getItem('productInquiry');
        if (productInquiry && messageField) {
            const product = JSON.parse(productInquiry);
            messageField.value = `I'm interested in: ${product.name} (${product.price})\n\nPlease send me more information about this product.`;
            
            // Clear session storage after pre-filling
            setTimeout(() => {
                sessionStorage.removeItem('productInquiry');
            }, 5000);
        }
    });

    // Initialize tooltips for product cards (if using Bootstrap tooltips)
    if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
    }

    // Add animation to stats when they come into view
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.rsh-stat-number');
                statNumbers.forEach(stat => {
                    // Add a subtle animation class
                    stat.classList.add('animate__animated', 'animate__fadeInUp');
                });
            }
        });
    }, observerOptions);
    
    // Observe the stats section if it exists
    const statsSection = document.querySelector('.rsh-stat');
    if (statsSection) {
        observer.observe(statsSection.closest('section') || statsSection);
    }

    // Form validation enhancement
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });