import React from "react";
import { FoundryButton, FoundryStack } from "../../components/src/index.ts";

export default {
  title: "Primitives/FoundryButton",
};

export const Tones = () => {
  return React.createElement(
    FoundryStack,
    { direction: "row", gap: 10 },
    React.createElement(FoundryButton, { label: "Neutral", tone: "neutral" }),
    React.createElement(FoundryButton, { label: "Primary", tone: "primary" }),
    React.createElement(FoundryButton, { label: "Danger", tone: "danger" })
  );
};

export const Disabled = () => {
  return React.createElement(FoundryButton, {
    label: "Disabled",
    tone: "primary",
    disabled: true,
  });
};
