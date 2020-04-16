import { useState, useEffect, useRef, useCallback } from "react";

export const useLongPress = (timeout = 200, callback: () => void) => {
  const [startLongPress, setStartLongPress] = useState(false);

  const timerId = useRef<any>();
  useEffect(() => {
    if (startLongPress) {
      timerId.current = setTimeout(callback, timeout);
    } else {
      clearTimeout(timerId.current);
    }

    return () => clearTimeout(timerId.current);
  }, [startLongPress]);

  const start = useCallback(() => setStartLongPress(true), []);
  const stop = useCallback(() => setStartLongPress(false), []);

  return {
    onMouseDown: start,
    onMouseUp: stop,
    onMouseLeave: stop,
    onTouchStart: start,
    onTouchEnd: stop,
  };
};
