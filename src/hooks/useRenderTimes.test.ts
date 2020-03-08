import { renderHook } from "@testing-library/react-hooks";
import { useRenderTimes } from "./useRenderTimes";

describe("useRenderTimes", () => {
  it("it should be three after re-rendering three times", () => {
    const { result, rerender } = renderHook(() => useRenderTimes()); // the first time rendering
    expect(result.current).toBe(1);
    rerender()
    rerender()

    expect(result.current).toBe(3)
  });
});
