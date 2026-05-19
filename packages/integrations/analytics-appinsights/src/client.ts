export interface AppInsightsEvent {
  name: string;
}

export interface AppInsightsClient {
  trackEvent: (
    event: AppInsightsEvent,
    props?: Record<string, unknown>
  ) => void;
  trackPageView?: (
    pageView?: { name?: string } & Record<string, unknown>
  ) => void;
  setAuthenticatedUserContext?: (
    userId: string,
    accountId?: string | null,
    storeInCookie?: boolean
  ) => void;
  clearAuthenticatedUserContext?: () => void;
  flush?: () => void | Promise<void>;
}
