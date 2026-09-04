import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vercel / local: '/'. GitHub Pages project site: '/Be-careful/'
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE || '/',
})
