import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/Calendar/', // Replace 'your-repo-name' with the actual name of your repo
});