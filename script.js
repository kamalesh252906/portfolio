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

// Presentation Deck Logic
const deckWrapper = document.querySelector(".deck-wrapper");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const currentNum = document.querySelector(".current-num");
const progressFill = document.querySelector(".progress-fill");

let currentSlide = 0;
const totalSlides = 7;

function updateDeck() {
    if (!deckWrapper) return;

    // Move deck
    deckWrapper.style.transform = `translateX(-${currentSlide * 100}vw)`;

    // Update numbers & progress
    if (currentNum) currentNum.textContent = `0${currentSlide + 1}`;
    if (progressFill) progressFill.style.width = `${((currentSlide + 1) / totalSlides) * 100}%`;

    // Button states
    if (prevBtn) prevBtn.disabled = currentSlide === 0;
    if (nextBtn) nextBtn.disabled = currentSlide === totalSlides - 1;

    // Trigger reveal animations for content in new slide
    const activeSlide = document.getElementById(`slide-${currentSlide + 1}`);
    if (activeSlide) {
        activeSlide.classList.add("active");
    }
}

if (nextBtn) {
    nextBtn.addEventListener("click", () => {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            updateDeck();
        }
    });
}

if (prevBtn) {
    prevBtn.addEventListener("click", () => {
        if (currentSlide > 0) {
            currentSlide--;
            updateDeck();
        }
    });
}

// Support Arrow Keys
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") nextBtn?.click();
    if (e.key === "ArrowLeft") prevBtn?.click();
});

// Initialize Deck
document.addEventListener("DOMContentLoaded", () => {
    updateDeck();
    // ... existing init code ...
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
