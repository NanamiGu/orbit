import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
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
              id.includes("scheduler")
            ) {
              return "react-vendor";
            }
            // فصل مكتبة الأيقونات
            if (id.includes("lucide-react")) {
              return "lucide";
            }
          }
        },
      },
    },
  },
});