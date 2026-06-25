import { resolve } from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
  resolve: {
    alias: {
      // Match the tsconfig path alias "~/*" -> "./src/*"
      "~": resolve(__dirname, "./src"),
    },
  },
});
