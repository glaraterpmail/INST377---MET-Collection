import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  root: path.resolve(__dirname, 'vite'), // Absolute path to root directory
  plugins: [vue()],
  server: {
    port: 3001, 
    strictPort: true, 
    host: '127.0.0.1'
  },
  build: {
    outDir: path.resolve(__dirname, 'vite/build'), 
    emptyOutDir: true, 
    assetsInclude: ['vite/src/**/*.css', 'vite/src/**/*.js'],
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'vite/index.html'),
        browse: path.resolve(__dirname, 'vite/INST377 - MET Browse.html'),
        help: path.resolve(__dirname, 'vite/INST377 - MET Help.html'),
        about: path.resolve(__dirname, 'vite/INST377 - MET About.html')
      }, // 🛠 **Closing input block correctly**
      output: {
        assetFileNames: 'assets/[name].[ext]' // Organizes built assets in an 'assets' folder
      }
    }
  }
});
