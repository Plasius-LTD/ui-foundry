// src/analytics/context.ts
import React, { createContext, useContext, useMemo } from "react";
var AnalyticsCtx = createContext(null);
function AnalyticsProvider({ adapter, children }) {
  const value = useMemo(() => adapter ?? null, [adapter]);
  return React.createElement(AnalyticsCtx.Provider, { value }, children);
}
function useAnalytics() {
  const a = useContext(AnalyticsCtx);
  return {
    track: (e) => a?.track?.(e),
    identify: a?.identify?.bind(a),
    group: a?.group?.bind(a),
    page: a?.page?.bind(a),
    flush: a?.flush?.bind(a),
    init: a?.init?.bind(a)
  };
}
export {
  AnalyticsProvider,
  useAnalytics
};
//# sourceMappingURL=index.js.map