import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import dts from "vite-plugin-dts"
import libCss from "vite-plugin-libcss"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      // entryRoot: "src/package",
      // outDir: "./dist",
      // include: "./src",
      rollupTypes: true,
    }),
    libCss(),
  ],
  build: {
    outDir: "dist",
    target: "es2020",
    cssCodeSplit: true,
    lib: {
      entry: "src/package/ScrollNumber.ts",
      name: "react-scroll-number",
      fileName: "react-scroll-number",
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDom",
        },
      },
    },
  },
})
