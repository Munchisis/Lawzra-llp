import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import sitemap from "vite-plugin-sitemap";
import { visualizer } from 'rollup-plugin-visualizer';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), sitemap({
    hostname: "https://lawzra.netlify.app",
      dynamicRoutes: [
        "/",
        "/about-us",
        "/contact-us",
        "/our-team",
        "/insights",
        "/careers",
        "/practice-areas",
        "/practice-areas/banking",
        "/practice-areas/corporate",
        "/practice-areas/dispute",
        "/practice-areas/energy",
        "/practice-areas/ip",
        "/practice-areas/real-estate",
        "/practice-areas/privacy",
        "/practice-areas/tax",
        "/practice-areas/tech",
        "/appointment",
        "/privacy-policy",
        "/terms-of-service",
        "/cookie-policy",
      ],
  }),
    visualizer({
      open: true, // Automatically opens the report in your browser after build
      filename: 'stats.html', // Name of the generated file
      gzipSize: true, // Show gzipped size (what users actually download)
      brotliSize: true,
 }) ],

 build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          motion: ["framer-motion"],
        },
      },
    },
  },
})
