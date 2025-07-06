// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all links with href starting with #
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Account for sticky nav height
                const navHeight = document.querySelector('.main-nav').offsetHeight;
                const targetPosition = target.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active class to navigation items based on scroll position
    const navLinks = document.querySelectorAll('.main-nav a');
    const sections = document.querySelectorAll('section');
    
    function updateActiveNav() {
        let current = '';
        const navHeight = document.querySelector('.main-nav').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionBottom = sectionTop + section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionBottom) {
                current = section.getAttribute('id');
            }
        });
        
        // Default to first section if no current section
        if (!current && sections.length > 0) {
            current = sections[0].getAttribute('id');
        }
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Throttle scroll event for better performance
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateActiveNav);
            ticking = true;
        }
    }
    
    function scrollHandler() {
        ticking = false;
        requestTick();
    }
    
    window.addEventListener('scroll', scrollHandler);
    updateActiveNav(); // Run once on load
    
    // Update active nav on resize (in case layout changes)
    window.addEventListener('resize', updateActiveNav);
});

// Add some basic styling for active navigation
const style = document.createElement('style');
style.textContent = `
    .main-nav a.active {
        color: #007bff;
        font-weight: 600;
    }
`;
document.head.appendChild(style); 