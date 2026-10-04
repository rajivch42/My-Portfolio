import React from "react";

export default function SectionTitle({
  label,
  title,
  subtitle,
  align = "left",
  className = "",
}) {
  const alignmentClass = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  }[align] || "text-left items-start";

  return (
    <div className={`flex flex-col mb-12 md:mb-16 ${alignmentClass} ${className}`}>
      {label && (
        <span className="font-mono text-xs uppercase tracking-widest text-ion-cyan/80 mb-3 block">
          // {label}
        </span>
      )}
      <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-text leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base sm:text-lg text-text-muted max-w-[65ch] leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
