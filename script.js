const typingText = document.getElementById("typing");
const phrases = ["Full Stack Developer", "Quick Learner", "Problem Solver"];
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

// Mobile Menu Toggle (Simplified placeholder)
const menuBtn = document.querySelector(".menu-btn");
if (menuBtn) {
    menuBtn.addEventListener("click", () => {
        // Toggle mobile menu logic here
        alert("Mobile menu coming soon!");
    });
}
