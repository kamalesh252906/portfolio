// Custom Cursor Glow
const cursorGlow = document.querySelector(".cursor-glow");
document.addEventListener("mousemove", (e) => {
    cursorGlow.style.left = e.clientX + "px";
    cursorGlow.style.top = e.clientY + "px";
});

// Typing Effect
const typingText = document.getElementById("typing");
const phrases = ["Backend Developer", "Problem Solver", "Quick Learner"];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentPhrase = phrases[phraseIndex];
    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2500; // Longer pause at the end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 400;
    }

    setTimeout(type, typeSpeed);
}

// Header & Navigation
const header = document.getElementById("header");
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

function handleScroll() {
    // Header background change
    if (window.scrollY > 100) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

    // Scroll Spy - Navigation Highlight
    let current = "";
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 300) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((a) => {
        a.classList.remove("active-nav");
        if (a.getAttribute("href").includes(current)) {
            a.classList.add("active-nav");
            // Let CSS handle the color via active-nav class
        } else {
            // Let CSS handle default color
        }
    });
}

// Reveal Animation on Scroll
const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
            // Optional: unobserve after reveal
            // observer.unobserve(entry.target);
        }
    });
}, revealOptions);

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    // Start typing
    type();

    // Setup observers for reveal elements
    const reveals = document.querySelectorAll(".reveal");
    reveals.forEach(el => observer.observe(el));

    // Initial scroll check
    handleScroll();
});

window.addEventListener("scroll", handleScroll);

// Mobile Menu Toggle
const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector("nav");

if (menuBtn) {
    menuBtn.addEventListener("click", () => {
        nav.classList.toggle("active");
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll("nav a");
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("active");
        });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
        if (!nav.contains(e.target) && !menuBtn.contains(e.target)) {
            nav.classList.remove("active");
        }
    });
}

// Cinematic Timeline Logic
const slides = document.querySelectorAll(".slide");
const navNodes = document.querySelectorAll(".node-item");
const progressBar = document.querySelector(".timeline-progress-bar");
const prevSlideBtn = document.querySelector(".slide-btn.prev");
const nextSlideBtn = document.querySelector(".slide-btn.next");
const brandText = document.querySelector(".nav-brand span");
let activeSlideIndex = 0;

function showSlide(index) {
    if (!slides.length) return;
    if (index < 0 || index >= slides.length) return;

    // Reset all
    slides.forEach(s => s.classList.remove("active"));
    navNodes.forEach(n => n.classList.remove("active"));

    // Set active
    slides[index].classList.add("active");
    if (navNodes[index]) navNodes[index].classList.add("active");
    activeSlideIndex = index;

    // Update Progress
    if (progressBar) {
        const progress = (index / (slides.length - 1)) * 100;
        progressBar.style.width = `${progress}%`;
    }

    // Update Brand Text
    const categories = ["IDENTITY", "FOUNDATION", "ACADEMICS", "STRENGTH", "EVOLUTION"];
    if (brandText) brandText.textContent = categories[index];
}

if (nextSlideBtn) {
    nextSlideBtn.addEventListener("click", () => {
        const next = (activeSlideIndex + 1) % slides.length;
        showSlide(next);
    });
}

if (prevSlideBtn) {
    prevSlideBtn.addEventListener("click", () => {
        const prev = (activeSlideIndex - 1 + slides.length) % slides.length;
        showSlide(prev);
    });
}

navNodes.forEach((node, i) => {
    node.addEventListener("click", () => showSlide(i));
});

// Init
document.addEventListener("DOMContentLoaded", () => {
    if (slides.length > 0) {
        showSlide(0);
    }
});

// Keyboard
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") nextSlideBtn?.click();
    if (e.key === "ArrowLeft") prevSlideBtn?.click();
});

/* Intro Overlay Interaction */
const introOverlay = document.getElementById("intro-overlay");
const exploreBtn = document.getElementById("explore-btn");

if (introOverlay && exploreBtn) {
    // Lock scroll initially
    document.body.style.overflow = "hidden";

    exploreBtn.addEventListener("click", () => {
        // Fade out overlay
        introOverlay.classList.add("fade-out");

        // Unlock scroll after transition & remove from layout flow
        setTimeout(() => {
            document.body.style.overflow = "auto";
            introOverlay.style.display = "none";
        }, 800); // 800ms matches css transition
    });
}
