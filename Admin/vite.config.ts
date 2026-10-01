import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Admin web app (ADR-032 / §36a #5): separate lightweight React app.
// Serves on 5173 in dev; proxied /api → backend keeps CORS simple.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: process.env.VITE_API_TARGET ?? 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});
