import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  // Served from https://mcameloa.github.io/rock-paper-scissors-lizard-spock/
  base: "/rock-paper-scissors-lizard-spock/",
  plugins: [react(), tailwindcss()],
});
