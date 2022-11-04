import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { loadEnv } from 'vite';
import Unocss from 'unocss/vite'

// https://vitejs.dev/config/
export default ({ command, mode }) => {
  console.log('mode', mode);

  return defineConfig({
    base: './', /* 这个就是webpack里面的publicPath */
    plugins: [
      vue(),
      Unocss()
    ],
    server: {
      host: '0.0.0.0', /* 指定服务器主机名 */
      port: parseInt(loadEnv(mode, process.cwd()).VITE_APP_PORT), /* 指定服务器端口 */
      strictPort: true, /* 设为 true 时若端口已被占用则会直接退出 */
      // https: true, 
      open: '/', /* 在服务器启动时自动在浏览器中打开应用程序 */
      hmr: {
        overlay: false, /* 为 false 可以禁用服务器错误遮罩层 */
      },
      proxy: {
        // 字符串简写写法
        '/foo': 'http://localhost:4567/foo',
        // 选项写法
        '/api': {
          target: 'http://jsonplaceholder.typicode.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        },
        // 正则表达式写法
        '^/fallback/.*': {
          target: 'http://jsonplaceholder.typicode.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/fallback/, '')
        }
      },
    },
    build: {
      // target: 'es2015', /*  */
      // terserOptions: {
      //   compress: {
      //     defaults: false
      //   }
      // },
      outDir: 'dist', /* 指定输出路径 */
      cssCodeSplit: false, /* 整个项目中的所有 CSS 将被提取到一个 CSS 文件中 */
      chunkSizeWarningLimit: 1500, /* chunk 大小警告的限制（以 kbs 为单位） */
      sourcemap: true, /* 构建后是否生成 source map 文件 */
      manifest: true, /*  */
      assetsDir: 'static/img/', /* 指定生成静态资源的存放路径 */
      emptyOutDir: true, /* 默认情况下，若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录 */
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name].[hash].js',
          entryFileNames: 'static/js/[name].[hash].js',
          assetFileNames: 'static/[ext]/[name].[hash].[ext]',
        },
      }
    }
  })
}
