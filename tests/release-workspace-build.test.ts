import { spawnSync } from "node:child_process";
import {
  chmodSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { describe, expect, it } from "vitest";

const workflow = readFileSync(resolve(".github/workflows/cd.yml"), "utf8");
const step = workflow
  .split("      - name: Run package validation\n")[1]
  ?.split("\n      - name:")[0];
const script = step
  ?.split("        run: |\n")[1]
  ?.split("\n")
  .map((line) => line.replace(/^ {10}/u, ""))
  .join("\n");
const packageDirectory = "packages/integrations/analytics-appinsights";

function validate(build = true, tests = true, failBuild = false) {
  if (!script) throw new Error("Release validation shell block is missing");
  const directory = mkdtempSync(join(tmpdir(), "ui-release-order-"));
  try {
    mkdirSync(join(directory, packageDirectory), { recursive: true });
    mkdirSync(join(directory, "bin"));
    writeFileSync(
      join(directory, packageDirectory, "package.json"),
      JSON.stringify({
        scripts: { build: "build", test: "test", "pack:check": "pack" },
      }),
    );
    const npm = join(directory, "bin/npm");
    writeFileSync(
      npm,
      `#!/bin/sh
set -eu
printf '%s\\n' "$*" >> "$COMMAND_LOG"
if [ "$*" = "run build" ]; then
  if [ "$FAIL_BUILD" = "true" ]; then exit 42; fi
  touch "$CORE_TYPES"
fi
if [ "$*" = "--prefix ${packageDirectory} run build" ] && [ ! -f "$CORE_TYPES" ]; then
  echo "Core workspace type declarations are missing" >&2
  exit 43
fi
`,
    );
    chmodSync(npm, 0o755);
    const log = join(directory, "commands.log");
    const result = spawnSync("bash", ["-c", script], {
      cwd: directory,
      encoding: "utf8",
      env: {
        ...process.env,
        PATH: `${join(directory, "bin")}:${process.env.PATH}`,
        PACKAGE_DIR: packageDirectory,
        RUN_BUILD: String(build),
        RUN_TESTS: String(tests),
        FAIL_BUILD: String(failBuild),
        CORE_TYPES: join(directory, "core-built"),
        COMMAND_LOG: log,
      },
    });
    return {
      status: result.status,
      commands: existsSync(log)
        ? readFileSync(log, "utf8").trim().split("\n")
        : [],
      error: result.stderr,
    };
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
}

describe("clean workspace release validation", () => {
  it("builds the workspace dependency graph before validating a selected consumer", () => {
    const result = validate();
    expect(result.status, result.error).toBe(0);
    expect(result.commands[0]).toBe("run build");
    expect(result.commands).toContain(`--prefix ${packageDirectory} run test`);
    expect(result.commands.at(-1)).toBe(
      `--prefix ${packageDirectory} run pack:check`,
    );
  });

  it("fails closed before tests or packing when the dependency graph build fails", () => {
    const result = validate(true, true, true);
    expect(result.status).toBe(42);
    expect(result.commands).toEqual(["run build"]);
  });

  it("preserves the existing build and test input controls", () => {
    const result = validate(false, false);
    expect(result.status).toBe(0);
    expect(result.commands).toEqual([
      `--prefix ${packageDirectory} run pack:check`,
    ]);
  });
});
