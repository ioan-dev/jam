// vite.config.js
import {defineConfig} from 'vite';
import path from 'path';

export default defineConfig({
    base: '/starter/',
    css: {
        devSourcemap: true
    },
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: path.resolve(__dirname, './index.html'),
                about: path.resolve(__dirname, './about.html'),
                projects: path.resolve(__dirname, './projects.html'),
                combar: path.resolve(__dirname, './c-bar.html'),
                // Добавьте другие страницы по аналогии
            }
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    }
});