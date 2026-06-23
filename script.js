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
// ── PHOTO FLIP (scroll-locked on desktop + touch on mobile) ──
// ── PHOTO FLIP ──
const flipCard = document.getElementById("flipCard");
const heroWrap = document.querySelector(".hero-photo-wrap");

let rotation = 0;
let touchStartY = 0;

function setFlip(deg) {
  rotation = Math.min(180, Math.max(0, deg));
  flipCard.style.transform = `rotateY(${rotation}deg)`;
}

function isHeroCentered() {
  const rect = heroWrap.getBoundingClientRect();
  return rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2;
}

// Lock/unlock body scroll using touch-action + overflow
function lockScroll() {
  document.body.style.overflow = "hidden";
  document.body.style.touchAction = "none";
}

function unlockScroll() {
  document.body.style.overflow = "";
  document.body.style.touchAction = "";
}

// Watch hero visibility and lock/unlock accordingly
const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Only lock if flip isn't complete
      if (rotation < 180) lockScroll();
    } else {
      unlockScroll();
    }
  });
}, { threshold: 0.5 });

heroObserver.observe(heroWrap);

// ── DESKTOP: wheel ──
window.addEventListener("wheel", (e) => {
  if (!isHeroCentered()) return;

  if (e.deltaY > 0 && rotation < 180) {
    e.preventDefault();
    setFlip(rotation + 12);
    if (rotation >= 180) unlockScroll();
    return;
  }

  if (e.deltaY < 0 && rotation > 0) {
    e.preventDefault();
    setFlip(rotation - 12);
    if (rotation > 0) lockScroll();
    return;
  }
}, { passive: false });

// ── MOBILE: touch ──
document.addEventListener("touchstart", (e) => {
  touchStartY = e.touches[0].clientY;
}, { passive: true });

document.addEventListener("touchmove", (e) => {
  if (!isHeroCentered()) return;

  const deltaY = touchStartY - e.touches[0].clientY;

  // Swipe down → flip forward
  if (deltaY > 3 && rotation < 180) {
    e.preventDefault();
    setFlip(rotation + 3);
    touchStartY = e.touches[0].clientY;

    // Flip complete → unlock scroll
    if (rotation >= 180) {
      unlockScroll();
    }
    return;
  }

  // Swipe up → flip back
  if (deltaY < -3 && rotation > 0) {
    e.preventDefault();
    setFlip(rotation - 3);
    touchStartY = e.touches[0].clientY;

    // Re-lock if flipping back
    if (rotation < 180) {
      lockScroll();
    }
    return;
  }

}, { passive: false });

document.addEventListener("touchend", () => {
  touchStartY = 0;
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