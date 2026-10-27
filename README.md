# Portfolio - Arian Cerna

My personal portfolio. Built with React, Vite and Tailwind, in Spanish and English.

Here you can see my projects, a bit about me, and how to contact me.

## Running the project

You need Node installed. Then:

```bash
npm install
npm run dev
```

It opens at http://localhost:5173.

To generate the production build:

```bash
npm run build
```

The files will be in the dist folder.

## How it's structured

- src/components — each section is its own component (Hero, Services, Projects, Process, About, Skills, Contact...).
- src/components/Scene3D.jsx — the interactive 3D scene in the hero (Three.js + React Three Fiber). It loads after the page, pauses when off screen and falls back to a CSS glow without WebGL.
- src/i18n/translations.js — all the text in Spanish and English. The language is saved in localStorage.
- src/lib/contact.js — WhatsApp number, email and CV path in one place.
- public/projects — project screenshots (WebP).
- public — favicon, CV and image for social sharing (og-image).
- Colors and animations are in src/index.css.

## Stack

React 19, Vite, Tailwind CSS 4, Three.js with React Three Fiber. No UI libraries, everything is designed by hand.
