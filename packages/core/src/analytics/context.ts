// @ts-ignore - react type declarations may not be installed in minimal checkouts.
import React, { createContext, useContext, useMemo } from "react";
import type { AnalyticsAdapter, AnalyticsEvent } from "./types.js";

const AnalyticsCtx = createContext<AnalyticsAdapter | null>(null);

export interface AnalyticsProviderProps {
  adapter?: AnalyticsAdapter | null;
  children: React.ReactNode;
}

export function AnalyticsProvider({ adapter, children }: AnalyticsProviderProps) {
  const value = useMemo(() => adapter ?? null, [adapter]);
  return React.createElement(AnalyticsCtx.Provider, { value }, children);
}

export function useAnalytics() {
  const a = useContext(AnalyticsCtx);
  return {
    track: (e: AnalyticsEvent) => a?.track?.(e),
    identify: a?.identify?.bind(a),
    group: a?.group?.bind(a),
    page: a?.page?.bind(a),
    flush: a?.flush?.bind(a),
    init: a?.init?.bind(a),
  };
}
