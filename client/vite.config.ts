// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: './',
  resolve: {
    alias: {
      // @ 기호를 src 폴더 경로로 매핑합니다.
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // ... 기타 설정
});