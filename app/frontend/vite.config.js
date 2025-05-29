import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Disable SSR which can cause crypto issues
    ssr: false,
    // Disable content hash to avoid crypto dependency
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        // Disable hash in filenames to avoid crypto dependency
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  },
  // Ensure proper resolution of dependencies
  resolve: {
    dedupe: ['react', 'react-dom', 'react-router-dom']
  }
})
