document.addEventListener("DOMContentLoaded", () => {
    // 1. GSAP Registration
    if (typeof gsap !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);

        // Rotating Razor Animation
        gsap.to(".razor-img", {
            rotation: 180, // Slower rotation
            y: 400,
            ease: "none",
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: 1
            }
        });

        // Parallax for Hero Background
        gsap.to(".hero-classic-bg", {
            yPercent: 20,
            ease: "none",
            scrollTrigger: {
                trigger: ".hero-classic",
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });
        
        // Logo fade/scale
        gsap.to(".hero-logo-giant", {
            scale: 0.8,
            opacity: 0,
            ease: "none",
            scrollTrigger: {
                trigger: ".hero-classic",
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });
    }

    // 2. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Intersection Observer for Scroll Reveals
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-up');
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 4. Magnetic Buttons (Física UI Premium)
    const magneticElements = document.querySelectorAll('.magnetic');
    
    // Add inner span to buttons if they don't have one and aren't images
    document.querySelectorAll('.btn').forEach(btn => {
        if (!btn.querySelector('span')) {
            const text = btn.innerHTML;
            btn.innerHTML = `<span>${text}</span>`;
        }
    });

    magneticElements.forEach(el => {
        el.addEventListener('mousemove', function(e) {
            const boundingRect = this.getBoundingClientRect();
            const relX = e.clientX - boundingRect.left;
            const relY = e.clientY - boundingRect.top;
            
            // Força magnética
            const strength = 15;
            
            const moveX = (relX - boundingRect.width / 2) / strength;
            const moveY = (relY - boundingRect.height / 2) / strength;
            
            gsap.to(this, {
                x: moveX,
                y: moveY,
                duration: 0.4,
                ease: "power2.out"
            });
            
            const span = this.querySelector('span');
            if(span) {
                gsap.to(span, {
                    x: moveX * 0.5,
                    y: moveY * 0.5,
                    duration: 0.4,
                    ease: "power2.out"
                });
            }
        });

        el.addEventListener('mouseleave', function() {
            gsap.to(this, {
                x: 0,
                y: 0,
                duration: 0.7,
                ease: "elastic.out(1, 0.3)"
            });
            
            const span = this.querySelector('span');
            if(span) {
                gsap.to(span, {
                    x: 0,
                    y: 0,
                    duration: 0.7,
                    ease: "elastic.out(1, 0.3)"
                });
            }
        });
    });
});
