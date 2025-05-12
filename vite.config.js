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
    emptyOutDir: true, 
    assetsInclude: ['**/*.css', '**/*.js']
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'vite/index.html'),
        browse: path.resolve(__dirname, 'vite/INST377 - MET Browse.html'),
        help: path.resolve(__dirname, 'vite/INST377 - MET Help.html'),
        about: path.resolve(__dirname, 'vite/INST377 - MET About.html'),
      }
    }
  }
});
