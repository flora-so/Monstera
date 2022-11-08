import { defineConfig } from 'vite'
import vue from "@vitejs/plugin-vue";
import typescript2 from "rollup-plugin-typescript2";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    cssCodeSplit: false,
    lib: {
      entry: "./src/index.ts",
      formats: ["es", "cjs"],
      name: "MonsetraVue",
      fileName: (format) => `monsetra-vue.${format}.js`
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        exports: "named",
        globals: {
          vue: "Vue"
        }
      },
      plugins: [
        typescript2({
          check: false,
          include: ["src/components/**/*.vue"],
          tsconfig: "tsconfig.json"
        })
      ]
    }
  }
})
