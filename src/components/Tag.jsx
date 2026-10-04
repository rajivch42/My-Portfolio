import React from "react";

export default function Tag({
  children,
  variant = "neutral",
  size = "sm",
  dot = false,
  className = "",
}) {
  const base =
    "inline-flex items-center font-mono rounded select-none uppercase tracking-wider font-medium";

  const sizes = {
    xs: "text-[10px] px-2 py-0.5 gap-1",
    sm: "text-xs px-2.5 py-1 gap-1.5",
    md: "text-sm px-3 py-1.5 gap-2",
  };

  const variants = {
    cyan: "bg-ion-cyan/10 text-ion-cyan border border-ion-cyan/30",
    violet: "bg-nebula-violet/10 text-nebula-violet border border-nebula-violet/30",
    ember: "bg-ember/10 text-ember border border-ember/30",
    neutral: "bg-white/[0.04] text-text-muted border border-stroke",
  };

  const dotColors = {
    cyan: "bg-ion-cyan",
    violet: "bg-nebula-violet",
    ember: "bg-ember",
    neutral: "bg-text-muted",
  };

  return (
    <span className={`${base} ${sizes[size] || sizes.sm} ${variants[variant] || variants.neutral} ${className}`}>
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full ${dotColors[variant] || dotColors.neutral} animate-pulse`}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}
