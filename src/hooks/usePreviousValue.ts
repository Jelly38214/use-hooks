import { useRef } from "react";

export function usePreviousValue(value: any) {
  const previousRef = useRef(undefined); // initialize it with undefined
  const previousValue = previousRef.current;
  previousRef.current = value; // remember the value for next render, see above statement.

  return previousValue;
}
