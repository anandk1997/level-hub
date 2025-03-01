import path from 'path';
import checker from 'vite-plugin-checker';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { configDotenv } from 'dotenv';
import tailwindcss from '@tailwindcss/vite';

configDotenv();

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    checker({
      typescript: true,
      overlay: {
        position: 'tl',
        initialIsOpen: false,
      },
    }),
  ],

  define: {
    'process.env': process.env,
  },

  resolve: {
    alias: [
      {
        find: /^~(.+)/,
        replacement: path.join(process.cwd(), 'node_modules/$1'),
      },
      {
        find: /^src(.+)/,
        replacement: path.join(process.cwd(), 'src/$1'),
      },
    ],
  },

  server: { port: 3000, host: true },
  preview: { port: 3000, host: true },
});
