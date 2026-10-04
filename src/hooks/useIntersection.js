import { useState, useEffect } from "react";

export function useIntersection(elementRef, options = {}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = elementRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [elementRef, options.root, options.rootMargin, options.threshold]);

  return isVisible;
}
