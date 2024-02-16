import { useRef, useEffect } from "react";

export default function useDebouncedFn(func: any, delay: number, cleanUp = false) {
  const timeoutRef: any = useRef();

  function clearTimer() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    }
  }

  useEffect(() => (cleanUp ? clearTimer : undefined), [cleanUp]);

  return (...args: string[]) => {
    clearTimer();

    timeoutRef.current = setTimeout(() => func(...args), delay);
  };
}