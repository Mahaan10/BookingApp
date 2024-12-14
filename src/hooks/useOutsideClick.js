import { useEffect } from "react";

export default function useOutsideClickOptions(ref, exceptionId, cb) {
  useEffect(() => {
    const outsideClickHandler = (event) => {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        event.target.id !== exceptionId
      ) {
        cb();
      }
    };
    document.addEventListener("mousedown", outsideClickHandler);

    return () => {
      document.removeEventListener("mousedown", outsideClickHandler);
    };
  }, [ref, cb, exceptionId]);
}
