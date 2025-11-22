/** WARNING: DON'T EDIT THIS FILE */
/** WARNING: DON'T EDIT THIS FILE */
/** WARNING: DON'T EDIT THIS FILE */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  base: './',  // 新增这行！设置静态资源相对路径
  build: {
    outDir: 'dist',  // 明确输出目录为 dist（默认也是，但写出来更稳妥）
  },
});