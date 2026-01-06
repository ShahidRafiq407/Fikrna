import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        viteCompression({
            verbose: true,
            disable: false,
            threshold: 10240,
            algorithm: 'gzip',
            ext: '.gz',
            deleteOriginFile: false
        }),
        viteCompression({
            verbose: true,
            disable: false,
            threshold: 10240,
            algorithm: 'brotliCompress',
            ext: '.br',
            deleteOriginFile: false
        })
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src')
        }
    },
    build: {
        minify: 'terser',
        cssCodeSplit: true,
        sourcemap: false,
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
                pure_funcs: ['console.log', 'console.info', 'console.warn'],
                passes: 2,
                dead_code: true,
                unused: true
            },
            mangle: {
                safari10: true,
                toplevel: true
            },
            format: {
                comments: false
            }
        },
        rollupOptions: {
            output: {
                manualChunks: (id) => {
                    // Vendor chunks
                    if (id.includes('node_modules')) {
                        if (id.includes('vue')) {
                            return 'vendor-vue';
                        }
                        return 'vendor';
                    }
                    // Route-based code splitting
                    if (id.includes('src/views/tools/')) {
                        return 'tools';
                    }
                    if (id.includes('src/views/') && !id.includes('Home.vue')) {
                        return 'pages';
                    }
                },
                chunkFileNames: 'assets/js/[name]-[hash].js',
                entryFileNames: 'assets/js/[name]-[hash].js',
                assetFileNames: (assetInfo) => {
                    const info = assetInfo.name.split('.');
                    const ext = info[info.length - 1];
                    if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
                        return `assets/img/[name]-[hash][extname]`;
                    }
                    if (/css/i.test(ext)) {
                        return `assets/css/[name]-[hash][extname]`;
                    }
                    return `assets/[name]-[hash][extname]`;
                }
            }
        },
        chunkSizeWarningLimit: 1000,
        reportCompressedSize: false,
        assetsInlineLimit: 4096
    },
    server: {
        port: 5173,
        host: true
    },
    optimizeDeps: {
        include: ['vue', 'vue-router', 'pinia']
    }
})
