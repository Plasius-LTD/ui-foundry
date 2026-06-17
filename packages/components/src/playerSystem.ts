import React from "react";

export type FoundrySurfaceVariant = "flat" | "world-space";

export type FoundryPaneProps = {
  title: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  surface?: FoundrySurfaceVariant;
  density?: "comfortable" | "compact";
  className?: string;
  ariaLabel?: string;
};

export type FoundryLedgerEntry = {
  label: string;
  value: string;
  emphasis?: "neutral" | "positive" | "warning";
};

export type FoundryLedgerProps = {
  title: string;
  entries: readonly FoundryLedgerEntry[];
  surface?: FoundrySurfaceVariant;
};

export type FoundryLogEntry = {
  id: string;
  label: string;
  detail?: string;
  timestamp?: string;
  severity?: "neutral" | "info" | "warning" | "danger";
};

export type FoundryLogProps = {
  title: string;
  entries: readonly FoundryLogEntry[];
  surface?: FoundrySurfaceVariant;
};

export type FoundryMissionSummaryProps = {
  title: string;
  objective: string;
  status: "active" | "paused" | "complete";
  steps?: readonly string[];
  surface?: FoundrySurfaceVariant;
};

export type FoundryMccPanelProps = {
  title: string;
  manaState: string;
  focusState: string;
  guidance: string;
  cues?: readonly string[];
  surface?: FoundrySurfaceVariant;
};

function surfaceStyle(surface: FoundrySurfaceVariant) {
  if (surface === "world-space") {
    return {
      background:
        "linear-gradient(160deg, rgba(13, 24, 52, 0.95), rgba(28, 61, 110, 0.88))",
      color: "#f7fbff",
      border: "1px solid rgba(147, 190, 255, 0.45)",
      boxShadow: "0 20px 48px rgba(6, 16, 34, 0.32)",
      backdropFilter: "blur(14px)",
    };
  }

  return {
    background: "#f7fafc",
    color: "#132033",
    border: "1px solid #d8e2ef",
    boxShadow: "0 8px 24px rgba(19, 32, 51, 0.08)",
  };
}

function paneStyle(
  surface: FoundrySurfaceVariant,
  density: NonNullable<FoundryPaneProps["density"]>
) {
  return {
    ...surfaceStyle(surface),
    borderRadius: 20,
    padding: density === "compact" ? "1rem" : "1.25rem",
    display: "grid",
    gap: density === "compact" ? 12 : 16,
    width: "min(100%, 34rem)",
    minWidth: 240,
  };
}

function textMuted(surface: FoundrySurfaceVariant) {
  return surface === "world-space" ? "rgba(231, 240, 255, 0.82)" : "#51627a";
}

function emphasisColor(entry: FoundryLedgerEntry) {
  switch (entry.emphasis) {
    case "positive":
      return "#13795b";
    case "warning":
      return "#b45309";
    default:
      return "#132033";
  }
}

function severityColor(entry: FoundryLogEntry) {
  switch (entry.severity) {
    case "info":
      return "#2457f5";
    case "warning":
      return "#b45309";
    case "danger":
      return "#ca2a34";
    default:
      return "#132033";
  }
}

function severityLabel(entry: FoundryLogEntry) {
  switch (entry.severity) {
    case "info":
      return "Info";
    case "warning":
      return "Warning";
    case "danger":
      return "Danger";
    default:
      return null;
  }
}

export function FoundryPane({
  title,
  description,
  children,
  footer,
  surface = "flat",
  density = "comfortable",
  className,
  ariaLabel,
}: FoundryPaneProps) {
  return React.createElement(
    "section",
    {
      className,
      "aria-label": ariaLabel ?? title,
      style: paneStyle(surface, density),
    },
    React.createElement(
      "header",
      { style: { display: "grid", gap: 6 } },
      React.createElement(
        "h2",
        {
          style: {
            margin: 0,
            fontSize: "1.05rem",
            lineHeight: 1.2,
          },
        },
        title
      ),
      description
        ? React.createElement(
            "p",
            {
              style: {
                margin: 0,
                fontSize: "0.92rem",
                color: textMuted(surface),
              },
            },
            description
          )
        : null
    ),
    children
      ? React.createElement("div", { style: { display: "grid", gap: 12 } }, children)
      : null,
    footer ? React.createElement("footer", null, footer) : null
  );
}

