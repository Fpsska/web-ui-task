/* eslint-disable no-undef */
import { defineConfig, loadEnv } from 'vite';
import { ViteMinifyPlugin } from 'vite-plugin-minify';
import { resolve } from 'path';

// /. imports

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    const isProductionMode = env.VITE_APP_MODE === 'production';
    return {
        define: {
            __APP_ENV__: JSON.stringify(env.APP_ENV)
        },
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
        preview: {
            outDir: './build'
        },
        plugins: [isProductionMode ? ViteMinifyPlugin({}) : undefined]
    };
});
