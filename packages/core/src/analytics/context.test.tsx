import React from "react";
import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AnalyticsProvider, useAnalytics } from "../index";
import type { AnalyticsAdapter } from "../index";

function createWrapper(adapter?: AnalyticsAdapter | null) {
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return React.createElement(AnalyticsProvider, { adapter }, children);
  };
}

describe("AnalyticsProvider", () => {
  it("exposes safe no-op helpers when no adapter is provided", () => {
    const { result } = renderHook(() => useAnalytics(), {
      wrapper: createWrapper(null),
    });

    expect(() =>
      act(() => {
        result.current.track({ name: "ui.loaded" });
        result.current.identify?.("user-1");
        result.current.group?.("group-1");
        result.current.page?.("landing");
        result.current.flush?.();
        result.current.init?.();
      })
    ).not.toThrow();
  });

  it("forwards analytics calls to the current adapter", async () => {
    const adapter = {
      track: vi.fn(),
      identify: vi.fn(),
      group: vi.fn(),
      page: vi.fn(),
      flush: vi.fn(),
      init: vi.fn(),
    } satisfies AnalyticsAdapter;

    const { result } = renderHook(() => useAnalytics(), {
      wrapper: createWrapper(adapter),
    });

    await act(async () => {
      result.current.track({
        name: "cta.clicked",
        props: { location: "hero" },
        userId: "user-1",
      });
      result.current.identify?.("user-1", { plan: "pro" });
      result.current.group?.("org-1", { tier: "team" });
      result.current.page?.("pricing", { referrer: "nav" });
      await result.current.flush?.();
      await result.current.init?.();
    });

    expect(adapter.track).toHaveBeenCalledWith({
      name: "cta.clicked",
      props: { location: "hero" },
      userId: "user-1",
    });
    expect(adapter.identify).toHaveBeenCalledWith("user-1", { plan: "pro" });
    expect(adapter.group).toHaveBeenCalledWith("org-1", { tier: "team" });
    expect(adapter.page).toHaveBeenCalledWith("pricing", { referrer: "nav" });
    expect(adapter.flush).toHaveBeenCalledTimes(1);
    expect(adapter.init).toHaveBeenCalledTimes(1);
  });
});
