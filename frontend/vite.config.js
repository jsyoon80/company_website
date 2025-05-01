import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    cors: true,
    allowedHosts: ['afca-210-87-207-200.ngrok-free.app'], // ngrok 허용
  }
})
