import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        // host: '192.168.10.14',
        // port: '80'
        // host: '192.168.1.7',
        // port: '80'
        host: 'localhost',
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
})
