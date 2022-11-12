import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import typescript from 'rollup-plugin-typescript2';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
  typescript({
    check: false,
    include: ["src/components/**/*.vue"],
    tsconfig: "tsconfig.json",
    exclude: [
      "vite.config.ts"
    ]
  }),
  ],
  build: {
    cssCodeSplit: false,
    lib: {
      entry: "./src/index.ts",
      formats: ["es", "cjs"],
      name: "Monsetra Vue",
      fileName: format => `monsetra-vue.${format}.js`
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
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});