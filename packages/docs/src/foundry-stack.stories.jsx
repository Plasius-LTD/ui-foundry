import React from "react";
import { FoundryButton, FoundryStack } from "../../components/src/index.ts";

export default {
  title: "Layout/FoundryStack",
};

export const Vertical = () => {
  return React.createElement(
    FoundryStack,
    { direction: "column", gap: 8 },
    React.createElement(FoundryButton, { label: "Item 1", tone: "primary" }),
    React.createElement(FoundryButton, { label: "Item 2", tone: "neutral" }),
    React.createElement(FoundryButton, { label: "Item 3", tone: "danger" })
  );
};

export const Horizontal = () => {
  return React.createElement(
    FoundryStack,
    { direction: "row", gap: 8 },
    React.createElement(FoundryButton, { label: "Left", tone: "neutral" }),
    React.createElement(FoundryButton, { label: "Middle", tone: "primary" }),
    React.createElement(FoundryButton, { label: "Right", tone: "neutral" })
  );
};
