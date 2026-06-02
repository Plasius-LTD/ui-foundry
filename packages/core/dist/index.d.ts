import React from 'react';

type AnalyticsEvent = {
    name: string;
    props?: Record<string, unknown>;
    userId?: string;
    anonymousId?: string;
};
interface AnalyticsAdapter {
    init?: () => void | Promise<void>;
    identify?: (userId: string, traits?: Record<string, unknown>) => void;
    group?: (groupId: string, traits?: Record<string, unknown>) => void;
    track: (event: AnalyticsEvent) => void;
    page?: (name?: string, props?: Record<string, unknown>) => void;
    flush?: () => Promise<void> | void;
}

interface AnalyticsProviderProps {
    adapter?: AnalyticsAdapter | null;
    children: React.ReactNode;
}
declare function AnalyticsProvider({ adapter, children }: AnalyticsProviderProps): React.FunctionComponentElement<React.ProviderProps<AnalyticsAdapter | null>>;
declare function useAnalytics(): {
    track: (e: AnalyticsEvent) => void | undefined;
    identify: ((userId: string, traits?: Record<string, unknown>) => void) | undefined;
    group: ((groupId: string, traits?: Record<string, unknown>) => void) | undefined;
    page: ((name?: string, props?: Record<string, unknown>) => void) | undefined;
    flush: (() => Promise<void> | void) | undefined;
    init: (() => void | Promise<void>) | undefined;
};

export { type AnalyticsAdapter, type AnalyticsEvent, AnalyticsProvider, useAnalytics };
