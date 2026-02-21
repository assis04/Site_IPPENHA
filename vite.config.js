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
    proxy: {
      '/wp-content/calendar-api': {
        target: 'http://ippenha.local',
        changeOrigin: true,
      },
      '/wp-content/instagram-api': {
        target: 'http://ippenha.local',
        changeOrigin: true,
      },
    },
  },
})
