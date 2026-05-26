import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const frontendDir = path.resolve(rootDir, "Frontend");

// https://vite.dev/config/
export default defineConfig({
  root: frontendDir,
  envDir: rootDir,
  publicDir: path.resolve(frontendDir, "public"),
  build: {
    outDir: path.resolve(rootDir, "dist"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("@headlessui") || id.includes("@heroicons")) {
              return "ui-vendor";
            }
            if (
              id.includes("react-router") ||
              id.includes("react-dom") ||
              id.includes("/react/")
            ) {
              return "react-vendor";
            }
          }
        },
      },
    },
  },
  plugins: [react(), tailwindcss()],
});
