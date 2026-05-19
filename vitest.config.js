import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
    include: [
      "tests/**/*.test.{ts,tsx}",
      "packages/**/src/**/*.test.{ts,tsx}",
    ],
    passWithNoTests: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov"],
      reportsDirectory: "./coverage",
      include: [
        "packages/core/src/**/*.ts",
        "packages/core/src/**/*.tsx",
        "packages/components/src/**/*.ts",
        "packages/components/src/**/*.tsx",
        "packages/integrations/analytics-appinsights/src/**/*.ts",
      ],
      thresholds: {
        lines: 85,
        functions: 85,
        branches: 85,
        statements: 85,
      },
      exclude: [
        "tests/**",
        "dist/**",
        "**/*.test.{ts,tsx}",
        "**/*.config.{js,ts}",
        "**/.eslintrc.{js,cjs}",
      ],
    },
  },
});
