import { useRef } from "react";

/**
 * @description Used to see how many time rendering of a component
 */
export function useRenderTimes() {
  const timesRef = useRef(0);
  return ++timesRef.current;
}
