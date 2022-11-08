import { defineConfig } from 'vite'
import vue from "@vitejs/plugin-vue";
import typescript2 from "rollup-plugin-typescript2";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), typescript2({
    check: false,
    include: ["src/components/**/*.vue"],
    tsconfigOverride: {
      compilerOptions: {
        outDir: "dist",
        sourceMap: true,
        declaration: true,
        declarationMap: true,
      },
    },
    exclude: ["vite.config.ts"]
  })],
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
      }
    }
  }
});