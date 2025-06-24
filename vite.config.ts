import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    tsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tailwindcss(),
    tanstackStart({
      // target: 'cloudflarePagesStatic',
      spa: {
        prerender: {
          outputPath: './404.html',
          crawlLinks: true,
          retryCount: 3,
        },
      },
    }),
  ],
});
