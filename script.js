// ============================================================
// DARK / LIGHT MODE TOGGLE
// ============================================================
const themeBtn = document.getElementById('theme-toggle');

// Load saved preference or default to light
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
  document.body.classList.add('dark');
  themeBtn.textContent = '☀️';
}

themeBtn.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark');
  themeBtn.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});


// ============================================================
// FOOTER — AUTO YEAR
// ============================================================
document.getElementById('year').textContent = new Date().getFullYear();


// ============================================================
// SMOOTH SCROLL HIGHLIGHT (navbar active link)
// ============================================================
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navAnchors.forEach((a) => a.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach((s) => observer.observe(s));


// ============================================================
// CONTACT FORM — sends to sxwzdzq@gmail.com via Formspree
//
// TO ACTIVATE:
//   1. Go to https://formspree.io and sign up (free)
//   2. Click "New Form", link it to sxwzdzq@gmail.com
//   3. Copy your Form ID (looks like: xabcdefg)
//   4. Replace YOUR_FORM_ID below with that ID
// ============================================================
// ID loaded from config.js (gitignored) → window.CONFIG.FORMSPREE_ID
const FORMSPREE_ID = window.CONFIG?.FORMSPREE_ID ?? 'YOUR_FORM_ID';

const form       = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const submitBtn  = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Basic client-side validation
  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    showFormStatus('Please fill in all fields.', 'error');
    return;
  }

  // Warn if form ID hasn't been set yet
  if (FORMSPREE_ID === 'YOUR_FORM_ID') {
    showFormStatus('Form not yet activated — see script.js for setup instructions.', 'error');
    return;
  }

  // Disable button while sending
  submitBtn.disabled    = true;
  submitBtn.textContent = 'Sending…';

  try {
    const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method:  'POST',
      body:    new FormData(form),
      headers: { 'Accept': 'application/json' },
    });

    if (res.ok) {
      showFormStatus("Message sent! I'll get back to you soon.", 'success');
      form.reset();
    } else {
      const data = await res.json().catch(() => ({}));
      const msg  = data.errors ? data.errors.map((err) => err.message).join(', ')
                               : 'Something went wrong. Please email me directly.';
      showFormStatus(msg, 'error');
    }
  } catch {
    showFormStatus('Network error. Please email me directly at sxwzdzq@gmail.com', 'error');
  } finally {
    submitBtn.disabled    = false;
    submitBtn.textContent = 'Send Message';
  }
});

function showFormStatus(msg, type) {
  formStatus.textContent = msg;
  formStatus.className   = `form-status ${type}`;
  setTimeout(() => {
    formStatus.textContent = '';
    formStatus.className   = 'form-status';
  }, 5000);
}


// ============================================================
// SCROLL-IN ANIMATION (cards fade up when they enter view)
// ============================================================
const animateEls = document.querySelectorAll(
  '.project-card, .skill-category, .timeline-card'
);

const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target); // animate once
      }
    });
  },
  { threshold: 0.1 }
);

animateEls.forEach((el) => {
  el.classList.add('fade-up');
  fadeObserver.observe(el);
});


// ============================================================
// VISITOR COUNTER
// Uses localStorage to persist a count across browser sessions.
// Each unique browser session (sessionStorage) increments once.
//
// NOTE: This is a per-browser counter — every visitor on their
// own device starts from SEED and accumulates locally.
// For a real shared counter, replace with a free service like
// https://api.countapi.xyz or https://countapi.xyz
// ============================================================
(function () {
  const SEED        = 100;          // Friendly starting number
  const COUNT_KEY   = 'xw_visit_count';
  const SESSION_KEY = 'xw_visited';

  // Read stored count, fall back to seed
  let count = parseInt(localStorage.getItem(COUNT_KEY) || SEED, 10);

  // Only increment once per browser session
  if (!sessionStorage.getItem(SESSION_KEY)) {
    count += 1;
    localStorage.setItem(COUNT_KEY, count);
    sessionStorage.setItem(SESSION_KEY, '1');
  }

  // Display with ordinal suffix (1st, 2nd, 3rd, 108th …)
  function ordinal(n) {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }

  const el = document.getElementById('visitor-count');
  if (el) el.textContent = ordinal(count);
})();
