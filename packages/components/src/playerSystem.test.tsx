import React from "react";
import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";
import {
  FoundryLedger,
  FoundryLog,
  FoundryMccPanel,
  FoundryMissionSummary,
  FoundryPane,
} from "./index";

describe("@plasius/ui-foundry-components player-system primitives", () => {
  it("renders focused pane content with an accessible section label", () => {
    render(
      React.createElement(
        FoundryPane,
        {
          title: "Mission focus",
          description: "World-space mission pane",
          surface: "world-space",
        },
        React.createElement("p", null, "Current objective")
      )
    );

    expect(
      screen.getByRole("heading", { name: "Mission focus" })
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Mission focus")).toHaveTextContent(
      "Current objective"
    );
  });

  it("renders ledger, log, mission, and MCC surfaces for flat validation views", () => {
    render(
      React.createElement(
        "div",
        null,
        React.createElement(FoundryLedger, {
          title: "Ledger",
          entries: [{ label: "PP", value: "120", emphasis: "positive" }],
        }),
        React.createElement(FoundryLog, {
          title: "Recent events",
          entries: [
            {
              id: "1",
              label: "Threat detected",
              detail: "Forest wolf closing from the east",
              severity: "warning",
            },
          ],
        }),
        React.createElement(FoundryMissionSummary, {
          title: "Mission summary",
          objective: "Reach the training grounds",
          status: "active",
          steps: ["Follow the beacon", "Avoid the ravine"],
        }),
        React.createElement(FoundryMccPanel, {
          title: "MCC",
          manaState: "64 / 90",
          focusState: "Stable",
          guidance: "Maintain a measured pace to keep the shell combat-safe.",
          cues: ["Brace before casting", "Use anti-spell guard on contact"],
        })
      )
    );

    expect(screen.getByText("PP")).toBeInTheDocument();
    expect(screen.getByText("Threat detected")).toBeInTheDocument();
    expect(screen.getByText("Reach the training grounds")).toBeInTheDocument();
    expect(screen.getByText("Maintain a measured pace to keep the shell combat-safe.")).toBeInTheDocument();
  });

  it("passes automated accessibility checks for the new player-system primitives", async () => {
    const { container } = render(
      React.createElement(
        "div",
        null,
        React.createElement(FoundryLedger, {
          title: "Ledger",
          surface: "world-space",
          entries: [{ label: "PP", value: "120" }],
        }),
        React.createElement(FoundryMissionSummary, {
          title: "Mission summary",
          objective: "Reach the training grounds",
          status: "active",
        }),
        React.createElement(FoundryMccPanel, {
          title: "MCC",
          manaState: "64 / 90",
          focusState: "Stable",
          guidance: "Use the condensed overlay while combat pressure is high.",
        })
      )
    );

    const result = await axe.run(container);

    expect(result.violations).toHaveLength(0);
  });

  it("covers compact flat-surface branches for optional descriptions, timestamps, and cues", () => {
    render(
      React.createElement(
        "div",
        null,
        React.createElement(
          FoundryPane,
          {
            title: "Compact focus",
            density: "compact",
            ariaLabel: "Compact focus pane",
          },
          React.createElement("span", null, "Minimal content")
        ),
        React.createElement(FoundryLedger, {
          title: "Warnings",
          entries: [{ label: "Threat", value: "High", emphasis: "warning" }],
        }),
        React.createElement(FoundryLog, {
          title: "Scout notes",
          entries: [
            {
              id: "2",
              label: "Route update",
              timestamp: "now",
              severity: "info",
            },
            {
              id: "3",
              label: "Critical block",
              detail: "Bridge collapse ahead",
              severity: "danger",
            },
          ],
        }),
        React.createElement(FoundryMissionSummary, {
          title: "Paused mission",
          objective: "Wait for the escort",
          status: "paused",
        }),
        React.createElement(FoundryMccPanel, {
          title: "Quiet MCC",
          manaState: "40 / 90",
          focusState: "Recovering",
          guidance: "Hold position until the focus lane stabilizes.",
        })
      )
    );

    expect(screen.getByLabelText("Compact focus pane")).toHaveTextContent(
      "Minimal content"
    );
    expect(screen.getByText("High")).toBeInTheDocument();
    expect(screen.getByText("now")).toBeInTheDocument();
    expect(screen.getByText("Bridge collapse ahead")).toBeInTheDocument();
    expect(screen.getByText("Wait for the escort")).toBeInTheDocument();
    expect(
      screen.getByText("Hold position until the focus lane stabilizes.")
    ).toBeInTheDocument();
  });
});
