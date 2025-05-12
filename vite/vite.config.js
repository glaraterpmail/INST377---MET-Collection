import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  root: 'src', // Set the root directory to match your project structure
  plugins: [vue()],
  server: {
    port: 3001, // Change to the new port
    strictPort: true, // Prevent automatic port switching
    host: '127.0.0.1'
  },
  build: {
    outDir: '../dist', // Ensures build output is outside "src"
    emptyOutDir: true, // Clears previous builds
  }
});
