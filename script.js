document.addEventListener('DOMContentLoaded', () => {
    // --- Wordmark entrance ---
    const wordmark = document.querySelector('.wordmark');
    if (wordmark) {
        // slight delay so fonts settle
        requestAnimationFrame(() => {
            setTimeout(() => wordmark.classList.add('is-ready'), 80);
        });
    }

    // --- Sticky header on scroll ---
    const header = document.getElementById('header');
    const onScroll = () => {
        if (window.scrollY > 40) {
            header.classList.add('is-scrolled');
        } else {
            header.classList.remove('is-scrolled');
        }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // --- Active nav link ---
    const navLinks = document.querySelectorAll('.nav a[data-section]');
    const sections = document.querySelectorAll('main > section[id], #contacts');

    const setActiveNav = () => {
        let current = '';
        const scrollPos = window.scrollY + 120;

        sections.forEach(sec => {
            if (sec.offsetTop <= scrollPos) {
                current = sec.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle('is-active', link.dataset.section === current);
        });
    };

    window.addEventListener('scroll', setActiveNav, { passive: true });
    setActiveNav();

    // --- Fade-in sections ---
    const fadeTargets = document.querySelectorAll('main > section, .footer');

    if (!('IntersectionObserver' in window)) {
        fadeTargets.forEach(el => el.classList.add('visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
    });

    fadeTargets.forEach(el => {
        el.classList.add('fade-in-section');
        observer.observe(el);
    });
});
