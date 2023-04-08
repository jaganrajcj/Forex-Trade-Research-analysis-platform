import { defineConfig } from 'vite'
import postcss from './postcss.config.js'
import react from '@vitejs/plugin-react'
import path from 'path'


// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': process.env
  },
  css: {
    postcss,
  },
  plugins: [react()],
  resolve: {
    alias:
    {
      '@': path.resolve(__dirname, './src'),
    }

  },
  server: {
    port: 5174,
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    }
  }
})
