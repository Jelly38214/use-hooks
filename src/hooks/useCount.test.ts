import { renderHook, act } from "@testing-library/react-hooks";
import useCounter from "./useCounter";
import { useEffect } from "react";
import { sideEffect } from "./sideEffect";

test("should increment counter", () => {
  const { result } = renderHook(() => useCounter());
  expect(result.current.count).toBe(0);

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(1);
});

test("should increment counter from custom initial value", () => {
  const { result } = renderHook(() => useCounter(10));
  expect(result.current.count).toBe(10);

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(11);
});

test("should reset counter to updated initial value", () => {
  const { result, rerender } = renderHook(
    ({ initialValue }) => useCounter(initialValue),
    {
      initialProps: { initialValue: 0 }
    }
  );

  rerender({ initialValue: 10 });

  act(() => {
    result.current.reset();
  });

  expect(result.current.count).toBe(10);
});

test("should clean up side effect", () => {
  const { rerender } = renderHook(
    ({ id }) => {
      useEffect(() => {
        sideEffect.start(id);

        return () => sideEffect.stop(id);
      }, [id]);
    },
    {
      initialProps: { id: "first" }
    }
  );
  rerender({ id: "second" });

  expect(sideEffect.get("first")).toBe(false);
  expect(sideEffect.get("second")).toBe(true);
});
