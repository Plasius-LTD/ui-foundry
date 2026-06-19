import { describe, expect, it } from "vitest";

import {
  builtInTemplates,
  formatTemplateList,
  isDirectExecution,
  run,
  startCli,
} from "./bin.js";

function createWritableSink() {
  let buffer = "";

  return {
    stream: {
      write(chunk: string | Uint8Array) {
        buffer += String(chunk);
        return true;
      },
    },
    read() {
      return buffer;
    },
  };
}

describe("ui-foundry CLI", () => {
  it("prints help when run without arguments", async () => {
    const stdout = createWritableSink();
    const stderr = createWritableSink();

    const exitCode = await run([], stdout.stream, stderr.stream);

    expect(exitCode).toBe(0);
    expect(stdout.read()).toContain("Usage: ui-foundry");
    expect(stderr.read()).toBe("");
  });

  it("reports the current built-in template inventory", async () => {
    const stdout = createWritableSink();
    const stderr = createWritableSink();

    const exitCode = await run(["list-templates"], stdout.stream, stderr.stream);

    expect(exitCode).toBe(0);
    if (builtInTemplates.length === 0) {
      expect(stdout.read()).toContain("No bundled templates are published");
    } else {
      expect(stdout.read()).toContain(builtInTemplates[0]);
    }
    expect(stderr.read()).toBe("");
  });

  it("formats template output for a non-empty template inventory", () => {
    expect(formatTemplateList(["starter-app", "dashboard-shell"])).toBe(
      "starter-app\ndashboard-shell\n"
    );
  });

  it("returns a non-zero exit code for invalid arguments", async () => {
    const stdout = createWritableSink();
    const stderr = createWritableSink();

    const exitCode = await run(["--not-a-real-flag"], stdout.stream, stderr.stream);

    expect(exitCode).toBe(1);
    expect(stderr.read()).toContain("unknown option");
  });

  it("identifies supported direct-execution entrypoints", () => {
    expect(isDirectExecution(undefined)).toBe(false);
    expect(isDirectExecution("")).toBe(false);
    expect(isDirectExecution("/tmp/ui-foundry")).toBe(true);
    expect(isDirectExecution("/tmp/bin.cjs")).toBe(true);
    expect(isDirectExecution("/tmp/vitest")).toBe(false);
  });

  it("starts the CLI only when the current process looks like the published entrypoint", async () => {
    const stdout = createWritableSink();
    const stderr = createWritableSink();
    let observedExitCode: number | null = null;

    const started = startCli(
      ["list-templates"],
      "/tmp/bin.cjs",
      stdout.stream,
      stderr.stream,
      (code) => {
        observedExitCode = code;
      }
    );

    expect(started).toBe(true);
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(observedExitCode).toBe(0);
    expect(stdout.read()).toContain("No bundled templates are published");
    expect(stderr.read()).toBe("");
  });

  it("does not start the CLI for non-entrypoint processes", () => {
    const stdout = createWritableSink();
    const stderr = createWritableSink();

    const started = startCli([], "/tmp/vitest", stdout.stream, stderr.stream);

    expect(started).toBe(false);
    expect(stdout.read()).toBe("");
    expect(stderr.read()).toBe("");
  });

  it("uses the default process.exitCode assignment when started directly", async () => {
    const stdout = createWritableSink();
    const stderr = createWritableSink();
    const previousExitCode = process.exitCode;

    process.exitCode = undefined;
    const started = startCli(["list-templates"], "/tmp/bin.cjs", stdout.stream, stderr.stream);

    expect(started).toBe(true);
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(process.exitCode).toBe(0);
    process.exitCode = previousExitCode;
  });

  it("reports unexpected Error failures when started directly", async () => {
    const stderr = createWritableSink();
    let observedExitCode: number | null = null;

    const started = startCli(
      ["list-templates"],
      "/tmp/bin.cjs",
      {
        write() {
          throw new Error("write failed");
        },
      },
      stderr.stream,
      (code) => {
        observedExitCode = code;
      }
    );

    expect(started).toBe(true);
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(observedExitCode).toBe(1);
    expect(stderr.read()).toContain("write failed");
  });

  it("falls back to the generic failure message for non-Error throws", async () => {
    const stderr = createWritableSink();
    let observedExitCode: number | null = null;

    const started = startCli(
      ["list-templates"],
      "/tmp/bin.cjs",
      {
        write() {
          throw "broken";
        },
      },
      stderr.stream,
      (code) => {
        observedExitCode = code;
      }
    );

    expect(started).toBe(true);
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(observedExitCode).toBe(1);
    expect(stderr.read()).toContain("ui-foundry failed with an unknown error");
  });
});
