import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';
import AutoImport from 'unplugin-auto-import/vite'
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const wrapI18nPlugin = require('./babel-plugin-wrap-i18n.cjs');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [wrapI18nPlugin]
      }
    }),
    // visualizer({open: true}),
    viteCompression({
      verbose: true, // 是否在控制台输出压缩结果
      disable: false, // 是否禁用
      threshold: 10240, // 仅压缩大于 10kb 的文件
      algorithm: 'gzip', // 或 'brotliCompress'
      ext: '.gz', // 输出文件后缀（.gz 或 .br）
      filter: /\.(js|mjs|json|css|html)$/i, // 要压缩的文件类型
    }),
    AutoImport({
      imports: [
        'react',              // 自动引入 useState, useEffect 等
        'react-router-dom',   // 自动引入 useNavigate, useParams 等
      ],
      dts: 'src/auto-imports.d.ts', // 自动生成 TypeScript 类型提示
      eslintrc: {
        enabled: true,               // 自动为 ESLint 生成规则
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true,
      },
    })
  ],
  resolve: {
    alias: {
      '@': '/src',
      '@global': '/src/global',
      '@i18n': '/src/i18n.js'
    }
  },
  build: {
    rollupOptions: { // 自定义底层的 Rollup 打包配置
      output: {
        chunkFileNames: 'js/[name]-[hash].js', // 打包后的文件名称
        entryFileNames: 'js/[name]-[hash].js', // 打包后的入口文件名称
  
        // 对打包出来的资源文件进行分类，分别放到不同的文件夹内
       assetFileNames(assetsInfo) {
          //  css样式文件
          if (assetsInfo.name?.endsWith(".css")) {
            return "css/[name]-[hash].css";
          }
          //  字体文件
          const fontExts = [".ttf", ".otf", ".woff", ".woff2", ".eot"];
          if (fontExts.some((ext) => assetsInfo.name?.endsWith(ext))) {
            return "font/[name]-[hash].[ext]";
          }
  
          //  图片文件
          const imgExts = [".png", ".jpg", ".jpeg", ".webp", ".gif", ".icon"];
          if (imgExts.some((ext) => assetsInfo.name?.endsWith(ext))) {
            return "img/[name]-[hash].[ext]";
          }
  
          //  SVG类型的图片文件
          const imgSvg = [".svg",];
          if (imgSvg.some((ext) => assetsInfo.name?.endsWith(ext))) {  
            return "assest/icons/[name].[ext]";
          }
  
          //  视频文件
          const videoExts = [".mp4", ".avi", ".wmv", ".ram", ".mpg", "mpeg"];
          if (videoExts.some((ext) => assetsInfo.name?.endsWith(ext))) {
            return "video/[name]-[hash].[ext]";
          }
          //  其它文件: 保存在 assets/图片名-哈希值.扩展名  
          return "assets/[name]-[hash].[ext]";
        },
        // 打包的文件进行拆包处理/静态资源分拆打包
        manualChunks:(id)=>{
          // 这个ID，就是所有文件的绝对路径
          if(id.includes("node_modules")){
            // 因为 node_modules 中的依赖通常是不会改变的
            // 所以直接单独打包出去
            // 这个return 的值就是打包的名称
            return "vendor";
          }
       },
    },
  }
  }
})
