// LIFT Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    loadFooter(); // Call loadFooter here

    // Mobile Menu Toggle
    const menuButton = document.querySelector('.mobile-menu-button');
    const navUl = document.querySelector('header nav ul');

    if (menuButton && navUl) {
        menuButton.addEventListener('click', () => {
            navUl.classList.toggle('active');
        });
    }

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
