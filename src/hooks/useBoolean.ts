import { useCallback, useState } from "react";

/**
 *
 * @param {boolean} initialState
 * @returns {state, toggle, setTrue, setFalse}
 */
export function useBoolean(initialState: boolean = false) {
  const [bool, setState] = useState(initialState);
  const toggle = useCallback(() => {
    setState(prevState => !prevState);
  }, []);
  const setTrue = useCallback(() => {
    setState(true);
  }, []);
  const setFalse = useCallback(() => {
    setState(false);
  }, []);

  return { bool, toggle, setTrue, setFalse } as const;
}
