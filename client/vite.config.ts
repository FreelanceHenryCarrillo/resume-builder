import path, { resolve } from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dotenv from "dotenv";

const envFile = `./environment/.env.${
  process.env.VITE_NODE_ENV || "development"
}`;

dotenv.config({ path: resolve(__dirname, envFile) });

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    "process.env": process.env,
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
});
