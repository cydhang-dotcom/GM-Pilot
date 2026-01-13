import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    // Using '.' instead of process.cwd() to resolve type error on Process object
    const env = loadEnv(mode, '.', '');
    return {
      base: '/GMP',
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          // Using path.resolve with relative path as __dirname is not available in ESM context
          '@': path.resolve('./src'),
        }
      }
    };
});
