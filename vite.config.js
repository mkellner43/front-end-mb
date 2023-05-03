import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({mode}) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())}
  return {
    build: {
      outDir: 'build',
    },
    plugins: [react()],
    server: {
      port: parseInt(process.env.VITE_PORT)
    }
  };
});