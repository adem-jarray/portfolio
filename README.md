# Adem Jarray — Portfolio

Personal portfolio website of **Adem Jarray**, a Computer Science student and Full-Stack / Mobile developer based in Sousse, Tunisia.

🔗 Live repository: [github.com/adem-jarray/portfolio](https://github.com/adem-jarray/portfolio)

## Sections

- **Hero** — introduction, roles, quick stats
- **About** — education, background, and a terminal-style profile card
- **Skills** — frontend, backend, mobile, databases, tools, and languages
- **Projects** — featured work with browser-mockup previews:
  - **Haustier** — full-stack pet services platform (React · TypeScript · Supabase)
  - **CCNS** — institutional platform for a cybersecurity firm (Angular 22) — [ccns.fr](https://ccns.fr)
  - **BudgetÉtudiant** — student budget simulator (JavaScript · Chart.js · Supabase)
- **Contact** — email, phone, socials, and contact form

## Tech

Plain HTML + CSS + JavaScript — no build step, no dependencies. Fonts ([Inter](https://fonts.google.com/specimen/Inter), [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono)) and icon sets (Font Awesome, Devicon) are loaded from CDNs.

## Run locally

```bash
# from the repository root
python -m http.server 8080
# then open http://localhost:8080
```

Or simply open `index.html` in a browser.

## Structure

```
├── index.html    # page structure
├── styles.css    # design system + styling
├── script.js     # nav, typewriter, counters, reveal animations, form
└── *.png         # project banners and profile photo
```

## Design

Minimal dark theme: deep slate surfaces, a single emerald accent, Inter/JetBrains Mono typography. Built with accessibility in mind — keyboard-focus states, reduced-motion support, and WCAG-friendly contrast.

---

© 2026 Adem Jarray. All rights reserved.
