// ── PAGE LOADER ──
const loader = document.getElementById("loader");
window.addEventListener("load", () => {
  setTimeout(() => {
    loader.classList.add("out");
    setTimeout(() => loader.remove(), 1600);
  }, 900);
});

// ── CURSOR ──
const cur = document.getElementById("cur");
let cx = -200,
  cy = -200;
document.addEventListener("mousemove", (e) => {
  cx = e.clientX;
  cy = e.clientY;
  cur.style.left = cx + "px";
  cur.style.top = cy + "px";
});
document
  .querySelectorAll("a,button,.proj-card,.svc-row,.sk,.stat,.c-link")
  .forEach((el) => {
    el.addEventListener("mouseenter", () => cur.classList.add("big"));
    el.addEventListener("mouseleave", () => cur.classList.remove("big"));
  });
document.querySelectorAll("input,textarea").forEach((el) => {
  el.addEventListener("mouseenter", () => cur.classList.add("txt"));
  el.addEventListener("mouseleave", () => cur.classList.remove("txt"));
});
if ("ontouchstart" in window) cur.style.display = "none";

// ── NAVBAR ──
window.addEventListener(
  "scroll",
  () => {
    document
      .getElementById("navbar")
      .classList.toggle("blur", window.scrollY > 50);
  },
  { passive: true },
);

// ── MOBILE MENU (fixed) ──
const navHam = document.getElementById("navHam");
const mobileMenu = document.getElementById("mobileMenu");
navHam.addEventListener("click", (e) => {
  e.stopPropagation();
  const isOpen = mobileMenu.classList.toggle("open");
  navHam.innerHTML = isOpen ? "&#10005;" : "&#9776;";
});
// Close on link click
mobileMenu.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    navHam.innerHTML = "&#9776;";
  });
});
// Close on outside click
document.addEventListener("click", (e) => {
  if (!mobileMenu.contains(e.target) && e.target !== navHam) {
    mobileMenu.classList.remove("open");
    navHam.innerHTML = "&#9776;";
  }
});

// ── ACTIVE NAV LINKS ──
const navAs = document.querySelectorAll(".nav-links a, .nav-mobile-menu a");
window.addEventListener(
  "scroll",
  () => {
    let active = "";
    document.querySelectorAll("section[id], div[id]").forEach((s) => {
      if (window.scrollY >= s.offsetTop - 240) active = s.id;
    });
    navAs.forEach((a) =>
      a.classList.toggle("active", a.getAttribute("href") === "#" + active),
    );
  },
  { passive: true },
);

// ── SCROLL REVEAL ──
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.07, rootMargin: "0px 0px -24px 0px" },
);
document.querySelectorAll(".sr,.sr-l,.sr-r").forEach((el) => io.observe(el));

// ── PHOTO FLIP (scroll-driven 3D) ──
const flipCard = document.getElementById("flipCard");
const hero = document.querySelector(".hero-photo-wrap");

let rotation = 0;
let isFlipping = false;

window.addEventListener(
  "wheel",
  (e) => {
    const rect = hero.getBoundingClientRect();

    // Check if card is near the center of viewport
    const cardCentered =
      rect.top < window.innerHeight / 2 &&
      rect.bottom > window.innerHeight / 2;


    if (!cardCentered) return;


    // Scroll down -> flip front to back
    if (e.deltaY > 0 && rotation < 180) {

      e.preventDefault();

      isFlipping = true;

      rotation += 10;

      if (rotation > 180) {
        rotation = 180;
      }

      flipCard.style.transform =
        `rotateY(${rotation}deg)`;

      return;
    }


    // Scroll up -> flip back
    if (e.deltaY < 0 && rotation > 0) {

      e.preventDefault();

      isFlipping = true;

      rotation -= 10;

      if (rotation < 0) {
        rotation = 0;
      }

      flipCard.style.transform =
        `rotateY(${rotation}deg)`;

      return;
    }


    isFlipping = false;

  },
  { passive: false }
);
// ── BG WORD cycling on scroll ──
const bgWord = document.getElementById("bgWord");
const words = ["DEVELOPER", "ENGINEER", "BUILDER", "CREATOR", "SHIPPER"];
let lastW = 0;
bgWord.style.transition = "opacity .22s ease";
window.addEventListener(
  "scroll",
  () => {
    const prog =
      window.scrollY / (document.body.scrollHeight - window.innerHeight);
    const idx = Math.floor(prog * words.length) % words.length;
    if (idx !== lastW) {
      bgWord.style.opacity = "0";
      setTimeout(() => {
        bgWord.textContent = words[idx];
        bgWord.style.opacity = "";
      }, 220);
      lastW = idx;
    }
  },
  { passive: true },
);

// ── STAT COUNTER ──
document.querySelectorAll(".sn").forEach((el) => {
  const raw = el.textContent.trim();
  const plus = raw.includes("+");
  const target = parseInt(raw);
  if (isNaN(target)) return;
  let started = false;
  const ob = new IntersectionObserver(
    ([e]) => {
      if (e.isIntersecting && !started) {
        started = true;
        let n = 0;
        const step = Math.ceil(target / 40);
        const t = setInterval(() => {
          n = Math.min(n + step, target);
          el.textContent = n + (plus ? "+" : "");
          if (n >= target) clearInterval(t);
        }, 35);
      }
    },
    { threshold: 0.5 },
  );
  ob.observe(el);
});

// ── PROJECT CARD TILT ──
document.querySelectorAll(".proj-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `translateY(-10px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});
