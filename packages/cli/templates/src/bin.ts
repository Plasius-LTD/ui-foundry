#!/usr/bin/env node

import { Command } from "commander";
import path from "node:path";
import packageJson from "../package.json" with { type: "json" };

type WritableLike = Pick<NodeJS.WriteStream, "write">;

export const builtInTemplates: readonly string[] = [];

function configureOutput(program: Command, stdout: WritableLike, stderr: WritableLike) {
  program.configureOutput({
    writeOut: (message) => {
      stdout.write(message);
    },
    writeErr: (message) => {
      stderr.write(message);
    },
  });
}

export function createProgram(
  stdout: WritableLike = process.stdout,
  stderr: WritableLike = process.stderr
) {
  const program = new Command();
  configureOutput(program, stdout, stderr);

  program
    .name("ui-foundry")
    .description("Inspect the published UI Foundry package surfaces.")
    .version(packageJson.version)
    .showHelpAfterError("(run with --help for usage)");

  program
    .command("list-templates")
    .description("List bundled starter templates shipped with this package.")
    .action(() => {
      stdout.write(formatTemplateList());
    });

  return program;
}

export async function run(
  argv: readonly string[],
  stdout: WritableLike = process.stdout,
  stderr: WritableLike = process.stderr
) {
  const program = createProgram(stdout, stderr);
  program.exitOverride();

  if (argv.length === 0) {
    program.outputHelp();
    return 0;
  }

  try {
    await program.parseAsync([...argv], { from: "user" });
    return 0;
  } catch (error) {
    if (isCommanderExit(error)) {
      return normalizeCommanderExitCode(error);
    }
    throw error;
  }
}

export function formatTemplateList(templates: readonly string[] = builtInTemplates) {
  if (templates.length === 0) {
    return "No bundled templates are published in this release.\n";
  }

  return `${templates.join("\n")}\n`;
}

export function isCommanderExit(error: unknown): error is { code?: string; exitCode?: number } {
  return typeof error === "object" && error !== null && ("code" in error || "exitCode" in error);
}

export function normalizeCommanderExitCode(error: { code?: string; exitCode?: number }) {
  if (error.code === "commander.help" || error.code === "commander.helpDisplayed") {
    return 0;
  }

  return typeof error.exitCode === "number" ? error.exitCode : 1;
}

export function isDirectExecution(argv1: string | undefined = process.argv[1]) {
  if (typeof argv1 !== "string" || argv1.length === 0) {
    return false;
  }

  const basename = path.basename(argv1);
  return (
    basename === "ui-foundry" ||
    basename === "bin.ts" ||
    basename === "bin.js" ||
    basename === "bin.cjs"
  );
}

export function startCli(
  argv: readonly string[] = process.argv.slice(2),
  argv1: string | undefined = process.argv[1],
  stdout: WritableLike = process.stdout,
  stderr: WritableLike = process.stderr,
  assignExitCode: (code: number) => void = (code) => {
    process.exitCode = code;
  }
) {
  if (!isDirectExecution(argv1)) {
    return false;
  }

  void run(argv, stdout, stderr)
    .then((exitCode) => {
      assignExitCode(exitCode);
    })
    .catch((error: unknown) => {
      const message =
        error instanceof Error && error.message.length > 0
          ? error.message
          : "ui-foundry failed with an unknown error";
      stderr.write(`${message}\n`);
      assignExitCode(1);
    });

  return true;
}

startCli();
