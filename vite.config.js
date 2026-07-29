import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "vite-plugin-sitemap";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    sitemap({
      hostname: "https://lawzra.com",
      generateRobotsTxt: false,
      dynamicRoutes: [
        "/",
        "/about-us",
        "/contact-us",
        "/our-team",
        "/uchenna-emmanuel",
        "/macsunny-nwoke",
        "/chigozie-kelechi",
        "/insights",
        "/careers",
        "/areas-of-practice",
        "/areas-of-practice/banking",
        "/areas-of-practice/corporate",
        "/areas-of-practice/dispute",
        "/areas-of-practice/energy",
        "/areas-of-practice/ip",
        "/areas-of-practice/real-estate",
        "/areas-of-practice/privacy",
        "/areas-of-practice/tax",
        "/areas-of-practice/tech",
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
    outDir: "dist",
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
