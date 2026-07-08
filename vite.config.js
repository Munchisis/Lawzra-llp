import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "vite-plugin-sitemap";
import { visualizer } from "rollup-plugin-visualizer";
import fs from "node:fs";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),

    sitemap({
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

    // Placing this right AFTER sitemap forces Vite to guarantee 'dist'
    // exists the exact millisecond the sitemap plugin looks for it.
    {
      name: "ensure-dist-exists",
      closeBundle: {
        sequential: true,
        handler() {
          if (!fs.existsSync("dist")) {
            fs.mkdirSync("dist", { recursive: true });
          }
        },
      },
    },

    visualizer({
      open: false,
      filename: "stats.html",
      gzipSize: true,
      brotliSize: true,
    }),
  ],

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
});
