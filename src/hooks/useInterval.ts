import { useCallback, useEffect, useRef } from "react";

/**
 * 
 * @param {function} fn 
 * @param {number} time 
 * @returns {function} canceler
 */
export function useInterval(fn: Function, time: number) {
  const callback = useRef(fn);
  const timer = useRef(-1);
  const canceler = useCallback(() => {
    if (timer.current !== -1) {
      clearInterval(timer.current);
    }
  }, []);

  callback.current = fn; // for updating when fn change

  useEffect(() => {
    const tick = setInterval(fn, time);
    timer.current = tick;

    return () => clearInterval(tick);
  }, [time]);

  return canceler;
}
