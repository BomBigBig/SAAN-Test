// Stats Counter Animation
const stats = document.querySelectorAll('.stat-number');
const statsSection = document.getElementById('stats');
let started = false;

const startCount = () => {
    stats.forEach(stat => {
        const target = +stat.getAttribute('data-target');
        const count = +stat.innerText;
        const speed = target / 100;

        if (count < target) {
            stat.innerText = Math.ceil(count + speed);
            setTimeout(startCount, 30);
        } else {
            stat.innerText = target + "+";
        }
    });
}

// Lazy Loading Handler
document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.classList.add('loaded');
        });
        // For cached images
        if (img.complete) img.classList.add('loaded');
    });
});

// Update scroll reveal to include stats trigger
window.addEventListener('scroll', () => {
    // ... existing reveal logic ...
    const sectionTop = statsSection.getBoundingClientRect().top;
    if (window.innerHeight > sectionTop && !started) {
        startCount();
        started = true;
    }
});

// Scroll Progress Bar
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById("progress-bar").style.width = scrolled + "%";
});

// Custom Cursor Logic
const cursor = document.getElementById('custom-cursor');
document.addEventListener('mousemove', e => {
    cursor.style.top = e.clientY + 'px';
    cursor.style.left = e.clientX + 'px';
});

document.querySelectorAll('a, button, .project-card, .client-logo').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
});

// Language Switcher Logic
const langBtns = document.querySelectorAll('.lang-btn');
const translatableElements = document.querySelectorAll('.lang');

const setLanguage = (lang) => {
    translatableElements.forEach(el => {
        const text = el.getAttribute(`data-${lang}`);
        if (text) {
            el.innerHTML = text;
        }
    });
    
    // Update button states
    langBtns.forEach(btn => {
        if (btn.id === `btn-${lang}`) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    localStorage.setItem('language', lang);
}

langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.id.replace('btn-', '');
        setLanguage(lang);
    });
});

// Check for saved language
const savedLang = localStorage.getItem('language') || 'en';
setLanguage(savedLang);

// Theme Switcher Logic
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }    
}

toggleSwitch.addEventListener('change', switchTheme, false);

// Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
});

const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });
}

navSlide();

// Smooth Scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Scroll Top Button Logic
const scrollTopBtn = document.getElementById("scrollTop");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
}

scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Scroll Reveal Animations
const reveal = () => {
    const reveals = document.querySelectorAll('.reveal');
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        }
    }
}

window.addEventListener('scroll', reveal);
reveal(); // Run on load

// Project Filtering Logic
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
            if (filter === 'all' || card.classList.contains(filter)) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

/* 
// Project Modal Logic (ปิดไว้เพื่อให้ลิงก์ไปยังหน้าใหม่ทำงานได้)
const modal = document.getElementById("projectModal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const closeModal = document.querySelector(".close-modal");

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
        const img = card.querySelector('img').src;
        const title = card.querySelector('h3').innerText;
        const desc = "รายละเอียดโครงการสถาปัตยกรรมชิ้นนี้เน้นการใช้สเปซและแสงธรรมชาติอย่างลงตัว (ข้อมูลตัวอย่าง)";
        
        modalImg.src = img;
        modalTitle.innerText = title;
        modalDesc.innerText = desc;
        modal.style.display = "block";
    });
});

closeModal.addEventListener('click', () => {
    modal.style.display = "none";
});

window.addEventListener('click', (e) => {
    if (e.target == modal) {
        modal.style.display = "none";
    }
});
*/

// Dynamic Copyright Year
const currentYear = new Date().getFullYear();
document.querySelector('footer p').innerHTML = `&copy; ${currentYear} SAAN ARCHITECT. All Rights Reserved.`;

// Form Submission & Validation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;

        if (name && email && message) {
            alert(`ขอบคุณคุณ ${name} ที่ติดต่อเรา! เราจะส่งข้อมูลไปยัง ${email} โดยเร็วที่สุด`);
            contactForm.reset();
        } else {
            alert('กรุณากรอกข้อมูลให้ครบถ้วน');
        }
    });
}

const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        alert(`ขอบคุณที่ติดตามข่าวสาร! เราจะส่งอัปเดตไปยัง ${email}`);
        newsletterForm.reset();
    });
}