# Project: Migrate Fernanda's OT Website from Wix to GitHub Pages

## Overview

This project involves migrating Fernanda Da Silva's occupational therapy website from Wix to GitHub Pages while maintaining the exact same design, layout, and functionality. The goal is to replicate the professional appearance and user experience of the current site at https://www.fernandaot.com/ while hosting it for free on GitHub Pages.

## Tasks

#### Task #1: Set up GitHub Pages infrastructure

- Status: complete
- Description: Initialize the repository with the necessary files for GitHub Pages deployment, including index.html, CSS files, and proper folder structure. Set up the repository to serve the website from the main branch.
- Acceptance Criteria:
  - ✅ Repository contains index.html as the main page
  - ✅ CSS and assets folders are properly structured
  - ⏳ GitHub Pages is enabled and serving the site (requires GitHub push)
  - ⏳ Site is accessible via fernandaot.github.io URL (requires GitHub push)
- Implementation Notes:
  - Created complete HTML structure with semantic markup
  - Set up CSS folder with responsive styles
  - Created JavaScript folder with navigation functionality
  - Added images folder with documentation of required images
  - Local development server can be started with `python3 -m http.server 8000`
- Assumptions:
  - The repository will use the main branch for GitHub Pages deployment
  - No custom domain configuration is needed initially
- Dependencies:
  - None (this is the foundation task)
- Reference files:
  - index.html (✅ created)
  - css/styles.css (✅ created)
  - js/navigation.js (✅ created)
  - images/ folder (✅ created)
