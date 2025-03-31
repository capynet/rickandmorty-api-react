import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './')
    },
  },
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