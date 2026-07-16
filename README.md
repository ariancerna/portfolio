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

- src/components — each section is its own component (Hero, About, Projects, Skills, Contact...).
- src/i18n/translations.js — all the text in Spanish and English. The language is saved in localStorage.
- public — favicon and image for social sharing (og-image).
- Colors and other settings are in tailwind.config.js.

## Stack

React 19, Vite, Tailwind CSS. No UI libraries, everything is designed by hand.
