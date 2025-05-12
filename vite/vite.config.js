import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default {
  server: {
    port: 3001, // Change to the new port
    strictPort: true, // Prevent automatic port switching
    host: '127.0.0.1'
  }
};
