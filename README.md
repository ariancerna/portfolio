# Portafolio - Arian Cerna

Mi portafolio personal. Está hecho en React con Vite y Tailwind, en español e inglés.

Acá puedes ver mis proyectos, un poco sobre mí y cómo contactarme.

## Correr el proyecto

Necesitas Node instalado. Después:

```bash
npm install
npm run dev
```

Se abre en `http://localhost:5173`.

Para generar la versión de producción:

```bash
npm run build
```

Los archivos quedan en la carpeta `dist`.

## Cómo está armado

- `src/components` — cada sección es su propio componente (Hero, About, Projects, Skills, Contact...).
- `src/i18n/translations.js` — todos los textos en español e inglés. El idioma se guarda en localStorage.
- `public` — favicon e imagen para compartir en redes (og-image).
- Los colores y demás están en `tailwind.config.js`.

## Stack

React 19, Vite, Tailwind CSS. Sin librerías de UI, todo el diseño está hecho a mano.
