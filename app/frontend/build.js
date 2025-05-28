// Custom build script to work around Vite/Rollup issues
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Starting custom build process...');

// Create a temporary vite.config.js that explicitly handles external dependencies
const tempViteConfig = `
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['react-router-dom', '@react-oauth/google'],
      output: {
        globals: {
          'react-router-dom': 'ReactRouterDOM',
          '@react-oauth/google': 'ReactOAuthGoogle'
        }
      }
    }
  }
});
`;

// Backup the original vite.config.js
if (fs.existsSync('vite.config.js')) {
  console.log('Backing up original vite.config.js...');
  fs.copyFileSync('vite.config.js', 'vite.config.js.bak');
}

// Write the temporary config
console.log('Writing temporary vite.config.js...');
fs.writeFileSync('vite.config.js', tempViteConfig);

try {
  // Run the build
  console.log('Running vite build...');
  execSync('npx vite build', { stdio: 'inherit' });
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
} finally {
  // Restore the original config
  if (fs.existsSync('vite.config.js.bak')) {
    console.log('Restoring original vite.config.js...');
    fs.copyFileSync('vite.config.js.bak', 'vite.config.js');
    fs.unlinkSync('vite.config.js.bak');
  }
}
