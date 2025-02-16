import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"


export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: '0.0.0.0',  // Biar bisa diakses dari luar container
    port: 5173,
    watch: {
      usePolling: true,  // Biar Vite deteksi perubahan file dengan polling
    },
    strictPort: true,
  }
})