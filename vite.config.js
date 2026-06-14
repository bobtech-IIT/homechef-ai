import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    assetsDir: '', // Put compiled JS/CSS/assets at root level for Puter hosting compatibility
  }
})

