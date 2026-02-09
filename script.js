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

// Gosper Curve Animation
// Gosper Curve Animation with p5.js
const gosperSketch = (p) => {
    let axiom = "A";
    let sentence = axiom;
    let len = 10;
    let rules = {
        "A": "A-B--B+A++AA+B-",
        "B": "+A-BB--B-A++A+B"
    };

    let currentStep = 0;
    const stepsPerFrame = 5; // Adjust speed here

    p.setup = () => {
        // Force full window size for debugging
        let w = window.innerWidth;
        let h = window.innerHeight;
        
        let cnv = p.createCanvas(w, h);
        cnv.parent("gosper-container");
        
        cnv.style('position', 'absolute');
        cnv.style('top', '0');
        cnv.style('left', '0');
        cnv.style('width', '100%');
        cnv.style('height', '100%');
        cnv.style('z-index', '-1');

        p.angleMode(p.DEGREES);
        // Remove noLoop to allow animation
        // p.noLoop(); 

        // Generate L-System string
        const generations = 4;
        for(let i = 0; i < generations; i++) {
            generate();
        }
    };

    p.draw = () => {
        p.clear();
        
        // Define colors
        const colors = [
            p.color(59, 130, 246, 100),  // Blue
            p.color(239, 68, 68, 100),   // Red
            p.color(37, 99, 235, 100),   // Darker Blue
            p.color(220, 38, 38, 100)    // Darker Red
        ];

        if (document.documentElement.getAttribute("data-theme") === "dark") {
             colors[0] = p.color(96, 165, 250, 150);
             colors[1] = p.color(248, 113, 113, 150);
             colors[2] = p.color(59, 130, 246, 150);
             colors[3] = p.color(239, 68, 68, 150);
        }

        p.strokeWeight(2.0);
        p.noFill();

        const generations = 4;
        const growthFactor = Math.sqrt(5); // User adjusted
        
        const sizeTarget = Math.min(p.width, p.height) * 0.45;
        len = sizeTarget / Math.pow(growthFactor, generations);
        
        const cx = p.width / 2;
        const cy = p.height / 2;

        const arms = [
            { rot: 0, col: 0 },
            { rot: 180, col: 1 },
            { rot: 0, col: 2 },
            { rot: 180, col: 3 }
        ];

        // Increment step animation
        if (currentStep < sentence.length) {
            currentStep += stepsPerFrame;
            if (currentStep > sentence.length) currentStep = sentence.length;
        }

        arms.forEach(arm => {
            p.push();
            p.translate(cx, cy);
            p.rotate(arm.rot);
            p.stroke(colors[arm.col]);

            let drawnCount = 0;
            // Draw only up to currentStep
            // Create loop that processes the string but only draws until index hits currentStep
            // Note: sentence includes + and - which don't draw, but advance index.
            // A visual animation based on 'segments drawn' is tricky because + and - are instant.
            // We just iterate to currentStep index of the string.
            
            for (let i = 0; i < currentStep; i++) {
                let current = sentence.charAt(i);
                if (current == "A" || current == "B") {
                    p.line(0, 0, len, 0);
                    p.translate(len, 0);
                } else if (current == "+") {
                    p.rotate(-60);
                } else if (current == "-") {
                    p.rotate(60);
                }
            }
            p.pop();
        });
    };

    function generate() {
        let nextSentence = "";
        for (let i = 0; i < sentence.length; i++) {
            let current = sentence.charAt(i);
            let replacement = rules[current];
            if (replacement) {
                nextSentence += replacement;
            } else {
                nextSentence += current;
            }
        }
        sentence = nextSentence;
    }

    p.windowResized = () => {
        p.resizeCanvas(window.innerWidth, window.innerHeight);
        p.redraw();
    };
};

// Initialize p5 instance when DOM is ready
if (document.readyState === "complete" || document.readyState === "interactive") {
    new p5(gosperSketch);
} else {
    document.addEventListener("DOMContentLoaded", () => {
        new p5(gosperSketch);
    });
}
