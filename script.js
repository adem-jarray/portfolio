/* =========================================
   ADEM JARRAY — PORTFOLIO SCRIPTS
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

    // ===== SMOOTH SCROLLING (LENIS) =====
    // https://github.com/darkroomengineering/lenis
    // respectReducedMotion is enabled by default: users with
    // prefers-reduced-motion get native instant scrolling.
    let lenis = null;
    if (window.Lenis) {
        lenis = new Lenis({
            autoRaf: true,
        });
    }

    // ===== HERO CURSOR SPOTLIGHT =====
    const hero = document.getElementById('hero');
    const spotlight = document.getElementById('heroSpotlight');
    if (hero && spotlight && !prefersReducedMotion) {
        let spotRaf = 0;
        let spotX = 0;
        let spotY = 0;

        hero.addEventListener('pointermove', (e) => {
            const rect = hero.getBoundingClientRect();
            spotX = e.clientX - rect.left;
            spotY = e.clientY - rect.top;
            if (!spotRaf) {
                spotRaf = requestAnimationFrame(() => {
                    spotRaf = 0;
                    spotlight.style.setProperty('--spot-x', spotX + 'px');
                    spotlight.style.setProperty('--spot-y', spotY + 'px');
                });
            }
        });
        hero.addEventListener('pointerenter', () => spotlight.classList.add('active'));
        hero.addEventListener('pointerleave', () => spotlight.classList.remove('active'));
    }

    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    window.addEventListener('scroll', () => {
        // Add scrolled class
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link highlight
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // ===== MOBILE NAV TOGGLE =====
    const navToggle = document.getElementById('navToggle');
    const navLinksContainer = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        const isOpen = navToggle.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
        navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile nav on link click
    navLinksContainer.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinksContainer.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // ===== TYPEWRITER EFFECT =====
    const typewriterEl = document.getElementById('typewriter');
    const roles = [
        'Full-Stack Web Developer',
        'Mobile App Developer',
        'Computer Science Student',
        'UI/UX Enthusiast'
    ];
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    // Create cursor element
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    typewriterEl.appendChild(cursor);

    function type() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typewriterEl.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40;
        } else {
            typewriterEl.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 80;
        }

        typewriterEl.appendChild(cursor);

        if (!isDeleting && charIndex === currentRole.length) {
            typingSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 400; // Pause before next word
        }

        setTimeout(type, typingSpeed);
    }

    if (prefersReducedMotion) {
        typewriterEl.textContent = roles[0];
    } else {
        type();
    }

    // ===== COUNTER ANIMATION =====
    const statNumbers = document.querySelectorAll('.stat-number');
    let counterAnimated = false;

    function setFinalCounts() {
        statNumbers.forEach(el => {
            el.textContent = el.getAttribute('data-count');
        });
    }

    function animateCounters() {
        if (counterAnimated) return;
        if (prefersReducedMotion) {
            counterAnimated = true;
            setFinalCounts();
            return;
        }

        const heroSection = document.getElementById('hero');
        const rect = heroSection.getBoundingClientRect();

        if (rect.top < window.innerHeight && rect.bottom > 0) {
            counterAnimated = true;
            statNumbers.forEach(el => {
                const target = parseInt(el.getAttribute('data-count'));
                let count = 0;
                const duration = 1500;
                const step = target / (duration / 30);

                const counter = setInterval(() => {
                    count += step;
                    if (count >= target) {
                        el.textContent = target;
                        clearInterval(counter);
                    } else {
                        el.textContent = Math.floor(count);
                    }
                }, 30);
            });
        }
    }

    window.addEventListener('scroll', animateCounters);
    animateCounters(); // Check on load

    // ===== SCROLL REVEAL ANIMATION =====
    const revealElements = document.querySelectorAll(
        '.skills-grid, .section-head, .project-card, .info-item, .contact-item, .about-content, .about-card, .contact-form, .contact-info, .footer-cta'
    );

    revealElements.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ===== CUSTOM CURSOR =====
    const cursorDot = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (cursorDot && cursorRing && finePointer && !prefersReducedMotion) {
        let cursorSeen = false;

        document.addEventListener('pointermove', (e) => {
            if (!cursorSeen) {
                cursorSeen = true;
                document.body.classList.add('cursor-active');
            }
            cursorDot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
            cursorRing.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
            const interactive = e.target.closest('a, button, input, textarea, .skill-tag, .tech-tag');
            cursorRing.classList.toggle('cursor-hover', !!interactive);
        });

        document.documentElement.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-active');
            cursorSeen = false;
        });
    }

    // ===== MAGNETIC BUTTONS =====
    if (finePointer && !prefersReducedMotion) {
        document.querySelectorAll('.btn, .nav-cta').forEach((btn) => {
            btn.addEventListener('pointermove', (e) => {
                const rect = btn.getBoundingClientRect();
                const dx = e.clientX - (rect.left + rect.width / 2);
                const dy = e.clientY - (rect.top + rect.height / 2);
                btn.style.transform = `translate3d(${dx * 0.22}px, ${dy * 0.22}px, 0)`;
            });
            btn.addEventListener('pointerleave', () => {
                btn.style.transform = '';
            });
        });
    }

    // ===== BENTO CARD SPOTLIGHT =====
    document.querySelectorAll('.skill-category').forEach((card) => {
        card.addEventListener('pointermove', (e) => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--card-x', (e.clientX - rect.left) + 'px');
            card.style.setProperty('--card-y', (e.clientY - rect.top) + 'px');
        });
    });

    // ===== PROJECT BANNER PARALLAX =====
    const parallaxImages = document.querySelectorAll('.project-banner-img img');

    function updateParallax() {
        if (prefersReducedMotion || !parallaxImages.length) return;
        const vh = window.innerHeight;
        parallaxImages.forEach((img) => {
            const rect = img.parentElement.getBoundingClientRect();
            if (rect.bottom < 0 || rect.top > vh) return;
            const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
            const clamped = Math.max(-1, Math.min(1, progress));
            img.style.transform = `translate3d(0, ${clamped * -34}px, 0) scale(1.12)`;
        });
    }

    window.addEventListener('scroll', updateParallax, { passive: true });
    updateParallax();

    // ===== CONTACT FORM =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Open mailto as fallback
            const mailtoLink = `mailto:ademjr981@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
            window.location.href = mailtoLink;

            // Show success feedback
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalHTML = btn.innerHTML;
            btn.innerHTML = '<span>Message Sent!</span> <i class="fas fa-check"></i>';
            btn.style.background = '#22c55e';
            btn.style.color = '#052e16';

            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.style.background = '';
                btn.style.color = '';
                contactForm.reset();
            }, 3000);
        });
    }

    // ===== SMOOTH SCROLL FOR ALL ANCHOR LINKS =====
    // Lenis reads the html element's scroll-padding-top, so sections
    // land below the fixed navbar. Falls back to native scrolling
    // if the Lenis script failed to load.
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const hash = this.getAttribute('href');
            if (!hash || hash.length < 2) return;
            const target = document.querySelector(hash);
            if (!target) return;

            e.preventDefault();

            if (lenis) {
                lenis.scrollTo(target);
                // Watchdog: a few embedded webviews never fire
                // requestAnimationFrame, so Lenis's animation loop
                // can't run. If nothing moved shortly after the call,
                // finish the scroll immediately instead.
                const startY = window.scrollY;
                setTimeout(() => {
                    if (Math.abs(window.scrollY - startY) < 1) {
                        lenis.scrollTo(target, { immediate: true });
                    }
                }, 120);
            } else if (prefersReducedMotion) {
                target.scrollIntoView();
            } else {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }

            history.replaceState(null, '', hash);
        });
    });

});
