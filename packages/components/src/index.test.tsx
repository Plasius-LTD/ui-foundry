import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it, vi } from "vitest";
import { FoundryButton, FoundryStack } from "./index";

describe("@plasius/ui-foundry-components", () => {
  it("renders FoundryStack layout props as flex styles", () => {
    const { container } = render(
      React.createElement(
        FoundryStack,
        {
          gap: 20,
          direction: "row",
          align: "start",
          justify: "space-between",
          className: "stack",
        },
        React.createElement("span", null, "One"),
        React.createElement("span", null, "Two")
      )
    );

    const stack = container.firstElementChild as HTMLElement;

    expect(stack.className).toBe("stack");
    expect(stack).toHaveStyle({
      display: "flex",
      flexDirection: "row",
      gap: "20px",
      alignItems: "flex-start",
      justifyContent: "space-between",
    });
  });

  it("renders an accessible button and forwards clicks", () => {
    const onClick = vi.fn();

    render(
      React.createElement(FoundryButton, {
        label: "Save settings",
        tone: "primary",
        onClick,
      })
    );

    const button = screen.getByRole("button", { name: "Save settings" });
    fireEvent.click(button);

    expect(button).toHaveStyle({
      background: "rgb(36, 87, 245)",
      color: "rgb(255, 255, 255)",
    });
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("keeps disabled buttons non-interactive", () => {
    const onClick = vi.fn();

    render(
      React.createElement(FoundryButton, {
        label: "Delete",
        tone: "danger",
        disabled: true,
        onClick,
      })
    );

    const button = screen.getByRole("button", { name: "Delete" });
    fireEvent.click(button);

    expect(button).toBeDisabled();
    expect(button).toHaveStyle({
      cursor: "not-allowed",
      opacity: "0.6",
    });
    expect(onClick).not.toHaveBeenCalled();
  });

  it("passes automated accessibility checks for the shipped component surfaces", async () => {
    const { container } = render(
      React.createElement(
        FoundryStack,
        { gap: 16 },
        React.createElement(FoundryButton, { label: "Continue", tone: "primary" }),
        React.createElement(FoundryButton, { label: "Cancel" })
      )
    );

    const result = await axe.run(container);

    expect(result.violations).toHaveLength(0);
  });
});
