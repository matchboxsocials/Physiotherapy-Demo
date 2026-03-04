import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite config: tells Vite to use the React plugin so it understands JSX syntax
// and enables fast refresh (live updates as you edit files).
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: false
  }
})
