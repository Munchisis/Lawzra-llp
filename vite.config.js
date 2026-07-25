import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "vite-plugin-sitemap";
import { visualizer } from "rollup-plugin-visualizer";
import fs from "node:fs";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    {
      name: "ensure-dist-exists",
      buildStart() {
        if (!fs.existsSync("dist")) {
          fs.mkdirSync("dist", { recursive: true });
        }
      },
    },

    react(),
    tailwindcss(),

    // Safe to run now that 'dist' is guaranteed to exist
    sitemap({
      hostname: "https://lawzra.com",
      dynamicRoutes: [
        "/",
        "/about-us",
        "/contact-us",
        "/our-team",
        "/insights",
        "/careers",
        "/areas-of-practice-areas",
        "/areas-of-practice-areas/banking",
        "/areas-of-practice-areas/corporate",
        "/areas-of-practice-areas/dispute",
        "/areas-of-practice-areas/energy",
        "/areas-of-practice-areas/ip",
        "/areas-of-practice-areas/real-estate",
        "/areas-of-practice-areas/privacy",
        "/areas-of-practice-areas/tax",
        "/areas-of-practice-areas/tech",
        "/appointment",
        "/privacy-policy",
        "/terms-of-service",
        "/cookie-policy",
      ],
    }),

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
    outDir: "dist",
  },
});
