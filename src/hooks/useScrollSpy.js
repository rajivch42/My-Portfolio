import { useState, useEffect } from "react";

export function useScrollSpy(sectionIds, offset = 120) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] || "home");

  useEffect(() => {
    if (typeof window === "undefined" || !sectionIds || sectionIds.length === 0) return;

    const handleScroll = () => {
      const scrollPos = window.scrollY + offset;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(id);
            return;
          }
        }
      }
      setActiveSection(sectionIds[0]);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds, offset]);

  return activeSection;
}
