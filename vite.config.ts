import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        custom: path.resolve(__dirname, 'public/assets/js/custom.js')
      },
      output: {
        assetFileNames: (assetInfo) => {
          // Remove 'public/' prefix if it exists
          const normalizedName = assetInfo.name.replace('public/', '');
          
          // Specifically handle custom.js
          if (normalizedName.includes('custom.js')) {
            return 'assets/js/custom.js';
          }
          
          // Get the file extension
          const extType = normalizedName.split('.').at(1);
          
          // Handle images
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            // If it's already in an images directory, maintain the path
            if (normalizedName.includes('images/')) {
              return normalizedName;
            }
            return `assets/images/${path.basename(normalizedName)}`;
          }
          
          // Handle CSS files
          if (extType === 'css') {
            if (normalizedName.includes('css/')) {
              return normalizedName;
            }
            return `assets/css/[name]-[hash][extname]`;
          }
          
          // Handle JS files
          if (extType === 'js') {
            if (normalizedName.includes('js/')) {
              return normalizedName;
            }
            return `assets/js/[name]-[hash][extname]`;
          }
          
          // Handle other assets
          return `assets/${path.basename(normalizedName)}`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js'
      }
    }
  },
  base: './',
  publicDir: 'public',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './public/assets')
    }
  }
});