- Examples for implementing:
  - Good example:
    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Fernanda Da Silva - Registered Occupational Therapist</title>
        <link rel="stylesheet" href="css/styles.css">
    </head>
    <body>
        <!-- Site content -->
    </body>
    </html>
    ```
  - Bad example:
    ```html
    <html>
    <head>
        <title>Website</title>
    </head>
    <body>
        <!-- Missing proper meta tags, CSS links -->
    </body>
    </html>
    ```

#### Task #2: Create HTML structure matching current site layout

- Status: not started
- Description: Build the HTML structure that replicates the current Wix site layout, including the header with navigation, hero section with introduction, areas of expertise, education/certifications, and footer. Ensure semantic HTML5 elements are used properly.
- Acceptance Criteria:
  - HTML structure matches the visual layout of the current site
  - Navigation menu includes all current menu items (Home, About Me, My Approach, The PLAY Project, Services & Fees, Contact Me, More)
  - Hero section includes professional introduction and space for headshot
  - Areas of expertise section lists all current specialties
  - Education and certifications section includes all current credentials
  - Footer includes copyright information
  - HTML validates without errors
- Assumptions:
  - The site will remain a single-page application with smooth scrolling to sections
  - All current content will be preserved exactly as written
- Dependencies:
  - Task #1 must be complete
- Reference files:
  - index.html
- Examples for implementing:
  - Good example:
    ```html
    <nav class="main-nav">
        <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About Me</a></li>
            <li><a href="#approach">My Approach</a></li>
            <!-- etc -->
        </ul>
    </nav>
    <main>
        <section id="hero">
            <h1>Fernanda Da Silva</h1>
            <h2>Registered Occupational Therapist</h2>
        </section>
    </main>
    ```
  - Bad example:
    ```html
    <div class="nav">
        <div>Home</div>
        <div>About</div>
    </div>
    <div class="content">
        <div>Fernanda Da Silva</div>
    </div>
    ```

#### Task #3: Replicate CSS styling to match current design

- Status: not started
- Description: Create comprehensive CSS that replicates the visual design of the current Wix site, including typography, colors, spacing, layout, and responsive behavior. Pay special attention to matching the professional appearance and color scheme.
- Acceptance Criteria:
  - Visual design matches the current Wix site as closely as possible
  - Typography (fonts, sizes, weights) matches current site
  - Color scheme and branding are preserved
  - Layout and spacing match current site
  - Responsive design works on mobile and desktop
  - Hover effects and transitions are implemented
  - Navigation menu functions properly
- Assumptions:
  - We'll use web-safe fonts or Google Fonts as alternatives if exact fonts aren't available
  - CSS Grid and Flexbox will be used for modern layout techniques
- Dependencies:
  - Task #2 must be complete
- Reference files:
  - css/styles.css
  - css/responsive.css (if needed)
- Examples for implementing:
  - Good example:
    ```css
    .hero-section {
        background-color: #f8f9fa;
        padding: 80px 20px;
        text-align: center;
    }
    .hero-section h1 {
        font-size: 3rem;
        color: #2c3e50;
        margin-bottom: 10px;
    }
    ```
  - Bad example:
    ```css
    .hero {
        background: white;
        padding: 10px;
    }
    h1 {
        font-size: 20px;
    }
    ```

#### Task #4: Source and optimize images

- Status: not started
- Description: Obtain or recreate all images from the current site including the professional headshot, certification logos (SOS Feeding, PLAY Project), and any other visual elements. Optimize images for web performance.
- Acceptance Criteria:
  - Professional headshot is sourced and properly sized
  - SOS Feeding certification logo is included
  - PLAY Project certification logo is included
  - All images are optimized for web (proper file sizes, formats)
  - Images have appropriate alt text for accessibility
  - Images are properly integrated into the HTML structure
- Assumptions:
  - We may need to use similar/alternative logos if exact ones aren't available
  - Images will be stored in an images/ folder
  - We'll use modern image formats (WebP with fallbacks) for optimization
- Dependencies:
  - Task #2 must be complete
- Reference files:
  - images/fernanda-headshot.jpg
  - images/sos-feeding-logo.png
  - images/play-project-logo.png
  - images/ (various other images)
- Examples for implementing:
  - Good example:
    ```html
    <img src="images/fernanda-headshot.jpg" 
         alt="Fernanda Da Silva, Registered Occupational Therapist" 
         class="headshot"
         loading="lazy">
    ```
  - Bad example:
    ```html
    <img src="headshot.jpg" class="img">
    ```

#### Task #5: Implement navigation functionality

- Status: not started
- Description: Create smooth scrolling navigation that allows users to jump to different sections of the page. Implement proper navigation highlighting and mobile menu functionality.
- Acceptance Criteria:
  - Navigation menu items link to corresponding page sections
  - Smooth scrolling animation is implemented
  - Active navigation item is highlighted based on current section
  - Mobile navigation menu works properly (hamburger menu if needed)
  - Navigation is accessible via keyboard
- Assumptions:
  - JavaScript will be used for smooth scrolling and navigation highlighting
  - Mobile menu will use a hamburger-style toggle
- Dependencies:
  - Task #2 and Task #3 must be complete
- Reference files:
  - js/navigation.js
  - index.html (navigation section)
  - css/styles.css (navigation styles)
- Examples for implementing:
  - Good example:
    ```javascript
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    ```
  - Bad example:
    ```javascript
    function scrollTo(id) {
        document.getElementById(id).scrollIntoView();
    }
    ```

#### Task #6: Add contact and professional information

- Status: not started
- Description: Implement all contact information, professional credentials, and business details exactly as they appear on the current site. Ensure all certifications, education details, and professional training are accurately represented.
- Acceptance Criteria:
  - All areas of expertise are listed exactly as on current site
  - Education section includes proper degree information and institutions
  - Professional training and certifications are complete and accurate
  - Contact information is properly formatted and accessible
  - COTO registration number is included
  - Copyright notice is present and correct
- Assumptions:
  - All professional information will be copied exactly from the current site
  - Contact form functionality may be added in a later phase
- Dependencies:
  - Task #2 must be complete
- Reference files:
  - index.html (contact and professional sections)
- Examples for implementing:
  - Good example:
    ```html
    <section id="credentials">
        <h2>Education and License</h2>
        <ul>
            <li>Registered Occupational Therapist - College of Occupational Therapists of Ontario, registration number G2012002.</li>
            <li>Master of Science in Occupational Therapy, McMaster University 2020.</li>
            <li>Honours Bachelor of Arts, University of Toronto, 2018</li>
        </ul>
    </section>
    ```
  - Bad example:
    ```html
    <div>
        <p>OT from McMaster</p>
        <p>Bachelor's from UofT</p>
    </div>
    ```

#### Task #7: Implement responsive design and mobile optimization

- Status: not started
- Description: Ensure the website works perfectly on all device sizes, from mobile phones to desktop computers. Test and optimize the responsive behavior to match the current site's mobile experience.
- Acceptance Criteria:
  - Website displays correctly on mobile devices (320px and up)
  - Tablet view is optimized and functional
  - Desktop view matches the current site layout
  - Navigation works properly on all screen sizes
  - Images and text scale appropriately
  - Touch targets are appropriately sized for mobile
  - Performance is optimized for mobile networks
- Assumptions:
  - Mobile-first approach will be used for CSS media queries
  - Breakpoints will be set at common device sizes
- Dependencies:
  - Task #3 must be complete
- Reference files:
  - css/styles.css (responsive sections)
  - css/responsive.css (if separate file needed)
- Examples for implementing:
  - Good example:
    ```css
    @media (max-width: 768px) {
        .hero-section {
            padding: 40px 15px;
        }
        .hero-section h1 {
            font-size: 2rem;
        }
    }
    ```
  - Bad example:
    ```css
    @media screen and (max-width: 800px) {
        .hero {
            width: 100%;
        }
    }
    ```

#### Task #8: Test and optimize performance

- Status: not started
- Description: Thoroughly test the website for functionality, performance, and accuracy compared to the original site. Optimize loading times, check for broken links, and ensure all features work as expected.
- Acceptance Criteria:
  - Website loads quickly (under 3 seconds)
  - All navigation links work correctly
  - Images load properly and are optimized
  - Website works in all major browsers
  - Mobile functionality is tested and working
  - No broken links or missing resources
  - Website passes basic accessibility checks
  - Content matches original site exactly
- Assumptions:
  - Testing will be done in Chrome, Safari, Firefox, and Edge
  - Mobile testing will be done on actual devices or browser dev tools
- Dependencies:
  - All previous tasks must be complete
- Reference files:
  - All project files
- Examples for implementing:
  - Good example:
    ```html
    <!-- Optimized meta tags -->
    <meta name="description" content="Fernanda Da Silva - Registered Occupational Therapist specializing in pediatric therapy in the Greater Toronto Area">
    <meta name="keywords" content="occupational therapy, pediatric therapy, GTA, Toronto, SOS feeding, PLAY project">
    ```
  - Bad example:
    ```html
    <meta name="description" content="Website">
    ```

#### Task #9: Deploy to GitHub Pages

- Status: not started
- Description: Configure GitHub Pages settings, ensure proper deployment, and verify the site is accessible via the GitHub Pages URL. Set up any necessary redirects or domain configuration.
- Acceptance Criteria:
  - GitHub Pages is properly configured in repository settings
  - Website is accessible via fernandaot.github.io
  - All resources (CSS, JS, images) load correctly from GitHub Pages
  - HTTPS is enabled
  - Site performs well when served from GitHub Pages
- Assumptions:
  - Site will initially use the default GitHub Pages domain
  - Custom domain setup can be added later if needed
- Dependencies:
  - All previous tasks must be complete
- Reference files:
  - GitHub repository settings
  - All website files
- Examples for implementing:
  - Good example:
    ```yaml
    # .github/workflows/pages.yml (if needed)
    name: Deploy to GitHub Pages
    on:
      push:
        branches: [ main ]
    ```
  - Bad example:
    ```
    # No proper deployment configuration
    ``` 