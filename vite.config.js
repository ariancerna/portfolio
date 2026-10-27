import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // The Three.js scene is its own lazy-loaded chunk, so it never blocks the first paint.
    chunkSizeWarningLimit: 1000,
  },
})
