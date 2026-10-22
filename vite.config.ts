import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // './' ทำให้ deploy ไว้ใน sub-path ได้ (เช่น GitHub Pages)
  base: './',
  plugins: [vue(), tailwindcss()],
})
