import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';

export default defineConfig({
    plugins: [
        vue(),
        dts({
            entryRoot: 'src',
            outDir: 'dist',
            insertTypesEntry: true,
        }),
    ],
    build: {
        cssCodeSplit: false,
        emptyOutDir: false,
        lib: {
            entry: resolve(import.meta.dirname, 'src/index.ts'),
            name: 'DesignSystemVue',
            fileName: (format) => `design-system-vue.${format}.js`,
            cssFileName: 'style',
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                exports: 'named',
                globals: {
                    vue: 'Vue',
                },
            },
        },
    },
});
