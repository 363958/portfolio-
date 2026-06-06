/* ================= MENU TOGGLE ================= */
function toggleMenu() {
    const nav = document.getElementById("navLinks");
    if (!nav) return;
    nav.classList.toggle("active");
}

/* ================= THEME TOGGLE ================= */
function toggleTheme() {
    document.body.classList.toggle("light-mode");
}

/* ================= SCROLL SPY ================= */
const sections = document.querySelectorAll("section");
const navLinksSpy = document.querySelectorAll(".nav-link");

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

    navLinksSpy.forEach(link => {
        link.classList.remove("active");

        if (current && link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

/* ================= SCROLL PROGRESS BAR ================= */
window.addEventListener("scroll", () => {
    const bar = document.getElementById("progressBar");
    if (!bar) return;

    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (scrollTop / scrollHeight) * 100;

    bar.style.width = scrolled + "%";
});

/* ================= NAVBAR SCROLL EFFECT ================= */
window.addEventListener("scroll", function () {
    const navbar = document.getElementById("navbar");
    if (!navbar) return;

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

/* ================= PARTICLE BACKGROUND ================= */
const canvas = document.getElementById("particleCanvas");

if (canvas) {

    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let particles = [];

    for (let i = 0; i < 50; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
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

/* ================= SCROLL REVEAL ANIMATION ================= */
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

  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// ================= CV MODAL =================
function openCVModal() {
    document.getElementById("cvModal").style.display = "flex";
}

function closeCVModal() {
    document.getElementById("cvModal").style.display = "none";
}

// close when clicking outside modal
window.onclick = function(event) {
    let modal = document.getElementById("cvModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

