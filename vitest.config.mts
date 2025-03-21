import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

// https://nextjs.org/docs/app/building-your-application/testing/vitest#manual-setup

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    // https://vitest.dev/config/#silent
    silent: true,
    setupFiles: [
      "tests/fixtures/init-vitest.ts",
      "tests/fixtures/setup-mocks.ts",
    ],
    exclude: [
      "./node_modules/**",
      "./e2e/**",
      "./tests-examples/**",
    ],
    // https://vitest.dev/guide/coverage
    coverage: {
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
});
