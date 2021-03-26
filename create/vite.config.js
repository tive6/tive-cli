import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'


// https://vitejs.dev/config/
export default defineConfig({
  root: process.cwd(),
  base: '/',
  // mode: process.env.NODE_ENV,
  publicDir: 'public',
  plugins: [
      vue(),
  ],
  resolve: {
    alias: [],
  },
  server: {
    port: '8090',
    strictPort: false,
    open: false,
    cors: true,
    proxy: {
      // 字符串简写写法
      '/foo': 'http://localhost:4567/foo',
      // 选项写法
      '/api': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      // 正则表达式写法
      '^/fallback/.*': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/fallback/, '')
      },
    },
  },
  build: {
    target: 'modules',
    outDir: 'dist',
    assetsDir: 'assets',
    assetsInlineLimit: 4096, // 4kb
    cssCodeSplit: true,
    sourcemap: false,
    manifest: true, // 生成 manifest.json
    minify: 'terser',
    emptyOutDir: true,
    brotliSize: true,
    chunkSizeWarningLimit: 500,
  },
  optimizeDeps: {
    include: [
      "vue",
      // "vuex",
      // "vue-router",
      // "vant",
      // "axios",
    ],
  },
})
