import { defineConfig } from 'vite'
import eslintPlugin from 'vite-plugin-eslint'
import laravel from 'laravel-vite-plugin'
import vue from '@vitejs/plugin-vue'
import basicSsl from '@vitejs/plugin-basic-ssl'

export default defineConfig({
  plugins: [
    eslintPlugin(),
    laravel({
      input: 'resources/js/app.js',
      refresh: true,
    }),
    vue({
      template: {
        transformAssetUrls: {
          base: null,
          includeAbsolute: false,
        },
      },
    }),
    basicSsl(),
  ],
  server: {
    https: true,
    host: true,
    port: 5173,
    origin: 'https://localhost',
    hmr: {
      host: 'localhost',
    },
  },
})
