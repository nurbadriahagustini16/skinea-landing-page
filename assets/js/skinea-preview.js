// assets/js/skinea-preview.js

document.addEventListener("DOMContentLoaded", function () {
    // 1. Cek Ketersediaan GSAP & ScrollTrigger
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
        console.warn("GSAP atau ScrollTrigger belum dimuat. Menampilkan halaman secara standar.");
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Cek Prefers Reduced Motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let mm = gsap.matchMedia();

    // ====================================================
    // 1. NAVBAR ANIMATION & SCROLL EFEK
    // ====================================================
    function initNavbar() {
        const navTL = gsap.timeline();

        // Intro Sequence
        navTL.from(".sk-brand-title", {
            opacity: 0,
            y: -20,
            letterSpacing: "10px",
            duration: 1.2,
            ease: "power3.out"
        })
        .from(".sk-nav-link", {
            opacity: 0,
            y: -12,
            rotation: -3,
            stagger: 0.08,
            duration: 0.7,
            ease: "power2.out"
        }, "-=0.8")
        .from(".navbar .btn-sk-primary", {
            opacity: 0,
            scale: 0.8,
            duration: 0.6,
            ease: "back.out(1.7)"
        }, "-=0.4");

        // Sticky Navbar Effect on Scroll
        const navbar = document.querySelector(".navbar");
        if (navbar) {
            window.addEventListener("scroll", function () {
                if (window.scrollY > 40) {
                    navbar.classList.add("sk-navbar-scrolled");
                } else {
                    navbar.classList.remove("sk-navbar-scrolled");
                }
            });
        }
    }

    // ====================================================
    // 2. HERO SECTION (TIMELINE + SCROLL PARALLAX)
    // ====================================================
    function initHeroSection() {
        // DESKTOP & TABLET
        mm.add("(min-width: 768px)", () => {
            const heroTL = gsap.timeline({ delay: 0.2 });

            // Product Reveal Settle Effect
            heroTL.from("#home img", {
                scale: 1.2,
                rotation: 6,
                y: 40,
                opacity: 0,
                duration: 1.4,
                ease: "power3.out"
            })
            // Heading Reveal
            .from(".sk-hero-title", {
                opacity: 0,
                y: 35,
                duration: 1,
                ease: "power3.out"
            }, "-=1.0")
            // Paragraph
            .from("#home p.text-muted", {
                opacity: 0,
                y: 20,
                duration: 0.8,
                ease: "power2.out"
            }, "-=0.7")
            // Feature Circles Overshoot Stagger
            .from("#home .col-4", {
                opacity: 0,
                scale: 0.5,
                y: 20,
                rotation: -8,
                stagger: 0.12,
                duration: 0.8,
                ease: "back.out(1.7)"
            }, "-=0.5")
            // CTA Button + Micro Arrow Motion
            .from("#home .btn-sk-primary", {
                opacity: 0,
                y: 15,
                duration: 0.6,
                ease: "power2.out"
            }, "-=0.3")
            .to("#home .btn-sk-primary i", {
                x: 5,
                repeat: -1,
                yoyo: true,
                duration: 0.8,
                ease: "power1.inOut"
            });

            // Hero Scroll Parallax Layering
            gsap.to("#home img", {
                y: 70,
                rotation: -3,
                scrollTrigger: {
                    trigger: "#home",
                    start: "top top",
                    end: "bottom top",
                    scrub: 1
                }
            });

            gsap.to(".sk-hero-title", {
                y: -35,
                scrollTrigger: {
                    trigger: "#home",
                    start: "top top",
                    end: "bottom top",
                    scrub: 0.5
                }
            });
        });

        // MOBILE HERO
        mm.add("(max-width: 767.98px)", () => {
            const heroTLMobile = gsap.timeline({ delay: 0.2 });

            heroTLMobile.from(".sk-hero-title", { opacity: 0, y: 20, duration: 0.8 })
                .from("#home p.text-muted", { opacity: 0, y: 15, duration: 0.6 }, "-=0.4")
                .from("#home img", { opacity: 0, scale: 0.9, duration: 1, ease: "power2.out" }, "-=0.3")
                .from("#home .col-4", { opacity: 0, y: 15, stagger: 0.1, duration: 0.6 }, "-=0.5")
                .from("#home .btn-sk-primary", { opacity: 0, duration: 0.5 }, "-=0.3");
        });
    }

    // ====================================================
    // 3. PROBLEM SECTION (CARD BREAK-APART & STAMP X ICON)
    // ====================================================
    function initProblemSection() {
        mm.add("(min-width: 768px)", () => {
            const problemTL = gsap.timeline({
                scrollTrigger: {
                    trigger: "#about",
                    start: "top 75%",
                    toggleActions: "play none none none"
                }
            });

            // Card Container Expansion
            problemTL.from(".sk-problem-card", {
                scale: 0.93,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out"
            })
            // Image dari Kiri + Rotation
            .from("#about img", {
                x: -60,
                rotation: -4,
                opacity: 0,
                duration: 0.9,
                ease: "power3.out"
            }, "-=0.5")
            // Text dari Kanan + Rotation
            .from("#about .col-lg-7 h2, #about .col-lg-7 span.text-uppercase", {
                x: 50,
                rotation: 2,
                opacity: 0,
                stagger: 0.12,
                duration: 0.8,
                ease: "power3.out"
            }, "-=0.7")
            // Stamp Effect Icon X (BAM -> Overshoot Settle)
            .from("#about .sk-cross-icon", {
                scale: 2.2,
                rotation: -25,
                opacity: 0,
                stagger: 0.12,
                duration: 0.5,
                ease: "back.out(2.2)"
            }, "-=0.3")
            // Text Problem Mengikuti Icon
            .from("#about ul li span.text-muted", {
                x: 20,
                opacity: 0,
                stagger: 0.12,
                duration: 0.5,
                ease: "power2.out"
            }, "-=0.5");
        });

        // Mobile Version
        mm.add("(max-width: 767.98px)", () => {
            gsap.from(".sk-problem-card", {
                opacity: 0,
                y: 30,
                duration: 0.8,
                scrollTrigger: { trigger: "#about", start: "top 85%" }
            });
            gsap.from("#about .sk-cross-icon", {
                scale: 1.5,
                opacity: 0,
                stagger: 0.1,
                duration: 0.4,
                ease: "back.out(1.5)",
                scrollTrigger: { trigger: "#about ul", start: "top 85%" }
            });
        });
    }

    // ====================================================
    // 4. INGREDIENT SECTION (ROTATIONAL / SCROLL ORBIT)
    // ====================================================
    function initIngredientsSection() {
        mm.add("(min-width: 768px)", () => {
            gsap.from(".sk-solution-banner", {
                opacity: 0,
                y: 40,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: { trigger: "#ingredients", start: "top 75%" }
            });

            // Ingredient Item Stagger Reveal
            gsap.from("#ingredients .col-lg-4:last-child .d-flex", {
                x: 40,
                opacity: 0,
                stagger: 0.18,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: { trigger: "#ingredients", start: "top 70%" }
            });

            // Rotational Orbit Motion pada Gambar Produk Tengah dikontrol Scroll
            gsap.to("#ingredients img", {
                rotation: 12,
                scale: 1.08,
                y: -20,
                scrollTrigger: {
                    trigger: "#ingredients",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                }
            });
        });

        mm.add("(max-width: 767.98px)", () => {
            gsap.from(".sk-solution-banner", {
                opacity: 0,
                y: 25,
                duration: 0.8,
                scrollTrigger: { trigger: "#ingredients", start: "top 85%" }
            });
        });
    }

    // ====================================================
    // 5. BENEFIT GRID (GRID CONVERGENCE + HOVER)
    // ====================================================
    function initBenefitGrid() {
        mm.add("(min-width: 768px)", () => {
            const cards = gsap.utils.toArray("#product .sk-benefit-card");
            
            // Posisi Asal dari 4 Arah Berbeda
            const initialPositions = [
                { x: -50, y: -30, rotation: -6 }, // Card 1: Kiri Atas
                { x: 0, y: -50, rotation: 4 },    // Card 2: Atas
                { x: 0, y: 50, rotation: -4 },    // Card 3: Bawah
                { x: 50, y: 30, rotation: 6 }     // Card 4: Kanan Bawah
            ];

            cards.forEach((card, i) => {
                gsap.from(card, {
                    x: initialPositions[i].x,
                    y: initialPositions[i].y,
                    rotation: initialPositions[i].rotation,
                    opacity: 0,
                    scale: 0.88,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: "#product",
                        start: "top 75%",
                        toggleActions: "play none none none"
                    },
                    delay: i * 0.12
                });

                // GSAP Micro Hover Interaction
                card.addEventListener("mouseenter", () => {
                    gsap.to(card, { y: -8, scale: 1.03, duration: 0.3, ease: "power2.out" });
                    gsap.to(card.querySelector("i"), { rotation: 15, scale: 1.1, duration: 0.3, ease: "power2.out" });
                });

                card.addEventListener("mouseleave", () => {
                    gsap.to(card, { y: 0, scale: 1, duration: 0.3, ease: "power2.out" });
                    gsap.to(card.querySelector("i"), { rotation: 0, scale: 1, duration: 0.3, ease: "power2.out" });
                });
            });
        });

        mm.add("(max-width: 767.98px)", () => {
            gsap.from("#product .sk-benefit-card", {
                opacity: 0,
                y: 20,
                stagger: 0.1,
                duration: 0.6,
                scrollTrigger: { trigger: "#product", start: "top 85%" }
            });
        });
    }

    // ====================================================
    // 6. TESTIMONIAL & CTA BANNER
    // ====================================================
    function initTestimonialCTA() {
        mm.add("(min-width: 768px)", () => {
            const ctaTL = gsap.timeline({
                scrollTrigger: { trigger: "#shop", start: "top 75%" }
            });

            // Testimonial Reveal
            ctaTL.from("#shop .col-lg-5 > div", {
                rotation: -3,
                scale: 0.92,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out"
            })
            // Green Banner Reveal
            .from(".sk-cta-banner", {
                x: 50,
                opacity: 0,
                duration: 0.9,
                ease: "power3.out"
            }, "-=0.5")
            // Model Image Reveal dengan Rotation Settle
            .from(".sk-cta-banner img", {
                scale: 1.18,
                rotation: 6,
                opacity: 0,
                duration: 0.9,
                ease: "back.out(1.4)"
            }, "-=0.4")
            // CTA Button
            .from(".sk-cta-banner .btn-sk-light", {
                y: 15,
                opacity: 0,
                duration: 0.5
            }, "-=0.3");
        });

        mm.add("(max-width: 767.98px)", () => {
            gsap.from("#shop .col-lg-5, .sk-cta-banner", {
                opacity: 0,
                y: 25,
                stagger: 0.2,
                duration: 0.8,
                scrollTrigger: { trigger: "#shop", start: "top 85%" }
            });
        });
    }

    // ====================================================
    // 7. FOOTER ANIMATION
    // ====================================================
    function initFooter() {
        gsap.from("#faq .container > div", {
            opacity: 0,
            y: 20,
            stagger: 0.15,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: { trigger: "#faq", start: "top 92%" }
        });
    }

    // Eksekusi Seluruh Modul Animasi
    initNavbar();
    initHeroSection();
    initProblemSection();
    initIngredientsSection();
    initBenefitGrid();
    initTestimonialCTA();
    initFooter();

    // Hitung ulang layout ScrollTrigger
    ScrollTrigger.refresh();
});