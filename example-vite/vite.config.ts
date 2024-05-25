import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "worker.modules": path.resolve(__dirname, "src/worker.modules.ts"),
    },
  },
  optimizeDeps: {
    exclude: ["webworker-redux-connected"],
  },
});
