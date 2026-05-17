import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// When deploying to GitHub Pages the app is served from /<repo-name>/.
// Set VITE_BASE_PATH as a GitHub Actions secret/variable (e.g. /portfolio/)
// or it defaults to '/' for local dev and custom-domain deploys.
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH ?? '/',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
