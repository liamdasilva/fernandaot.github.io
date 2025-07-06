// Multi-page navigation handling
document.addEventListener('DOMContentLoaded', function() {
    
    // Set active navigation item based on current page
    function setActiveNavItem() {
        const navLinks = document.querySelectorAll('.main-nav a');
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            
            // Get the href attribute and extract just the filename
            const linkHref = link.getAttribute('href');
            const linkPage = linkHref.split('/').pop();
            
            // Check if this link corresponds to the current page
            if (linkPage === currentPage || 
                (currentPage === '' && linkPage === 'index.html') ||
                (currentPage === 'index.html' && linkPage === 'index.html')) {
                link.classList.add('active');
            }
        });
    }
    
    // Set active nav item on page load
    setActiveNavItem();
    
    // Add smooth transition effects for page navigation
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Allow normal navigation to occur
            // Add a small delay to show the click effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
    });
    
    // Handle back/forward browser navigation
    window.addEventListener('popstate', function() {
        setActiveNavItem();
    });
    
    // Mobile menu toggle (if needed in future)
    function initializeMobileMenu() {
        const nav = document.querySelector('.main-nav');
        const navUl = nav.querySelector('ul');
        
        // Add mobile menu button if screen is small
        if (window.innerWidth <= 768) {
            // Mobile menu functionality can be added here if needed
        }
    }
    
    // Initialize mobile menu on load and resize
    initializeMobileMenu();
    window.addEventListener('resize', initializeMobileMenu);
    
    // Add loading state handling
    function addLoadingState() {
        document.body.classList.add('loading');
        
        // Remove loading state after a short delay
        setTimeout(() => {
            document.body.classList.remove('loading');
        }, 200);
    }
    
    // Add loading state to external links
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', addLoadingState);
    });
    
    // Interactive header scroll behavior
    function initializeScrollHeader() {
        const header = document.querySelector('.main-nav');
        let lastScrollTop = 0;
        let scrollTimeout;
        
        function updateHeaderOnScroll() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add/remove scrolled class based on scroll position
            if (scrollTop > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Optional: Add hide/show behavior on scroll direction
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down - could hide header if desired
                header.classList.add('scroll-down');
                header.classList.remove('scroll-up');
            } else if (scrollTop < lastScrollTop) {
                // Scrolling up - show header
                header.classList.add('scroll-up');
                header.classList.remove('scroll-down');
            }
            
            lastScrollTop = scrollTop;
            
            // Clear any existing timeout
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            
            // Add scrolling class while scrolling
            header.classList.add('scrolling');
            
            // Remove scrolling class after scroll stops
            scrollTimeout = setTimeout(() => {
                header.classList.remove('scrolling');
            }, 150);
        }
        
        // Throttle scroll events for better performance
        let ticking = false;
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateHeaderOnScroll);
                ticking = true;
                setTimeout(() => { ticking = false; }, 16); // ~60fps
            }
        }
        
        // Listen for scroll events
        window.addEventListener('scroll', requestTick);
        
        // Initial check
        updateHeaderOnScroll();
    }
    
    // Initialize scroll header behavior
    initializeScrollHeader();
}); 