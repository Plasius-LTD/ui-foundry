import { spawn } from "node:child_process";

function run(command, args) {
  return new Promise((resolve) => {
    const child = spawn(command, args, {
      stdio: "inherit",
      env: {
        ...process.env,
      },
    });

    child.on("error", (error) => {
      resolve({ code: 1, error });
    });

    child.on("close", (code) => {
      resolve({ code: code ?? 1, error: null });
    });
  });
}

export async function runDocsTool(mode) {
  const ladleArg =
    mode === "dev" ? "serve" : mode === "preview" ? "preview" : "build";

  const ladleRun = await run("ladle", [ladleArg]);
  if (ladleRun.code === 0) {
    return;
  }

  if (ladleRun.error && ladleRun.error.code !== "ENOENT") {
    process.exitCode = ladleRun.code;
    return;
  }

  console.warn(
    `[docs] Ladle is not installed. Falling back to Vite ${mode} mode.`
  );

  const viteArgs = [mode];
  const viteRun = await run("vite", viteArgs);
  if (viteRun.code !== 0) {
    process.exitCode = viteRun.code;
  }
}
