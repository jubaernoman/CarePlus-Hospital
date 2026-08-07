// ==========================
// MOBILE MENU
// ==========================

const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.querySelector(".nav-menu");

if (menuToggle && navMenu) {
    const closeMenu = () => {
        navMenu.classList.remove("show");
        menuToggle.setAttribute("aria-expanded", "false");
    };

    menuToggle.addEventListener("click", () => {
        const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
        menuToggle.setAttribute("aria-expanded", String(!isExpanded));
        navMenu.classList.toggle("show");
    });

    navMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });
}

// ==========================
// SCROLL BUTTON
// ==========================

const scrollBtn = document.getElementById("scrollTopBtn");

if (scrollBtn) {
    window.addEventListener("scroll", () => {
        scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
    });

    scrollBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// ==========================
// FADE ANIMATION
// ==========================

const cards = document.querySelectorAll(
    ".feature-card,.doctor-card,.testimonial-card,.department-card"
);

if (cards.length > 0) {
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                }
            });
        });

        cards.forEach((card) => {
            card.style.opacity = "0";
            card.style.transform = "translateY(40px)";
            card.style.transition = ".8s";
            observer.observe(card);
        });
    } else {
        cards.forEach((card) => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        });
    }
}

// ==========================
// COUNTER ANIMATION
// ==========================

const statsSection = document.getElementById("statistics-section");
const statNumbers = document.querySelectorAll(".stat-number");

if (statsSection && statNumbers.length > 0) {
    if ("IntersectionObserver" in window) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    statNumbers.forEach((number) => {
                        const target = Number(number.getAttribute("data-target"));
                        const duration = 1400;
                        const startTime = performance.now();

                        const updateCounter = (currentTime) => {
                            const progress = Math.min((currentTime - startTime) / duration, 1);
                            const eased = 1 - Math.pow(1 - progress, 3);
                            const value = Math.floor(target * eased);

                            number.textContent = target >= 1000000
                                ? `${value.toLocaleString()}+`
                                : `${value}+`;

                            if (progress < 1) {
                                requestAnimationFrame(updateCounter);
                            } else {
                                number.textContent = target >= 1000000
                                    ? `${target.toLocaleString()}+`
                                    : `${target}+`;
                            }
                        };

                        requestAnimationFrame(updateCounter);
                    });

                    observer.disconnect();
                }
            });
        }, { threshold: 0.4 });

        counterObserver.observe(statsSection);
    } else {
        statNumbers.forEach((number) => {
            const target = Number(number.getAttribute("data-target"));
            number.textContent = target >= 1000000 ? `${target.toLocaleString()}+` : `${target}+`;
        });
    }
}

// ==========================
// FAQ ACCORDION
// ==========================

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
    const button = item.querySelector(".faq-question");

    if (!button) {
        return;
    }

    button.addEventListener("click", () => {
        const isActive = item.classList.contains("active");

        faqItems.forEach((faq) => {
            faq.classList.remove("active");
            faq.querySelector(".faq-question").setAttribute("aria-expanded", "false");
        });

        if (!isActive) {
            item.classList.add("active");
            button.setAttribute("aria-expanded", "true");
        }
    });
});

// ==========================
// GALLERY LIGHTBOX
// ==========================

const galleryCards = document.querySelectorAll(".gallery-card");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");
const lightboxClose = document.getElementById("lightbox-close");

if (galleryCards.length > 0 && lightbox && lightboxImage && lightboxCaption) {
    const openLightbox = (card) => {
        const img = card.querySelector("img");
        const heading = card.querySelector("h3");

        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;
        lightboxCaption.textContent = heading ? heading.textContent : "CarePlus Hospital";
        lightbox.classList.add("open");
        document.body.classList.add("no-scroll");
    };

    const closeLightbox = () => {
        lightbox.classList.remove("open");
        document.body.classList.remove("no-scroll");
    };

    galleryCards.forEach((card) => {
        card.addEventListener("click", () => openLightbox(card));
    });

    if (lightboxClose) {
        lightboxClose.addEventListener("click", closeLightbox);
    }

    lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeLightbox();
        }
    });
}

// ==========================
// CONTACT FORM VALIDATION
// ==========================

const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

if (contactForm && formMessage) {
    formMessage.setAttribute("role", "status");
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = contactForm.querySelector('input[name="name"]')?.value.trim() || "";
        const email = contactForm.querySelector('input[name="email"]')?.value.trim() || "";
        const message = contactForm.querySelector('textarea[name="message"]')?.value.trim() || "";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name || !email || !message) {
            formMessage.textContent = "Please complete all fields before sending your request.";
            formMessage.className = "form-message error";
            return;
        }

        if (!emailRegex.test(email)) {
            formMessage.textContent = "Please enter a valid email address.";
            formMessage.className = "form-message error";
            return;
        }

        formMessage.textContent = "Thank you! Your appointment request has been received.";
        formMessage.className = "form-message success";
        contactForm.reset();
    });
}