// ========== LOADING PAGE ANIMATION ==========
window.addEventListener('load', () => {
    const loaderWrapper = document.querySelector('.loader-wrapper');
    if (loaderWrapper) {
        setTimeout(() => {
            loaderWrapper.classList.add('hidden');
        }, 800);
    }
});

// ========== MOUSE POINTER ANIMATION ==========
const cursorDot = document.querySelector('.cursor-dot');

let mouseX = 0, mouseY = 0;
let dotX = 0, dotY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (cursorDot) {
        cursorDot.style.left = mouseX - 4 + 'px';
        cursorDot.style.top = mouseY - 4 + 'px';
    }

    // Create trail effect randomly
    if (Math.random() > 0.8) {
        createTrail(mouseX, mouseY);
    }
});

function createTrail(x, y) {
    const trail = document.createElement('div');
    trail.className = 'cursor-dot-trail';
    trail.style.left = x - 2 + 'px';
    trail.style.top = y - 2 + 'px';
    document.body.appendChild(trail);

    setTimeout(() => trail.remove(), 800);
}

document.addEventListener('mouseenter', () => {
    if (cursorDot) cursorDot.style.display = 'block';
});

document.addEventListener('mouseleave', () => {
    if (cursorDot) cursorDot.style.display = 'none';
});

// Detect hover on interactive elements
document.addEventListener('mouseover', (e) => {
    if (cursorDot && (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('.btn'))) {
        cursorDot.classList.add('active');
    }
});

document.addEventListener('mouseout', (e) => {
    if (cursorDot && (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('.btn'))) {
        cursorDot.classList.remove('active');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.replace('fa-bars', 'fa-times');
        } else {
            icon.classList.replace('fa-times', 'fa-bars');
        }
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
        });
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = target.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Reveal on Scroll
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // If it's a staggered container, handle children
                if (entry.target.classList.contains('stagger-container')) {
                    const children = entry.target.querySelectorAll('.reveal');
                    children.forEach((child, index) => {
                        child.style.setProperty('--delay', index + 1);
                        child.classList.add('active');
                    });
                }
            }
        });
    }, observerOptions);

    // Observe all elements with reveal or reveal-img-container classes
    const revealElements = document.querySelectorAll('.reveal, .reveal-img-container, .section-title, .stagger-container');
    revealElements.forEach(el => observer.observe(el));

    // Simple Lightbox
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').src;
            const lightbox = document.createElement('div');
            lightbox.id = 'lightbox';
            lightbox.style.position = 'fixed';
            lightbox.style.top = '0';
            lightbox.style.left = '0';
            lightbox.style.width = '100%';
            lightbox.style.height = '100%';
            lightbox.style.backgroundColor = 'rgba(0,0,0,0.9)';
            lightbox.style.display = 'flex';
            lightbox.style.alignItems = 'center';
            lightbox.style.justifyContent = 'center';
            lightbox.style.zIndex = '2000';
            lightbox.style.cursor = 'zoom-out';
            
            const img = document.createElement('img');
            img.src = imgSrc;
            img.style.maxWidth = '90%';
            img.style.maxHeight = '90%';
            img.style.borderRadius = '5px';
            img.style.boxShadow = '0 0 30px rgba(0,0,0,0.5)';
            
            lightbox.appendChild(img);
            document.body.appendChild(lightbox);
            
            lightbox.addEventListener('click', () => {
                lightbox.remove();
            });
        });
    });
});
