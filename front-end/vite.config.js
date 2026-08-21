import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            // فصل مكتبات React الأساسية
            if (
              id.includes("react/") ||
              id.includes("react-dom/") ||
              id.includes("react-router") ||
              id.includes("scheduler")
            ) {
              return "react-vendor";
            }
            // فصل مكتبة الأيقونات
            if (id.includes("lucide-react")) {
              return "lucide";
            }
            if (id.includes("framer-motion")) {
              return "motion";
            }
          }
        },
      },
    },
  },
});