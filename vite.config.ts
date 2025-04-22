// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  build: {
    outDir: 'dist', // 🔸 Firebase tomará este folder para servir el sitio
    sourcemap: false,
    emptyOutDir: true,
  },
  base: '/', // Muy importante para rutas relativas al deploy
});
