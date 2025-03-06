import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    coverage: {
      enabled: true,
      include: [
        "src",
      ],
      extension: [
        ".ts",
        ".tsx",
      ],
    },
  },
})
