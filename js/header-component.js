// Header Component - Reusable across all pages
class HeaderComponent {
    constructor() {
        this.currentPage = this.getCurrentPage();
        this.render();
        this.attachEventListeners();
        
        // Initialize header height calculation
        this.updateHeaderHeight();
    }

    getCurrentPage() {
        const path = window.location.pathname;
        const page = path.split('/').pop() || 'index.html';
        return page === '' ? 'index.html' : page;
    }

    getHeaderHTML() {
        const navItems = [
            { href: 'index.html', text: 'Home' },
            { href: 'about.html', text: 'About Me' },
            { href: 'approach.html', text: 'My Approach' },
            { href: 'services.html', text: 'Services & Fees' },
            { href: 'contact.html', text: 'Contact Me' }
        ];

        const navItemsHTML = navItems.map(item => {
            const isActive = item.href === this.currentPage;
            return `<li><a href="${item.href}" ${isActive ? 'class="active"' : ''}>${item.text}</a></li>`;
        }).join('');

        return `
            <header>
                <nav class="main-nav">
                    <div class="nav-container">
                        <a href="index.html" class="nav-logo" aria-label="Go to homepage">
                            <img src="images/icon.png" alt="Fernanda Da Silva OT logo" width="40" height="40">
                        </a>
                        <a href="index.html" class="brand-text" aria-label="Go to homepage">Fernanda Da Silva</a>
                        <button class="mobile-menu-toggle" aria-label="Toggle navigation menu">
                            <span class="hamburger-line"></span>
                            <span class="hamburger-line"></span>
                            <span class="hamburger-line"></span>
                        </button>
                        <ul class="nav-menu">
                            ${navItemsHTML}
                        </ul>
                    </div>
                </nav>
                
                <!-- Back to Top Button -->
                <button class="back-to-top" aria-label="Back to top" title="Back to top">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 4L4 12H8V20H16V12H20L12 4Z" fill="currentColor"/>
                    </svg>
                </button>
            </header>
        `;
    }

    render() {
        // Insert header at the beginning of body
        document.body.insertAdjacentHTML('afterbegin', this.getHeaderHTML());
        
        // Update CSS variables with actual header height
        this.updateHeaderHeight();
    }

    attachEventListeners() {
        // Mobile menu functionality
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (mobileToggle && navMenu) {
            // Toggle mobile menu
            mobileToggle.addEventListener('click', () => {
                mobileToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
                
                // Prevent body scroll when menu is open
                document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
            });
            
            // Close mobile menu when clicking on a link
            navMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });
            
