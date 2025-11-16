import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

const plugins = [react(), tailwindcss()];

// For GitHub Pages, set base to repository name if deploying to username.github.io/repo-name
// For username.github.io, leave base as '/'
const base = process.env.GITHUB_PAGES === 'true' ? '/mega-service-group-landing/' : '/';

export default defineConfig({
  plugins,
  base,
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  publicDir: path.resolve(import.meta.dirname, "client", "public"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
  },
  server: {
    host: true,
  },
});
