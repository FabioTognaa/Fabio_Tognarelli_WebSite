import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const frontendDir = path.resolve(rootDir, "Frontend");
const indexHtmlPath = path.resolve(frontendDir, "index.html");

// Blocca le build in produzione del progetto qualora Impeccabile Live (skill agentica) viene iniettato in dist/index.html
function rejectImpeccableLive() {
  const forbidden = /localhost:8400|impeccable-live/i;

  return {
    name: "reject-impeccable-live",
    buildStart() {
      const html = fs.readFileSync(indexHtmlPath, "utf8");
      if (forbidden.test(html)) {
        throw new Error(
          "Build blocked: Frontend/index.html contains Impeccable Live / localhost:8400. " +
            "Remove it before deploying — it triggers suspicious permission prompts on mobile.",
        );
      }
    },
  };
}

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
  plugins: [rejectImpeccableLive(), react(), tailwindcss()],
});
