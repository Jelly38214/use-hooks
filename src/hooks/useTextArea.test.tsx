import { act, renderHook } from "@testing-library/react-hooks";
import { useTextArea } from "./useTextArea";
import React from "react";

describe("useTextArea", () => {
  it("use default value", () => {
    const { result } = renderHook(() => useTextArea());

    expect(result.current[0]).toBe("");
    expect(typeof result.current[0]).toBe("string");
    expect(typeof result.current[1]).toBe("function");

    act(() => {
      const event: React.ChangeEvent<HTMLTextAreaElement> = {
        currentTarget: {
          value: "orange"
        }
      } as React.ChangeEvent<HTMLTextAreaElement>;

      result.current[1](event!, "animal");
    });

    expect(result.current[0]).toBe("orange");
  });

  it("enable trim", () => {
    const { result } = renderHook(() => useTextArea(" cat "));

    expect(result.current[0]).toBe(" cat ");
    expect(typeof result.current[0]).toBe("string");
    expect(typeof result.current[1]).toBe("function");

    act(() => {
      const event: React.ChangeEvent<HTMLTextAreaElement> = {
        currentTarget: {
          value: "orange"
        }
      } as React.ChangeEvent<HTMLTextAreaElement>;

      result.current[1](event, "animal");
    });

    expect(result.current[0]).toBe("orange");
  });

  it("disable trim", () => {
    const { result } = renderHook(() => useTextArea("", false));

    act(() => {
      const event: React.ChangeEvent<HTMLTextAreaElement> = {
        currentTarget: {
          value: "  orange "
        }
      } as React.ChangeEvent<HTMLTextAreaElement>;
      result.current[1](event, "animal");
    });

    expect(result.current[0]).toBe("  orange ");
  });
});
