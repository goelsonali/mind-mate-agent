import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Re-enable content hashing for cache busting
    ssr: false,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        // Use build timestamp or content hash for cache busting
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    }
  },
  // Ensure proper resolution of dependencies
  resolve: {
    dedupe: ['react', 'react-dom', 'react-router-dom']
  }
})