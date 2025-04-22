import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  base: '/',  // o './' si usas subcarpeta
  plugins: [
    react(),
    tsconfigPaths(),  // ← así Vite usará los paths de tu tsconfig
  ],
})
