import type { UserConfig } from "@commitlint/types";

const commitConfig: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "build",
        "chore",
        "ci",
        "docs",
        "feat",
        "fix",
        "perf",
        "refactor",
        "revert",
        "style",
        "test",
        "rename",
        "install",
      ],
    ],
  },
};

export default commitConfig;
