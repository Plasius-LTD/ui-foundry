// src/index.ts
import React from "react";
function toAlignItems(value) {
  switch (value) {
    case "start":
      return "flex-start";
    case "end":
      return "flex-end";
    default:
      return value;
  }
}
function toJustifyContent(value) {
  switch (value) {
    case "start":
      return "flex-start";
    case "end":
      return "flex-end";
    default:
      return value;
  }
}
function FoundryStack({
  children,
  gap = 12,
  direction = "column",
  align = "stretch",
  justify = "start",
  className
}) {
  return React.createElement(
    "div",
    {
      className,
      style: {
        display: "flex",
        flexDirection: direction,
        gap,
        alignItems: toAlignItems(align),
        justifyContent: toJustifyContent(justify)
      }
    },
    children
  );
}
function buttonColors(tone) {
  switch (tone) {
    case "primary":
      return { background: "#2457f5", color: "#ffffff" };
    case "danger":
      return { background: "#ca2a34", color: "#ffffff" };
    default:
      return { background: "#e9edf4", color: "#132033" };
  }
}
function FoundryButton({
  label,
  tone = "neutral",
  disabled = false,
  onClick
}) {
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
        opacity: disabled ? 0.6 : 1
      }
    },
    label
  );
}
var version = "0.1.0";
export {
  FoundryButton,
  FoundryStack,
  version
};
//# sourceMappingURL=index.js.map