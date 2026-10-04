import React, { useRef, useState, useEffect } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsTouch } from "@/hooks/useIsTouch";

export default function Magnet({
  children,
  padding = 30,
  magnetStrength = 0.35,
  activeTransition = "transform 0.15s ease-out",
  inactiveTransition = "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
  className = "",
  ...props
}) {
  const magnetRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const isTouch = useIsTouch();

  const handleMouseMove = (e) => {
    if (prefersReducedMotion || isTouch || !magnetRef.current) return;

    const { left, top, width, height } = magnetRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distX = Math.abs(centerX - e.clientX);
    const distY = Math.abs(centerY - e.clientY);

    if (distX < width / 2 + padding && distY < height / 2 + padding) {
      setIsHovered(true);
      const offsetX = (e.clientX - centerX) * magnetStrength;
      const offsetY = (e.clientY - centerY) * magnetStrength;
      setPosition({ x: offsetX, y: offsetY });
    } else {
      setIsHovered(false);
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  };

  useEffect(() => {
    if (prefersReducedMotion || isTouch) return;
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [padding, magnetStrength, prefersReducedMotion, isTouch]);

  if (prefersReducedMotion || isTouch) {
    return <div className={`inline-block ${className}`}>{children}</div>;
  }

  return (
    <div
      ref={magnetRef}
      onMouseLeave={handleMouseLeave}
      className={`inline-block ${className}`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: isHovered ? activeTransition : inactiveTransition,
        willChange: "transform",
      }}
      {...props}
    >
      {children}
    </div>
  );
}
