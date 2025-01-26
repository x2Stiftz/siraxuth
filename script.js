// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
    easing: 'ease-out-cubic'
});



document.querySelector('.secondary-btn').addEventListener('click', function(e) {
    e.preventDefault();
    const aboutSection = document.querySelector('#about');
    const navHeight = document.querySelector('nav').offsetHeight;
    
    window.scrollTo({
        top: aboutSection.offsetTop - navHeight,
        behavior: 'smooth'
    });
});
// Typed.js Effect
const initTypewriter = () => {
    const typed = new Typed('.typed-text', {
        strings: ['Sirsyuth Naensing', 'Student', 'Lukhamhan Warinchamrab', 'Robotics '],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true,
        cursorChar: '|',
        fadeOut: true
    });
};

function calculateAge() {
    const birthDate = new Date('2011-10-01'); // แปลง พ.ศ. เป็น ค.ศ.
    const now = new Date();
    const ageInMilliseconds = now - birthDate;
    const years = Math.floor(ageInMilliseconds / (365.25 * 24 * 60 * 60 * 1000));
    const months = Math.floor((ageInMilliseconds % (365.25 * 24 * 60 * 60 * 1000)) / (30.44 * 24 * 60 * 60 * 1000));
    const days = Math.floor((ageInMilliseconds % (30.44 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000));
    const hours = Math.floor((ageInMilliseconds % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((ageInMilliseconds % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((ageInMilliseconds % (60 * 1000)) / 1000);

    document.getElementById('age-display').innerHTML = `
        <p>เวลาที่มีชีวิต: 
        ${years} ปี 
        ${months} เดือน 
        ${days} วัน 
        ${hours} ชั่วโมง 
        ${minutes} นาที 
        ${seconds} วินาที</p>
    `;
}
// อัพเดททุก 1 วินาที
setInterval(calculateAge, 1000);

// Navbar Scroll Effect
const navbar = document.querySelector('nav');
const handleNavbarScroll = () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
};

// Mobile Menu
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-link');

const toggleMenu = () => {
    menuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.classList.toggle('menu-open');
};


// Smooth Scroll with Offset
const smoothScroll = (target, duration) => {
    const targetElement = document.querySelector(target);
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition - 80; // Offset for navbar
    let startTime = null;

    const animation = currentTime => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    // Easing Function
    const ease = (t, b, c, d) => {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    };

    requestAnimationFrame(animation);
};

// Skills Progress Animation
const animateSkills = () => {
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = level;
        }, 100);
    });
};

// Parallax Effect
const parallaxElements = document.querySelectorAll('[data-parallax]');
const handleParallax = () => {
    parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-parallax');
        const yPos = -(window.scrollY * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
};

// Form Handling with Validation
const contactForm = document.getElementById('contact-form');
const validateForm = (formData) => {
    const errors = {};
    const email = formData.get('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        errors.email = 'กรุณาใส่อีเมลที่ถูกต้อง';
    }

    return errors;
};

const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const errors = validateForm(formData);

    if (Object.keys(errors).length === 0) {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> กำลังส่ง...';

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Success message
            submitBtn.innerHTML = '<i class="fas fa-check"></i> ส่งสำเร็จ';
            contactForm.reset();
            
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<span>ส่งข้อความ</span><i class="fas fa-paper-plane"></i>';
            }, 2000);
            
        } catch (error) {
            submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> เกิดข้อผิดพลาด';
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<span>ส่งข้อความ</span><i class="fas fa-paper-plane"></i>';
            }, 2000);
        }
    }
};

// Intersection Observer for Sections
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            if (entry.target.id === 'skills') {
                animateSkills();
            }
        }
    });
}, observerOptions);

// Mouse Move Effect for Hero Section
const heroSection = document.querySelector('.hero');
const handleMouseMove = (e) => {
    const { offsetX, offsetY, target } = e;
    const { clientWidth, clientHeight } = target;

    const xPos = (offsetX / clientWidth - 0.5) * 20;
    const yPos = (offsetY / clientHeight - 0.5) * 20;

    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.style.transform = `translate(${xPos}px, ${yPos}px)`;
    }
};

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    initTypewriter();
    
    // Observe sections
    document.querySelectorAll('section').forEach(section => {
        sectionObserver.observe(section);
    });

    // Event listeners for navigation
    menuBtn.addEventListener('click', toggleMenu);
    navLinksItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.currentTarget.getAttribute('href');
            toggleMenu();
            smoothScroll(target, 100);
        });
    });

    // Form submission
    contactForm.addEventListener('submit', handleFormSubmit);

    // Parallax and scroll effects
    window.addEventListener('scroll', () => {
        handleNavbarScroll();
        handleParallax();
        requestAnimationFrame(() => {
            parallaxElements.forEach(element => {
                const speed = element.dataset.parallax;
                const yPos = -(window.scrollY * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    });

    // Mouse move effect
    heroSection.addEventListener('mousemove', handleMouseMove);
});

// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 1000);
    }
});

// Prevent scroll when mobile menu is open
document.addEventListener('touchmove', (e) => {
    if (document.body.classList.contains('menu-open')) {
        e.preventDefault();
    }
}, { passive: false });

// Handle window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (window.innerWidth > 768) {
            menuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    }, 250);
});