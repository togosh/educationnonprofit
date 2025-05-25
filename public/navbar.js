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

// Initialize mobile menu when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
});
