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
  return (
    rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2
  );
}

function lockScroll() {
  document.body.style.overflow = "hidden";
  document.body.style.touchAction = "none";
}

function unlockScroll() {
  document.body.style.overflow = "";
  document.body.style.touchAction = "";
}

// ── DESKTOP: wheel ──
window.addEventListener(
  "wheel",
  (e) => {
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
      return;
    }
  },
  { passive: false },
);

// MOBILE
document.addEventListener(
  "touchstart",
  (e) => {
    touchStartY = e.touches[0].clientY;
  },
  { passive: true },
);

document.addEventListener(
  "touchmove",
  (e) => {
    if (!isHeroCentered()) return;

    const deltaY = touchStartY - e.touches[0].clientY;

    if (deltaY > 3 && rotation < 180) {
      lockScroll(); 
      e.preventDefault();
      setFlip(rotation + 3);
      touchStartY = e.touches[0].clientY;

      if (rotation >= 180) {
        unlockScroll(); 
      }
      return;
    }

    
    if (deltaY < -3 && rotation > 0) {
      lockScroll();
      e.preventDefault();
      setFlip(rotation - 3);
      touchStartY = e.touches[0].clientY;

      if (rotation <= 0) {
        unlockScroll();
      }
      return;
    }

    unlockScroll();
  },
  { passive: false },
);

