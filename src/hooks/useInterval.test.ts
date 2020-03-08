import { act, renderHook } from "@testing-library/react-hooks";
import { useInterval } from "./useInterval";
function sleep(time: number) {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
}

describe("useInterval", () => {
  it("counter will be 10 after 10s", async () => {
    let counter = 0;
    const mockFn = () => counter++;
    const { result } = renderHook(() => useInterval(mockFn, 100));
    await sleep(1100);
    expect(counter).toBe(10);

    result.current() // Cancel setInterval

    await sleep(1000)
    expect(counter).toBe(10)
  });
});
