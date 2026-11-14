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

- src/components — each section is its own component (Hero, Services, Projects, Process, Pricing, About, Skills, Contact...).
- src/components/DeviceScene.jsx — the 3D laptop and phone in the hero (Three.js + React Three Fiber). The screens show real project screenshots and cross-fade between them. It is only loaded on desktop, pauses when off screen and falls back to a plain screenshot without WebGL.
- src/components/PhoneShowcase.jsx — the lightweight version of the hero for phones and tablets: a CSS phone that swipes through the same projects.
- src/components/Tilt.jsx — layered screenshots that tilt in 3D toward the pointer in the projects section.
- src/data/projects.js — the list of projects, shared by the hero and the projects section.
- src/data/tech.js — the technologies shown in the stack section.
- src/i18n/translations.js — all the text in Spanish and English. The language is saved in localStorage.
- src/lib/contact.js — WhatsApp number, email and CV path in one place.
- public/projects — project screenshots (WebP), desktop and mobile.
- public — favicon, CV and image for social sharing (og-image).
- Colors, type and the few shared classes (buttons, labels, fields) are in src/index.css.

## Design

One dark neutral palette, a single accent color and hairline dividers on a 12-column grid. No color gradients, glows or glass effects. Type is Geist and Geist Mono, self-hosted.

## Stack

React 19, Vite, Tailwind CSS 4, Three.js with React Three Fiber. No UI libraries, everything is designed by hand.
