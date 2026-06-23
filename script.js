//PAGE LOADER 
const loader = document.getElementById("loader");
window.addEventListener("load", () => {
  setTimeout(() => {
    loader.classList.add("out");
    setTimeout(() => loader.remove(), 1600);
  }, 900);
});

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


window.addEventListener(
  "scroll",
  () => {
    document
      .getElementById("navbar")
      .classList.toggle("blur", window.scrollY > 50);
  },
  { passive: true },
);

const navHam = document.getElementById("navHam");
const mobileMenu = document.getElementById("mobileMenu");
navHam.addEventListener("click", (e) => {
  e.stopPropagation();
  const isOpen = mobileMenu.classList.toggle("open");
  navHam.innerHTML = isOpen ? "&#10005;" : "&#9776;";
});

mobileMenu.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    navHam.innerHTML = "&#9776;";
  });
});

document.addEventListener("click", (e) => {
  if (!mobileMenu.contains(e.target) && e.target !== navHam) {
    mobileMenu.classList.remove("open");
    navHam.innerHTML = "&#9776;";
  }
});


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


// ── PHOTO FLIP (scroll-locked on desktop + touch on mobile) ──
const flipCard = document.getElementById("flipCard");
const heroWrap = document.querySelector(".hero-photo-wrap");

let rotation = 0;
let flipping = false;

function setFlip(deg) {
  rotation = Math.min(180, Math.max(0, deg));
  flipCard.style.transform = `rotateY(${rotation}deg)`;
}

// ── DESKTOP: wheel ──
window.addEventListener("wheel", (e) => {
  const rect = heroWrap.getBoundingClientRect();
  const centered = rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2;

  if (!centered) return;

  // flip not done going down → lock scroll
  if (e.deltaY > 0 && rotation < 180) {
    e.preventDefault();
    setFlip(rotation + 12);
    return;
  }

  // flip not done going up → lock scroll
  if (e.deltaY < 0 && rotation > 0) {
    e.preventDefault();
    setFlip(rotation - 12);
    return;
  }

  // flip complete → let page scroll normally
}, { passive: false });

// ── MOBILE: touch ──
let touchStartY = 0;
let touchLocked = false;

window.addEventListener("touchstart", (e) => {
  touchStartY = e.touches[0].clientY;
  touchLocked = false;
}, { passive: true });

window.addEventListener("touchmove", (e) => {
  const rect = heroWrap.getBoundingClientRect();
  const centered = rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2;

  if (!centered) return;

  const deltaY = touchStartY - e.touches[0].clientY;

  // swipe down → flip forward
  if (deltaY > 0 && rotation < 180) {
    e.preventDefault();
    touchLocked = true;
    setFlip(rotation + 4);
    return;
  }

  // swipe up → flip back
  if (deltaY < 0 && rotation > 0) {
    e.preventDefault();
    touchLocked = true;
    setFlip(rotation - 4);
    return;
  }

  touchLocked = false;
}, { passive: false });

window.addEventListener("touchend", () => {
  touchStartY = 0;
  touchLocked = false;
});

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



  emailjs.init("yCgwIWXoWe_klsqNy");

  function handleSubmit() {
    var name = document.getElementById("from_name").value;
    var email = document.getElementById("from_email").value;
    var message = document.getElementById("message").value;
    var btn = document.getElementById("sendBtn");
    var btnText = document.getElementById("btnText");
    var bar = document.getElementById("btnBar");

    if (!name || !email || !message) return;

    btn.disabled = true;
    btnText.textContent = "Sending...";
    bar.classList.remove("sending");
    void bar.offsetWidth;
    bar.classList.add("sending");

    emailjs.send("portfolio_contack", "template_mkyegym", {
      from_name: name,
      from_email: email,
      message: message,
    })
    .then(function () {
      bar.style.transition = "none";
      bar.style.width = "100%";
      btn.classList.add("sent");
      btnText.textContent = "Sent!";

      setTimeout(function () {
        btnText.textContent = "Send Message →";
        bar.style.width = "0%";
        btn.classList.remove("sent");
        btn.disabled = false;

        document.getElementById("from_name").value = "";
        document.getElementById("from_email").value = "";
        document.getElementById("message").value = "";
      }, 2000);
    })
    .catch(function () {
      bar.style.transition = "none";
      bar.style.width = "0%";
      btnText.textContent = "Send Message →";
      btn.disabled = false;
    });
  }