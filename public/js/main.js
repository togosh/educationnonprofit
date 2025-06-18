// LIFT Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Load Navbar
    const navbarContainer = document.getElementById('navbar-container');
    if (navbarContainer) {
        fetch('/navbar.html')
            .then(response => response.text())
            .then(html => {
                navbarContainer.innerHTML = html;
                initMobileMenu();
            });
    }

    // Set current year in footer
    loadFooter();

    // Contact Form Handler
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('.form-submit-btn');
            const messageDiv = contactForm.querySelector('.form-message');
            // Get form data
            const formData = {
                name: contactForm.querySelector('#name').value,
                email: contactForm.querySelector('#email').value,
                message: contactForm.querySelector('#message').value
            };
            // Disable submit button
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });
                const result = await response.json();
                if (response.ok) {
                    messageDiv.className = 'form-message success';
                    messageDiv.textContent = 'Thank you! Your message has been sent successfully.';
                    contactForm.reset();
                } else {
                    messageDiv.className = 'form-message error';
                    messageDiv.textContent = result.error || 'An error occurred. Please try again.';
                }
            } catch (error) {
                messageDiv.className = 'form-message error';
                messageDiv.textContent = 'Network error. Please try again later.';
            } finally {
                // Re-enable submit button
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
                messageDiv.style.display = 'block';
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Navbar mobile menu logic (moved from navbar.js)
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function(e) {
            e.stopPropagation();
            const isHidden = mobileMenu.classList.contains('hidden') || mobileMenu.style.display === 'none';
            // Toggle menu visibility
            if (isHidden) {
                mobileMenu.classList.remove('hidden');
                mobileMenu.style.display = 'block';
            } else {
                mobileMenu.classList.add('hidden');
                mobileMenu.style.display = 'none';
            }
            // Update icon
            const svgPath = this.querySelector('svg path');
            if (svgPath) {
                if (isHidden) {
                    svgPath.setAttribute('d', 'M6 18L18 6M6 6l12 12'); // X icon
                } else {
                    svgPath.setAttribute('d', 'M4 6h16M4 12h16M4 18h16'); // Hamburger icon
                }
            }
        });
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.add('hidden');
                mobileMenu.style.display = 'none';
                const svgPath = mobileMenuButton.querySelector('svg path');
                if (svgPath) {
                    svgPath.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
                }
            }
        });
    }
}

function loadFooter() {
    fetch('/footer.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.text();
        })
        .then(data => {
            const footerElement = document.querySelector('footer');
            if (footerElement) {
                footerElement.innerHTML = data;
                const yearSpan = document.getElementById('year'); // Ensure year is set after footer loads
                if (yearSpan) {
                    yearSpan.textContent = new Date().getFullYear();
                }
            } else {
                console.error('Footer element not found in the page.');
            }
        })
        .catch(error => {
            console.error('Failed to load footer:', error);
        });
}