export function FoundryLedger({
  title,
  entries,
  surface = "flat",
}: FoundryLedgerProps) {
  return React.createElement(
    FoundryPane,
    {
      title,
      description: "Responsive ledger rows suitable for focused panes and demos.",
      surface,
      density: "compact",
    },
    React.createElement(
      "dl",
      {
        style: {
          margin: 0,
          display: "grid",
          gap: 10,
        },
      },
      entries.map((entry) =>
        React.createElement(
          "div",
          {
            key: entry.label,
            style: {
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr) auto",
              gap: 12,
              alignItems: "baseline",
            },
          },
          React.createElement(
            "dt",
            {
              style: {
                margin: 0,
                color: textMuted(surface),
              },
            },
            entry.label
          ),
          React.createElement(
            "dd",
            {
              style: {
                margin: 0,
                fontWeight: 700,
                color:
                  surface === "world-space"
                    ? "#f7fbff"
                    : emphasisColor(entry),
              },
            },
            entry.value
          )
        )
      )
    )
  );
}

export function FoundryLog({
  title,
  entries,
  surface = "flat",
}: FoundryLogProps) {
  return React.createElement(
    FoundryPane,
    {
      title,
      description: "Ordered event summaries with low-noise timestamps and severity cues.",
      surface,
      density: "compact",
    },
    React.createElement(
      "ol",
      {
        style: {
          margin: 0,
          paddingLeft: "1.1rem",
          display: "grid",
          gap: 12,
        },
      },
      entries.map((entry) =>
        React.createElement(
          "li",
          {
            key: entry.id,
            style: {
              display: "grid",
              gap: 4,
            },
          },
          React.createElement(
            "div",
            {
              style: {
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                alignItems: "baseline",
              },
            },
            severityLabel(entry)
              ? React.createElement(
                  "span",
                  {
                    style: {
                      color: surface === "world-space" ? "#f7fbff" : severityColor(entry),
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    },
                  },
                  severityLabel(entry)
                )
              : null,
            React.createElement(
              "strong",
              {
                style: {
                  color:
                    surface === "world-space"
                      ? "#f7fbff"
                      : severityColor(entry),
                },
              },
              entry.label
            ),
            entry.timestamp
              ? React.createElement(
                  "span",
                  {
                    style: {
                      color: textMuted(surface),
                      fontSize: "0.86rem",
                    },
                  },
                  entry.timestamp
                )
              : null
          ),
          entry.detail
            ? React.createElement(
                "span",
                {
                  style: {
                    color: textMuted(surface),
                    fontSize: "0.92rem",
                  },
                },
                entry.detail
              )
            : null
        )
      )
    )
  );
}

export function FoundryMissionSummary({
  title,
  objective,
  status,
  steps = [],
  surface = "flat",
}: FoundryMissionSummaryProps) {
  return React.createElement(
    FoundryPane,
    {
      title,
      description: `Mission state: ${status}. Supports world-space focus panes and flat validation surfaces.`,
      surface,
    },
    React.createElement(
      "p",
      {
        style: {
          margin: 0,
          fontWeight: 600,
        },
      },
      objective
    ),
    steps.length > 0
      ? React.createElement(
          "ul",
          {
            style: {
              margin: 0,
              paddingLeft: "1.1rem",
              display: "grid",
              gap: 8,
            },
          },
          steps.map((step) => React.createElement("li", { key: step }, step))
        )
      : null
  );
}

export function FoundryMccPanel({
  title,
  manaState,
  focusState,
  guidance,
  cues = [],
  surface = "flat",
}: FoundryMccPanelProps) {
  return React.createElement(
    FoundryPane,
    {
      title,
      description:
        "Compact MCC guidance surface for focused panes, tutorial coaching, and combat-safe reductions.",
      surface,
    },
    React.createElement(
      "div",
      {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: 12,
        },
      },
      React.createElement(
        "div",
        null,
        React.createElement(
          "strong",
          { style: { display: "block", marginBottom: 4 } },
          "Mana"
        ),
        React.createElement("span", null, manaState)
      ),
      React.createElement(
        "div",
        null,
        React.createElement(
          "strong",
          { style: { display: "block", marginBottom: 4 } },
          "Focus"
        ),
        React.createElement("span", null, focusState)
      )
    ),
    React.createElement(
      "p",
      {
        style: {
          margin: 0,
          color: textMuted(surface),
        },
      },
      guidance
    ),
    cues.length > 0
      ? React.createElement(
          "ul",
          {
            style: {
              margin: 0,
              paddingLeft: "1.1rem",
              display: "grid",
              gap: 8,
            },
          },
          cues.map((cue) => React.createElement("li", { key: cue }, cue))
        )
      : null
  );
}
