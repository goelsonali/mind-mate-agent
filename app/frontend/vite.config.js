import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Ensure proper dependency resolution
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true
    },
    // Improve compatibility with different environments
    target: 'es2015',
    // Ensure proper handling of dependencies
    rollupOptions: {
      // Explicitly mark problematic packages as external
      external: [],
      output: {
        // Improve code splitting
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        }
      }
    }
  },
  // Ensure proper resolution of dependencies
  resolve: {
    dedupe: ['react', 'react-dom', 'react-router-dom']
  }
})
