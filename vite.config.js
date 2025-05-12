import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  root: path.resolve(__dirname, 'vite'), // Absolute path to root directory
  plugins: [vue()],
  server: {
    port: 3001, // Maintain port configuration
    strictPort: true, // Prevent automatic port switching
    host: '127.0.0.1'
  },
  build: {
    outDir: path.resolve(__dirname, 'vite/build'), // Absolute path for build output
    emptyOutDir: true, // Clears previous builds
    rollupOptions: {
      input: path.resolve(__dirname, 'vite/index.html')
    }
  }
});
