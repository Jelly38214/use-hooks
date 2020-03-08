import { useReducer } from "react";

export function useForceUpdate() {
  return useReducer(prevState => prevState++, 0)[1];
}
