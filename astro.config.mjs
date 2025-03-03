import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import linaria from '@linaria/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  output: 'static',
  build: {
    assets: '_astro'
  },
  vite: {
    plugins: [
      linaria()
    ]
  }
});
