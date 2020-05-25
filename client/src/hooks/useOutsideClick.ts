import { useEffect, MutableRefObject } from "react";

export function useOutsideClick(ref: MutableRefObject<HTMLDivElement | null>, callback: () => void) {
  useEffect(() => {
    function handleOutsideClick(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }

    // bind event listener
    document.addEventListener("mousedown", handleOutsideClick);
    // TODO: not sure about touch/click events here, investigate!
    document.addEventListener("touchstart", handleOutsideClick);
    return () => {
      // unbind on clean up
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  });
}
