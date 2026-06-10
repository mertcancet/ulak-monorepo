import { reactRouter } from '@react-router/dev/vite';
import { defineConfig } from 'vite';

export default defineConfig((config) => ({
  plugins: [reactRouter()],
  resolve:
    config.command === 'build'
      ? {
          alias: {
            'react-dom/server': 'react-dom/server.node',
          },
        }
      : undefined,
}));
