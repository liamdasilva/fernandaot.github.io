// Header Component - Reusable across all pages
class HeaderComponent {
    constructor() {
        this.currentPage = this.getCurrentPage();
        this.render();
        this.attachEventListeners();
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
            { href: 'play-project.html', text: 'The PLAY Project' },
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
                        <div class="nav-brand">
                            <span class="brand-text">Fernanda Da Silva OT</span>
                        </div>
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
            </header>
        `;
    }

    render() {
        // Insert header at the beginning of body
        document.body.insertAdjacentHTML('afterbegin', this.getHeaderHTML());
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
}

// Initialize header when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HeaderComponent();
}); 