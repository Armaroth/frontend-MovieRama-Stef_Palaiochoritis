import { defineConfig } from "vite";

export default defineConfig({
  esbuild: {
    target: "es2022", // Ensure ES2022 or newer
  },
  build: {
    target: "es2022", // Targets modern browsers supporting top-level await
  },
});
