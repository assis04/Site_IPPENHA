import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    // Proxy para o WordPress local (LocalWP).
    proxy: {
      '/wp-content/calendar-api': {
        target: 'http://ippenha.local',
        changeOrigin: true,
      },
    },
  },
})
