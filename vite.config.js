import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite config: tells Vite to use the React plugin so it understands JSX syntax
// and enables fast refresh (live updates as you edit files).
export default defineConfig({
  plugins: [react()],
  // base tells Vite the URL path the app will be served from.
  // GitHub Pages serves repo sites at /RepoName/, so all asset paths
  // must be prefixed with this — otherwise CSS/JS won't load.
  base: '/Physiotherapy-Demo/',
  server: {
    port: 5173,
    open: false
  }
})
