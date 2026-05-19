import React from "react";
import { FoundryButton, FoundryStack } from "../../components/src/index.ts";

export function App() {
  return React.createElement(
    "main",
    {
      style: {
        maxWidth: 860,
        margin: "0 auto",
        padding: "2rem 1rem",
      },
    },
    React.createElement("h1", { style: { marginTop: 0 } }, "UI Foundry Docs"),
    React.createElement(
      "p",
      { style: { color: "#395069" } },
      "Fallback docs renderer (Vite) used when Ladle is unavailable."
    ),
    React.createElement(
      FoundryStack,
      { direction: "row", gap: 8 },
      React.createElement(FoundryButton, { label: "Neutral", tone: "neutral" }),
      React.createElement(FoundryButton, { label: "Primary", tone: "primary" }),
      React.createElement(FoundryButton, { label: "Danger", tone: "danger" })
    )
  );
}
