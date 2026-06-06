/* ================= MENU TOGGLE ================= */
function toggleMenu() {
    const nav = document.getElementById("navLinks");
    if (!nav) return;
    nav.classList.toggle("active");
}

/* ================= DARK MODE ================= */
function toggleTheme() {
    document.body.classList.toggle("light-mode");
}

/* ================= SCROLL SPY (OPTIMIZED) ================= */
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {

    let current = "";

    const scrollY = window.scrollY;

    sections.forEach(section => {
        const offset = section.offsetTop - 150;
        const height = section.offsetHeight;

        if (scrollY >= offset && scrollY < offset + height) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        if (current && link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

/* ================= PARTICLE BACKGROUND (SAFE + STABLE) ================= */
const canvas = document.getElementById("particleCanvas");
let ctx;
let particles = [];

if (canvas) {

    ctx = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Create particles
    for (let i = 0; i < 60; i++) {
        particles.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            dx: (Math.random() - 0.5) * 1,
            dy: (Math.random() - 0.5) * 1,
            size: 2
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.x += p.dx;
            p.y += p.dy;

            if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(34, 197, 94, 0.5)";
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }

    animate();
}

/* ================= SCROLL ANIMATION ================= */
const revealElements = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right"
);

function revealOnScroll() {
    const windowHeight = window.innerHeight;

    revealElements.forEach(el => {
        const top = el.getBoundingClientRect().top;

        if (top < windowHeight - 100) {
            el.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

/* ================= CONTACT FORM (AJAX + POPUP FIXED) ================= */
const form = document.getElementById("contactForm");
const popup = document.getElementById("popup");

if (form) {

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const formData = new FormData(form);

        try {
            const response = await fetch("/", {
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
                console.log("Server returned error:", data);
            }

        } catch (error) {
            console.log("AJAX Error:", error);
        }
    });
}

/* ================= NAVBAR SCROLL EFFECT (FIXED ONLY) ================= */
window.addEventListener("scroll", () => {

    const navbar = document.querySelector(".navbar");

    if (!navbar) return;   // ✅ safe check added

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});