import { defineConfig } from 'vite'

export default defineConfig({
  base: '/test/',  // GitHub Pages에서 사용할 경로
  build: {
    outDir: 'dist',  // 빌드 결과물 디렉토리
  },
});