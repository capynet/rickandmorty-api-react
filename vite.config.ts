import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
  ],
  build: {
    sourcemap: process.env.VITE_SOURCEMAP === 'true',
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'urql-vendor': ['urql', 'graphql']
        }
      }
    }
  }
})