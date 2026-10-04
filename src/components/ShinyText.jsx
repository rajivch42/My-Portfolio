import React from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function ShinyText({
  text,
  disabled = false,
  speed = 5,
  className = "",
  children,
}) {
  const prefersReducedMotion = useReducedMotion();
  const content = text || children;

  if (disabled || prefersReducedMotion) {
    return <span className={className}>{content}</span>;
  }

  return (
    <span
      className={`inline-block bg-clip-text text-transparent bg-gradient-to-r from-text via-ion-cyan to-text bg-[length:200%_auto] ${className}`}
      style={{
        animation: `shine ${speed}s linear infinite`,
      }}
    >
      {content}
    </span>
  );
}
