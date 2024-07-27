import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import svgrPlugin from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "build",
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: "globalThis",
      },
    },
  },
  plugins: [react(), viteTsconfigPaths(), svgrPlugin()],
});

/*
* (0, vite_plugin_svgr_1.default)()  -> removed from vite.config.js (compiled) to solve "TypeError: (0 , vite_plugin_svgr_1.default) is not a function" Error
* Error result
* -> Vite server start error
* -> Project build Error
*/
