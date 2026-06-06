
/* ================= MENU TOGGLE ================= */
function toggleMenu() {
    const nav = document.getElementById("navLinks");
    if (!nav) return;
    nav.classList.toggle("active");
}

/* ================= THEME TOGGLE ================= */
function toggleTheme() {
    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
        localStorage.setItem("theme", "light");
    } else {
        localStorage.setItem("theme", "dark");
    }
}

/* ================= LOAD SAVED THEME ================= */
window.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
    }
});

/* ================= SCROLL HANDLER (OPTIMIZED) ================= */
window.addEventListener("scroll", () => {

    /* ===== SCROLL SPY ===== */
    const sections = document.querySelectorAll("section");
    const navLinksSpy = document.querySelectorAll(".nav-link");

    let current = "";

    sections.forEach(section => {
        const offset = section.offsetTop - 150;
        const height = section.offsetHeight;

        if (window.scrollY >= offset && window.scrollY < offset + height) {
            current = section.getAttribute("id");
        }
    });

    navLinksSpy.forEach(link => {
        link.classList.remove("active");

        if (current && link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });

    /* ===== PROGRESS BAR ===== */
    const bar = document.getElementById("progressBar");

    if (bar) {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (scrollTop / scrollHeight) * 100;

        bar.style.width = scrolled + "%";
    }

    /* ===== NAVBAR SCROLL EFFECT ===== */
    const navbar = document.getElementById("navbar");

    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }

    /* ===== HERO SCROLL ANIMATION ===== */
    const hero = document.querySelector(".hero");

    if (hero) {
        const rect = hero.getBoundingClientRect();
        const progress = Math.min(Math.max(-rect.top / window.innerHeight, 0), 1);

        const title = document.querySelector(".hero-title");
        const subtitle = document.querySelector(".hero-subtitle");
        const text = document.querySelector(".hero-text");
        const btn = document.querySelector(".hero-btn");

        if (title) {
            title.style.transform = `translateY(${progress * -80}px) scale(${1 - progress * 0.15})`;
            title.style.opacity = 1 - progress;
        }

        if (subtitle) {
            subtitle.style.transform = `translateY(${progress * -120}px)`;
            subtitle.style.opacity = 1 - progress;
        }

        if (text) {
            text.style.transform = `translateY(${progress * -150}px)`;
            text.style.opacity = 1 - progress;
        }

        if (btn) {
            btn.style.transform = `translateY(${progress * -180}px)`;
            btn.style.opacity = 1 - progress;
        }
    }
});

/* ================= SCROLL REVEAL ================= */
function revealOnScroll() {
    const revealElements = document.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right"
    );

    const windowHeight = window.innerHeight;

    revealElements.forEach(el => {
        const top = el.getBoundingClientRect().top;

        if (top < windowHeight - 100) {
            el.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("DOMContentLoaded", revealOnScroll);

/* ================= CONTACT FORM (DJANGO SAFE) ================= */
const form = document.getElementById("contactForm");
const popup = document.getElementById("popup");

if (form) {

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const formData = new FormData(form);

        try {
            const response = await fetch(window.location.pathname, {
                method: "POST",
                body: formData,
                headers: {
                    "X-Requested-With": "XMLHttpRequest"
                }
            });

            const data = await response.json();

            if (data.status === "success") {

                if (popup) {
                    popup.classList.add("show");

                    setTimeout(() => {
                        popup.classList.remove("show");
                    }, 3000);
                }

                form.reset();
            } else {
                console.log("Server error:", data);
            }

        } catch (error) {
            console.log("AJAX error:", error);
        }
    });
}

/* ================= MOBILE MENU SAFETY ================= */
window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");

    if (!navbar) return;

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

/* ================= CV MODAL ================= */
function openCVModal() {
    const modal = document.getElementById("cvModal");
    if (modal) modal.style.display = "flex";
}

function closeCVModal() {
    const modal = document.getElementById("cvModal");
    if (modal) modal.style.display = "none";
}

window.addEventListener("click", function (event) {
    const modal = document.getElementById("cvModal");
    if (modal && event.target === modal) {
        modal.style.display = "none";
    }
});

/* ================= PARTICLE SYSTEM (SAFE FIXED) ================= */
const canvas = document.getElementById("particleCanvas");

if (canvas) {

    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2.5;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > canvas.width ||
                this.y < 0 || this.y > canvas.height) {
                this.reset();
            }
        }

        draw() {
            ctx.fillStyle = "rgba(56, 189, 248, 0.6)";
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    let particles = [];

    function initParticles() {
        particles = [];
        for (let i = 0; i < 80; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        requestAnimationFrame(animate);
    }

    initParticles();
    animate();
}