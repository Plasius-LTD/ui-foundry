import { describe, expect, it, vi } from "vitest";
import { createAppInsightsAdapter } from "./index.js";
import type { AppInsightsClient } from "./index.js";

function createClient(overrides: Partial<AppInsightsClient> = {}): AppInsightsClient {
  return {
    trackEvent: vi.fn(),
    trackPageView: vi.fn(),
    setAuthenticatedUserContext: vi.fn(),
    clearAuthenticatedUserContext: vi.fn(),
    flush: vi.fn(),
    ...overrides,
  };
}

describe("createAppInsightsAdapter", () => {
  it("tracks events with name and props", () => {
    const client = createClient();
    const adapter = createAppInsightsAdapter(client);

    adapter.track({ name: "checkout_clicked", props: { source: "header" } });

    expect(client.trackEvent).toHaveBeenCalledWith(
      { name: "checkout_clicked" },
      { source: "header" }
    );
  });

  it("tracks page views only when the client supports them", () => {
    const withPageView = createClient();
    createAppInsightsAdapter(withPageView).page?.("Pricing", { section: "hero" });

    expect(withPageView.trackPageView).toHaveBeenCalledWith({
      name: "Pricing",
      section: "hero",
    });

    const withoutPageView = createClient({ trackPageView: undefined });

    expect(() =>
      createAppInsightsAdapter(withoutPageView).page?.("Docs", { source: "footer" })
    ).not.toThrow();
  });

  it("identifies users and emits traits when provided", () => {
    const client = createClient();
    const adapter = createAppInsightsAdapter(client);

    adapter.identify?.("user-42", { plan: "pro" });
    adapter.identify?.("user-42");

    expect(client.setAuthenticatedUserContext).toHaveBeenCalledWith(
      "user-42",
      undefined,
      true
    );
    expect(client.trackEvent).toHaveBeenCalledWith(
      { name: "$identify" },
      { plan: "pro" }
    );
    expect(client.trackEvent).toHaveBeenCalledTimes(1);
  });

  it("models group membership via account context and optional traits", () => {
    const client = createClient();
    const adapter = createAppInsightsAdapter(client);

    adapter.group?.("org-9", { tier: "enterprise" });
    adapter.group?.("org-9");

    expect(client.setAuthenticatedUserContext).toHaveBeenCalledWith("", "org-9", true);
    expect(client.trackEvent).toHaveBeenCalledWith(
      { name: "$group" },
      { groupId: "org-9", tier: "enterprise" }
    );
    expect(client.trackEvent).toHaveBeenCalledTimes(1);
  });

  it("flushes through to the underlying client", () => {
    const client = createClient();
    const adapter = createAppInsightsAdapter(client);

    adapter.flush?.();

    expect(client.flush).toHaveBeenCalledTimes(1);
  });
});
