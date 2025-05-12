import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  root: 'vite', // Set root directory based on project structure
  plugins: [vue()],
  server: {
    port: 3001, // Maintain port configuration
    strictPort: true, // Prevent automatic port switching
    host: '127.0.0.1'
  },
  build: {
    outDir: '../dist', // Moves build output outside "vite/"
    emptyOutDir: true, // Clears previous builds
    rollupOptions: {
      input: 'vite/INST377 - MET Home.html' // Replace with actual entry filename
    }
  }
});
