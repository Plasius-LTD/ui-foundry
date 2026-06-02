"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  FoundryButton: () => FoundryButton,
  FoundryStack: () => FoundryStack,
  version: () => version
});
module.exports = __toCommonJS(index_exports);
var import_react = __toESM(require("react"), 1);
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
  return import_react.default.createElement(
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
  return import_react.default.createElement(
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FoundryButton,
  FoundryStack,
  version
});
//# sourceMappingURL=index.cjs.map