import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Alles, was mit /api beginnt, wird an die Yelp-API weitergeleitet
      '/api': {
        target: 'https://api.yelp.com',
        changeOrigin: true, // für virtuellen gehosteten Sites notwendig
        rewrite: (path) => path.replace(/^\/api/, '/v3/businesses'), // Pfad neu schreiben
      },
    },
  },
})
