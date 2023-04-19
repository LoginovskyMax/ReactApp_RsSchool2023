/// <reference types="vitest" />
/// <reference types="jest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import istanbul from 'vite-plugin-istanbul';

export default defineConfig({
  plugins: [
    react(),
    istanbul({
      cypress: true,
      requireEnv: false,
    }),
  ],
  base:'/ReactApp_RsSchool2023',
  server: {
    open: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    watch:false,
    coverage: {
      provider: 'c8',
      reporter: ['text'],
    },
  }
});
