import React from "react";
import "./global.css";

export const Provider = ({ children }) => {
  return React.createElement(
    "div",
    {
      style: {
        minHeight: "100vh",
        padding: "1.25rem",
      },
    },
    children
  );
};
