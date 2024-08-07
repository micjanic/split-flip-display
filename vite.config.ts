import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'

export default defineConfig({
    server: {
        port: 3000,
    },
    preview: {
        port: 8080,
    },
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/App.tsx'),
            name: '@micjanic/split-flap-display',
            fileName: (format) => `split-flap-display.${format}.js`,
        },
        rollupOptions: {
            external: [
                'react',
                'react-dom',
                '@pixi/react',
                'pixi.js',
                'tailwindcss',
            ],
            output: {
                globals: {
                    react: 'React',
                    '@pixi/react': 'PIXIReact',
                    'pixi.js': 'PIXI',
                },
            },
        },
        outDir: 'dist',
        sourcemap: true,
    },
    plugins: [react()],
    css: {
        postcss: {
            plugins: [tailwindcss()],
        },
    },
})
