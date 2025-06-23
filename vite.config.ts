import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  build: {
    outDir: '.output/public',
    manifest: true,
  },
  server: {
    port: 3000,
  },
  preview: {
    strictPort: true,
  },
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
    VitePWA({
      buildBase: '.output/public',
      injectRegister: 'auto',
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      // PWA Web Manifest 的内容
      manifest: {
        name: 'TanStack SSG App',
        short_name: 'TanStackApp',
        description: 'An awesome app built with TanStack Router and Vite.',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'android-chrome-192x192.png', // 确保这些图标在 public 目录下
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'android-chrome-512x512.png', // 确保这些图标在 public 目录下
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
});
