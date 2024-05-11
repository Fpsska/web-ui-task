/* eslint-disable no-undef */
import { defineConfig } from 'vite';
import { ViteMinifyPlugin } from 'vite-plugin-minify';
import { resolve } from 'path';

// /. imports

const isProductionMode = process.env.NODE_ENV === 'production';

export default defineConfig({
    base: isProductionMode ? '/web-ui-task' : '/',
    server: {
        port: '3000'
    },
    build: {
        outDir: './build',
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                products: resolve(__dirname, 'assets/pages/products.html'),
                failed_payment: resolve(
                    __dirname,
                    'assets/pages/failed_payment.html'
                ),
                successful_payment: resolve(
                    __dirname,
                    'assets/pages/successful_payment.html'
                )
            },
            output: {
                assetFileNames: ({ name }) => {
                    if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')) {
                        return 'assets/images/[name]-[hash][extname]';
                    }

                    if (/\.(ttf|woff|woff2|eot)$/.test(name ?? '')) {
                        return 'assets/fonts/[name]-[hash][extname]';
                    }

                    if (/\.css$/.test(name ?? '')) {
                        return 'assets/css/[name]-[hash][extname]';
                    }

                    return 'assets/[name]-[hash][extname]';
                }
            }
        }
    },
    plugins: [ViteMinifyPlugin({})]
});
