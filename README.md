# Xiaowen Shou — Personal Portfolio

A hand-built personal portfolio website with no frameworks — plain HTML, CSS, and JavaScript.

**Live site:** [github.io coming soon]

## Features

- Responsive layout (mobile-friendly)
- Dark / light mode toggle (persisted in `localStorage`)
- Smooth-scroll navigation with active-link highlighting
- Scroll-in animations (fade-up) for cards
- Experience timeline
- Project cards with tech tags and links
- Contact form via [Formspree](https://formspree.io)
- Local visitor counter

## Structure

```
portfolio/
├── index.html           # Main page
├── style.css            # All styles (CSS variables, dark mode, responsive)
├── script.js            # Theme toggle, animations, contact form, visitor counter
├── config.example.js    # Template for local config (commit this)
├── config.js            # Real config with API keys — gitignored, do not commit
├── photos/              # Profile photo, project logos, screenshots
└── Xiaowen Shou CV.pdf  # Downloadable CV
```

## Contact Form Setup

The contact form submits to [Formspree](https://formspree.io). To activate it locally:

1. Copy `config.example.js` → `config.js`
2. Replace `YOUR_FORM_ID` with your real Formspree form ID
3. `config.js` is gitignored — it will not be committed

## Tech Stack

`HTML` · `CSS` · `JavaScript` · Formspree (contact form)

---

Built by [Xiaowen Shou](https://www.linkedin.com/in/xiaowen-shou)
