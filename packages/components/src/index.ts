import React from "react";
export {
  FoundryLedger,
  FoundryLog,
  FoundryMccPanel,
  FoundryMissionSummary,
  FoundryPane,
  type FoundryLedgerEntry,
  type FoundryLedgerProps,
  type FoundryLogEntry,
  type FoundryLogProps,
  type FoundryMccPanelProps,
  type FoundryMissionSummaryProps,
  type FoundryPaneProps,
  type FoundrySurfaceVariant,
} from "./playerSystem.js";

export type FoundryStackProps = {
  children?: React.ReactNode;
  gap?: number;
  direction?: "row" | "column";
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "space-between";
  className?: string;
};

function toAlignItems(value: NonNullable<FoundryStackProps["align"]>) {
  switch (value) {
    case "start":
      return "flex-start";
    case "end":
      return "flex-end";
    default:
      return value;
  }
}

function toJustifyContent(value: NonNullable<FoundryStackProps["justify"]>) {
  switch (value) {
    case "start":
      return "flex-start";
    case "end":
      return "flex-end";
    default:
      return value;
  }
}

export function FoundryStack({
  children,
  gap = 12,
  direction = "column",
  align = "stretch",
  justify = "start",
  className,
}: FoundryStackProps) {
  return React.createElement(
    "div",
    {
      className,
      style: {
        display: "flex",
        flexDirection: direction,
        gap,
        alignItems: toAlignItems(align),
        justifyContent: toJustifyContent(justify),
      },
    },
    children
  );
}

export type FoundryButtonProps = {
  label: string;
  tone?: "neutral" | "primary" | "danger";
  disabled?: boolean;
  onClick?: () => void;
};

function buttonColors(tone: NonNullable<FoundryButtonProps["tone"]>) {
  switch (tone) {
    case "primary":
      return { background: "#2457f5", color: "#ffffff" };
    case "danger":
      return { background: "#ca2a34", color: "#ffffff" };
    default:
      return { background: "#e9edf4", color: "#132033" };
  }
}

export function FoundryButton({
  label,
  tone = "neutral",
  disabled = false,
  onClick,
}: FoundryButtonProps) {
  const colors = buttonColors(tone);
  return React.createElement(
    "button",
    {
      type: "button",
      disabled,
      onClick,
      style: {
        border: 0,
        borderRadius: 10,
        padding: "0.55rem 0.9rem",
        fontWeight: 600,
        background: colors.background,
        color: colors.color,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
      },
    },
    label
  );
}

export const version = "0.1.0";
