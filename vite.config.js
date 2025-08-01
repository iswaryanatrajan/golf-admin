import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
   server: {
    // optional for dev
    historyApiFallback: true,
  },
  build: {
    outDir: 'dist',
  },
})
