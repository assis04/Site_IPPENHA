import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { wpDevProxyPlugin } from "./scripts/wp-dev-proxy-plugin.js";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [wpDevProxyPlugin(env.VITE_WP_PROXY_TARGET), react(), tailwindcss()],
  };
});
