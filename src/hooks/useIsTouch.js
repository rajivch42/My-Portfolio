import { useState, useEffect } from "react";

export function useIsTouch() {
  const [isTouch, setIsTouch] = useState(() => {
    if (typeof window === "undefined") return false;
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkTouch = () => {
      setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
    };

    window.addEventListener("touchstart", checkTouch, { once: true });
    return () => window.removeEventListener("touchstart", checkTouch);
  }, []);

  return isTouch;
}
