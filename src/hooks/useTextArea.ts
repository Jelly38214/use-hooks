import { useCallback, useState } from "react";

export function useTextArea(
  initialState: string = "",
  isTrim: boolean = true
): [string, (e: React.ChangeEvent<HTMLTextAreaElement>, name: string) => void] {
  const [value, setValue] = useState(initialState);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>, name: string) =>
      setValue(isTrim ? e.currentTarget.value.trim() : e.currentTarget.value),
    []
  );

  return [value, onChange];
}
