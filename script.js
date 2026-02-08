// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

document
  .querySelectorAll(".timeline-item, .project-card, .skill-item")
  .forEach((el) => {
    observer.observe(el);
  });

// Mobile Menu
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger) {
  hamburger.addEventListener("click", () => {
    const isFlex = navLinks.style.display === "flex";
    navLinks.style.display = isFlex ? "none" : "flex";
    
    if (!isFlex) {
      navLinks.style.flexDirection = "column";
      navLinks.style.position = "absolute";
      navLinks.style.top = "70px";
      navLinks.style.left = "0";
      navLinks.style.width = "100%";
      navLinks.style.background = "var(--card-bg)"; // Use variable
      navLinks.style.padding = "20px";
      navLinks.style.boxShadow = "var(--card-shadow)";
      navLinks.style.backdropFilter = "blur(10px)";
    }
  });
}

// Theme Toggle
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle ? themeToggle.querySelector("i") : null;

// Check for saved theme or system preference
const savedTheme = localStorage.getItem("theme");
const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
    document.documentElement.setAttribute("data-theme", "dark");
    if (themeIcon) {
        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");
    }
}

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        
        // Toggle Icon
        if (themeIcon) {
            themeIcon.classList.toggle("fa-moon");
            themeIcon.classList.toggle("fa-sun");
        }
    });
}

// Particle Background Animation

