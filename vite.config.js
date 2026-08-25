import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/app.jsx'],
            refresh: true,
        }),
        react(),
    ],

    resolve: {
        alias: {
            '@': path.resolve(__dirname, './resources/js'),
        },
    },

    server: {
        host: process.env.VITE_DEV_SERVER_HOST || '0.0.0.0',
        port: 5173,
        strictPort: true,

        watch: {
            usePolling: true,
            interval: 300,
        },

        hmr: {
            host: process.env.VITE_HMR_HOST || 'localhost',
            port: Number(process.env.VITE_HMR_PORT || 5173),
            clientPort: Number(process.env.VITE_HMR_CLIENT_PORT || 5173),
        },
    },
})
