import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    setupFiles: [
      "tests/fixtures/setup-mocks.ts",
    ],
    // https://vitest.dev/guide/coverage
    coverage: {
      enabled: true,
      include: [
        "src",
      ],
      exclude: [
        "src/lib/__mocks__",
      ],
      extension: [
        ".ts",
        ".tsx",
      ],
    },
  },
})
