import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

if (typeof HTMLCanvasElement !== "undefined") {
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(() => null);
}