document.addEventListener("touchend", () => {
  touchStartY = 0;
  unlockScroll();
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

  emailjs
    .send("portfolio_contack", "template_mkyegym", {
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






// ── TEXT SCRAMBLE EFFECT — FINAL v3 ──────────────────────────────
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$';

// Standard scramble — for plain text nodes (no child elements)
function scrambleText(el, finalText, duration = 800) {
  if (!finalText || !finalText.trim()) return;
  const len = finalText.length;
  const frameDuration = 30;
  const totalFrames = Math.round(duration / frameDuration);
  let frame = 0;
  if (el._scrambleInterval) clearInterval(el._scrambleInterval);
  el._scrambleInterval = setInterval(() => {
    el.textContent = finalText
      .split('')
      .map((char, i) => {
        if (char === ' ') return ' ';
        if (i < Math.floor((frame / totalFrames) * len)) return char;
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      })
      .join('');
    frame++;
    if (frame > totalFrames) {
      el.textContent = finalText;
      clearInterval(el._scrambleInterval);
      el._scrambleInterval = null;
    }
  }, frameDuration);
}

// BR-aware scramble — preserves <br> tags by splitting on them,
// scrambling each segment separately, then rejoining with <br>
function scrambleTextWithBR(el, duration = 800) {
  // Collect text segments split by <br> elements
  const segments = [];
  let current = '';
  el.childNodes.forEach(node => {
    if (node.nodeType === Node.TEXT_NODE) {
      current += node.textContent;
    } else if (node.nodeName === 'BR') {
      segments.push(current);
      segments.push(null); // null = <br> placeholder
      current = '';
    }
  });
  segments.push(current);

  const textSegments = segments.filter(s => s !== null);
  const fullText = textSegments.join('');
  if (!fullText.trim()) return;

  const len = fullText.length;
  const frameDuration = 30;
  const totalFrames = Math.round(duration / frameDuration);
  let frame = 0;

  if (el._scrambleInterval) clearInterval(el._scrambleInterval);

  el._scrambleInterval = setInterval(() => {
    const progress = Math.floor((frame / totalFrames) * len);
    let charIdx = 0;

    // Rebuild innerHTML preserving <br> positions
    const html = segments.map(seg => {
      if (seg === null) return '<br>';
      return seg.split('').map(char => {
        if (char === ' ') { charIdx++; return ' '; }
        const resolved = charIdx < progress;
        charIdx++;
        return resolved ? char : CHARS[Math.floor(Math.random() * CHARS.length)];
      }).join('');
    }).join('');

    el.innerHTML = html;
    frame++;

    if (frame > totalFrames) {
      // Restore original HTML exactly
      const restored = segments.map(s => s === null ? '<br>' : s).join('');
      el.innerHTML = restored;
      clearInterval(el._scrambleInterval);
      el._scrambleInterval = null;
    }
  }, frameDuration);
}

// ── ELEMENT TYPE HELPERS ──────────────────────────────────────────
const SKIP_TAGS = new Set([
  'IMG','SVG','svg','I','INPUT','TEXTAREA','SCRIPT',
  'STYLE','CANVAS','VIDEO','AUDIO','PICTURE','FIGURE','HR'
]);

// True leaf: no child elements at all
function isLeaf(el) {
  return el.children.length === 0 && el.textContent.trim().length > 0;
}

// BR-only leaf: only child elements are <br> tags
function isBRLeaf(el) {
  if (el.children.length === 0) return false;
  return [...el.children].every(c => c.tagName === 'BR') && el.textContent.trim().length > 0;
}

function collectSafeLeaves(root) {
  const results = [];
  function walk(node) {
    if (!node || SKIP_TAGS.has(node.tagName)) return;
    if (isLeaf(node) || isBRLeaf(node)) {
      results.push(node);
    } else {
      for (const child of node.children) walk(child);
    }
  }
  walk(root);
  return results;
}

function shouldSkip(el) {
  if (el.tagName === 'H1' || el.closest('h1')) return true;
  if (el.closest('nav, header, .navbar, [class*="nav"]')) return true;
  const txt = el.textContent.trim().toUpperCase();
  if (txt.match(/^\/?BUILDING SINCE/) || txt.match(/^\/?\/BUILDING/)) return true;
  return false;
}

// Dispatch to the right scramble function
function scrambleEl(el, duration) {
  if (isBRLeaf(el)) {
    scrambleTextWithBR(el, duration);
  } else {
    scrambleText(el, el.textContent, duration);
  }
}

// ── LOADER ────────────────────────────────────────────────────────
// Uses BR-aware scramble so "Full Stack Developer <br> AI Engineer"
// stays on two lines during and after the effect
(function () {
  document.querySelectorAll('.loader-word').forEach((el) => {
    // Skip the "Full Stack Developer / AI Engineer" loader word
    if (el.textContent.toLowerCase().includes('full stack') || el.textContent.toLowerCase().includes('ai engineer')) return;

    // Store original innerHTML before we blank it
    const originalHTML = el.innerHTML;
    const hasBreak = el.querySelector('br');

    if (hasBreak) {
      // For BR elements: blank text nodes only, keep <br>
      el.childNodes.forEach(n => { if (n.nodeType === Node.TEXT_NODE) n.textContent = ''; });
    } else {
      el.textContent = '';
    }

    const delayMs = parseFloat(el.style.animationDelay || '0') * 1000;
    setTimeout(() => {
      if (hasBreak) {
        scrambleTextWithBR(el, 550);
      } else {
        scrambleText(el, el.textContent || originalHTML, 550);
        // textContent was blanked, restore from original for scramble
        el.textContent = '';
        const plainText = originalHTML.replace(/<[^>]+>/g, ' ').trim();
        scrambleText(el, plainText, 550);
      }
    }, delayMs + 200);
  });
})();

// ── HERO — scramble on load ───────────────────────────────────────
(function () {
  window.addEventListener('load', () => {
    const seen = new WeakSet();

    function safeScramble(el, delay, dur) {
      if (!el || seen.has(el) || shouldSkip(el)) return;
      if (!isLeaf(el) && !isBRLeaf(el)) return;
      seen.add(el);
      setTimeout(() => scrambleEl(el, dur || 750), delay);
    }

    const heroRoot = document.querySelector(
      '.hero, #hero, [class*="hero"], main > section:first-of-type'
    );

    if (heroRoot) {
      collectSafeLeaves(heroRoot).forEach((el, idx) => {
        safeScramble(el, 300 + idx * 120);
      });
    } else {
      [
        '.hero-tagline', '[class*="tagline"]',
        '.hero-sub',     '[class*="hero-sub"]',
        '.hero-desc',    '[class*="hero-desc"]',
        '.hero-right p', '.hero-cta a',
        '[class*="cta"] a', '.hero-scroll',
      ].forEach((sel, si) => {
        document.querySelectorAll(sel).forEach((el, i) => {
          safeScramble(el, 300 + si * 80 + i * 60);
        });
      });
    }
  });
})();

// ── SCROLL-TRIGGERED SECTIONS ─────────────────────────────────────
(function () {
  const SECTION_SELECTORS = [
    '#stack',    '.stack',    '.stack-section',
    '#projects', '.projects', '.projects-section',
    '#services', '.services', '.services-section',
    '#about',    '.about',    '.about-section',
    '#contact',  '.contact',  '.contact-section',
  ].join(',');

  const seen = new WeakSet();

  const scrambleIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;

        if ((isLeaf(el) || isBRLeaf(el)) && !shouldSkip(el)) {
          scrambleEl(el, 800);
        } else {
          collectSafeLeaves(el).forEach((child, idx) => {
            if (seen.has(child) || shouldSkip(child)) return;
            seen.add(child);
            setTimeout(() => scrambleEl(child, 780), idx * 55);
          });
        }

        scrambleIO.unobserve(el);
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -15px 0px' }
  );

  document.querySelectorAll(SECTION_SELECTORS).forEach((section) => {
    if (!seen.has(section)) {
      scrambleIO.observe(section);
      seen.add(section);
    }
    collectSafeLeaves(section).forEach((el) => {
      if (!seen.has(el) && !shouldSkip(el)) {
        scrambleIO.observe(el);
        seen.add(el);
      }
    });
  });

  document.querySelectorAll(
    '.sr h1,.sr h2,.sr h3,.sr h4,.sr h5,.sr h6,.sr p,.sr span,.sr a,.sr li,' +
    '.sr-l h1,.sr-l h2,.sr-l h3,.sr-l h4,.sr-l p,.sr-l span,.sr-l a,' +
    '.sr-r h1,.sr-r h2,.sr-r h3,.sr-r h4,.sr-r p,.sr-r span,.sr-r a'
  ).forEach((el) => {
    if (!seen.has(el) && (isLeaf(el) || isBRLeaf(el)) && !shouldSkip(el)) {
      scrambleIO.observe(el);
      seen.add(el);
    }
  });
})();