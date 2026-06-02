import type {
  AnalyticsAdapter,
  AnalyticsEvent,
} from "@plasius/ui-foundry-core/analytics/types";
import type { AppInsightsClient } from "./client";

/**
 * Creates an AnalyticsAdapter backed by an existing Application Insights client.
 * The app is responsible for creating/configuring the client and calling loadAppInsights().
 */
export function createAppInsightsAdapter(
  client: AppInsightsClient
): AnalyticsAdapter {
  return {
    track: ({ name, props }: AnalyticsEvent) => {
      // App Insights requires an event object with name + optional properties
      client.trackEvent({ name }, props);
    },

    page: (name?: string, props?: Record<string, unknown>) => {
      if (typeof client.trackPageView === "function") {
        client.trackPageView({ name, ...(props ?? {}) });
      } else {
        // no-op if not available
      }
    },

    identify: (userId: string, traits?: Record<string, unknown>) => {
      // App Insights supports an authenticated user id and optional "account"
      // We’ll store extra traits by sending a special event, leaving the core identity as the userId.
      if (typeof client.setAuthenticatedUserContext === "function") {
        client.setAuthenticatedUserContext(
          userId,
          undefined,
          /*storeInCookie*/ true
        );
      }
      if (traits && Object.keys(traits).length > 0) {
        client.trackEvent({ name: "$identify" }, traits);
      }
    },

    group: (groupId: string, traits?: Record<string, unknown>) => {
      // App Insights doesn't have "group" first-class; we model via authenticated account (2nd arg)
      if (typeof client.setAuthenticatedUserContext === "function") {
        // Preserve user id if already set; since we can’t read it, we just set account id
        client.setAuthenticatedUserContext(
          /*userId*/ "",
          /*accountId*/ groupId,
          /*storeInCookie*/ true
        );
      }
      if (traits && Object.keys(traits).length > 0) {
        client.trackEvent({ name: "$group" }, { groupId, ...traits });
      }
    },

    flush: () => client.flush?.(),
  };
}