            // Close mobile menu when clicking outside
            document.addEventListener('click', (event) => {
                if (!navMenu.contains(event.target) && !mobileToggle.contains(event.target)) {
                    mobileToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
            
            // Close mobile menu on window resize if desktop
            window.addEventListener('resize', () => {
                if (window.innerWidth > 768) {
                    mobileToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }

        // Scroll behavior
        this.initializeScrollHeader();
        
        // Navigation transitions
        this.initializeNavigationTransitions();
        
        // Initialize expertise section interactions (mobile)
        this.initializeExpertiseInteractions();
        
        // Initialize back to top button
        this.initializeBackToTop();
    }

    initializeScrollHeader() {
        const header = document.querySelector('.main-nav');
        let ticking = false;
        
        const updateHeaderOnScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            ticking = false;
        };
        
        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateHeaderOnScroll);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', requestTick, { passive: true });
        updateHeaderOnScroll();
    }

    initializeNavigationTransitions() {
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 100);
            });
        });
    }

    updateHeaderHeight() {
        this.calculateAndSetHeaderHeight();
        
        // Handle dynamic height changes (confirmed requirement)
        this.setupHeaderHeightMonitoring();
    }
    
    calculateAndSetHeaderHeight() {
        try {
            const header = document.querySelector('.main-nav');
            if (!header) {
                // Header element not found - using CSS fallback values
                return;
            }
            
            // Get actual header height
            const headerHeight = header.offsetHeight;
            const viewportWidth = window.innerWidth;
            
            // Determine appropriate breakpoint
            let breakpoint = 'mobile';
            if (viewportWidth >= 769) {
                breakpoint = 'desktop';
            } else if (viewportWidth >= 481) {
                breakpoint = 'tablet';
            }
            
            // Update CSS variables with measured values
            document.documentElement.style.setProperty('--header-height-mobile', `${headerHeight}px`);
            document.documentElement.style.setProperty('--header-height-tablet', `${headerHeight}px`);
            document.documentElement.style.setProperty('--header-height-desktop', `${headerHeight}px`);
            
            // Trigger custom event for other components to listen to
            document.dispatchEvent(new CustomEvent('headerHeightUpdated', {
                detail: { 
                    height: headerHeight, 
                    breakpoint: breakpoint,
                    viewport: viewportWidth
                }
            }));
            
        } catch (error) {
            // Header height calculation failed, CSS fallback values will be used
        }
    }
    
    setupHeaderHeightMonitoring() {
        let resizeTimeout;
        
        // Debounced resize handler
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.calculateAndSetHeaderHeight();
            }, 150); // Slightly longer delay for better performance
        };
        
        // Monitor window resize
        window.addEventListener('resize', handleResize, { passive: true });
        
        // Monitor orientation changes specifically
        window.addEventListener('orientationchange', () => {
            // Delay to allow orientation change to complete
            setTimeout(() => {
                this.calculateAndSetHeaderHeight();
            }, 300);
        });
        
        // Monitor for potential DOM changes that might affect header height
        if (window.MutationObserver) {
            const headerObserver = new MutationObserver((mutations) => {
                let shouldUpdate = false;
                
                mutations.forEach(mutation => {
                    // Check if changes might affect header size
                    if (mutation.type === 'childList' || 
                        (mutation.type === 'attributes' && 
                         ['class', 'style'].includes(mutation.attributeName))) {
                        shouldUpdate = true;
                    }
                });
                
                if (shouldUpdate) {
                    // Debounce DOM change updates
                    clearTimeout(this.domChangeTimeout);
                    this.domChangeTimeout = setTimeout(() => {
                        this.calculateAndSetHeaderHeight();
                    }, 100);
                }
            });
            
            // Observe header and navigation for changes
            const header = document.querySelector('.main-nav');
            if (header) {
                headerObserver.observe(header, {
                    childList: true,
                    subtree: true,
                    attributes: true,
                    attributeFilter: ['class', 'style']
                });
            }
        }
        
        // Initial calculation after a short delay to ensure DOM is ready
        setTimeout(() => {
            this.calculateAndSetHeaderHeight();
        }, 100);
    }

    initializeExpertiseInteractions() {
        // Only run on pages that have expertise sections
        const expertiseItems = document.querySelectorAll('.expertise-item');
        if (expertiseItems.length === 0) return;
        
        // Function to check if we're on mobile
        const isMobile = () => window.innerWidth <= 768;
        
        // Add click event listeners to expertise items
        expertiseItems.forEach(item => {
            item.addEventListener('click', (e) => {
                // Only handle clicks on mobile devices
                if (!isMobile()) return;
                
                // Prevent default behavior
                e.preventDefault();
                
                // Check if this item is currently expanded
                const isExpanded = item.classList.contains('expanded');
                
                if (isExpanded) {
                    // If expanded, collapse it
                    item.classList.remove('expanded');
                } else {
                    // If collapsed, expand it and collapse others
                    // First collapse all other items
                    expertiseItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('expanded');
                        }
                    });
                    
                    // Then expand this item
                    item.classList.add('expanded');
                }
            });
            
            // Add keyboard support for accessibility
            item.addEventListener('keydown', (e) => {
                if (!isMobile()) return;
                
                // Handle Enter and Space key presses
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    item.click(); // Trigger the click event
                }
            });
            
            // Make items focusable on mobile for keyboard navigation
            if (isMobile()) {
                item.setAttribute('tabindex', '0');
                item.setAttribute('role', 'button');
                item.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Handle window resize to reset functionality when switching between mobile/desktop
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const mobile = isMobile();
                
                expertiseItems.forEach(item => {
                    if (mobile) {
                        // Set up mobile attributes
                        item.setAttribute('tabindex', '0');
                        item.setAttribute('role', 'button');
                        item.setAttribute('aria-expanded', item.classList.contains('expanded') ? 'true' : 'false');
                    } else {
                        // Remove mobile attributes and expanded state for desktop
                        item.removeAttribute('tabindex');
                        item.removeAttribute('role');
                        item.removeAttribute('aria-expanded');
                        item.classList.remove('expanded');
                    }
                });
            }, 150);
        });
        
        // Update aria-expanded when items are toggled
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const item = mutation.target;
                    if (item.classList.contains('expertise-item') && isMobile()) {
                        const isExpanded = item.classList.contains('expanded');
                        item.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
                    }
                }
            });
        });
        
        // Observe each expertise item for class changes
        expertiseItems.forEach(item => {
            observer.observe(item, { attributes: true, attributeFilter: ['class'] });
        });
    }

    initializeBackToTop() {
        const backToTopButton = document.querySelector('.back-to-top');
        if (!backToTopButton) return;
        
        // Function to check scroll position and show/hide button
        const toggleButtonVisibility = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const threshold = 300; // Show button after scrolling 300px
            
            if (scrollTop > threshold) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        };
        
        // Function to scroll to top smoothly
        const scrollToTop = () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        };
        
        // Add click event listener
        backToTopButton.addEventListener('click', scrollToTop);
        
        // Add keyboard support
        backToTopButton.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                scrollToTop();
            }
        });
        
        // Throttled scroll listener for performance
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    toggleButtonVisibility();
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        // Add scroll event listener
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // Initial check
        toggleButtonVisibility();
    }

}

// Initialize header when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HeaderComponent();
}); 