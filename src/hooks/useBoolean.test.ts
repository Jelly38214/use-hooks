import { act, renderHook } from "@testing-library/react-hooks";
import { useBoolean } from "./useBoolean";

describe("Test of useBoolean", () => {
  it("use default value", () => {
    const { result } = renderHook(() => useBoolean());

    expect(result.current.bool).toBeFalsy();
    expect(result.current.toggle).toBeInstanceOf(Function);
    expect(result.current.setTrue).toBeInstanceOf(Function);
    expect(result.current.setFalse).toBeInstanceOf(Function);

    act(() => {
      result.current.setTrue();
    });
    expect(result.current.bool).toBeTruthy();

    act(() => {
      result.current.setFalse();
    });
    expect(result.current.bool).toBeFalsy();

    act(() => {
      result.current.toggle();
    });
    expect(result.current.bool).toBeTruthy();
  });

  it("use initialValue: true", () => {
    const { result } = renderHook(() => useBoolean(true));

    expect(result.current.bool).toBeTruthy();

    act(() => {
      result.current.setTrue();
    });
    expect(result.current.bool).toBeTruthy();

    act(() => {
      result.current.setFalse();
    });
    expect(result.current.bool).toBeFalsy();

    act(() => {
      result.current.toggle();
    });
    expect(result.current.bool).toBeTruthy();
  });
});
