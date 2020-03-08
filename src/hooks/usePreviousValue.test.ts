import { act, renderHook } from "@testing-library/react-hooks";
import { usePreviousValue } from "./usePreviousValue";

describe("usePreviousValue", () => {
  it("it should be undefined", () => {
    const { result } = renderHook(() => usePreviousValue(true));

    expect(result.current).toBeUndefined();
  });

  it("it should be true after calling twice", () => {
    const { result, rerender } = renderHook(
      ({ initialValue }) => usePreviousValue(initialValue),
      { initialProps: { initialValue: true } }
    );

    // Get initial value in hook
    expect(result.current).toBeUndefined();

    rerender({ initialValue: false });

    // Get the fisrt value we passed
    expect(result.current).toBeTruthy();

    rerender({ initialValue: true });
    // Get the second value we passed
    expect(result.current).toBeFalsy();
  });
});
