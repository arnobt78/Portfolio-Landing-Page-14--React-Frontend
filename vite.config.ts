import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // 3D libs (three, rapier, etc.) produce large chunks; TechStack is already lazy-loaded
    chunkSizeWarningLimit: 2600,
  },
});
