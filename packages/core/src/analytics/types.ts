export type AnalyticsEvent = {
  name: string;
  props?: Record<string, unknown>;
  userId?: string;
  anonymousId?: string;
};

export interface AnalyticsAdapter {
  init?: () => void | Promise<void>;
  identify?: (userId: string, traits?: Record<string, unknown>) => void;
  group?: (groupId: string, traits?: Record<string, unknown>) => void;
  track: (event: AnalyticsEvent) => void;
  page?: (name?: string, props?: Record<string, unknown>) => void;
  flush?: () => Promise<void> | void;
}
