import React from "react";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  target,
  rel,
  className = "",
  icon,
  iconPosition = "right",
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-mono font-medium transition-all duration-200 select-none cursor-pointer focus-visible:outline-2 focus-visible:outline-ion-cyan focus-visible:outline-offset-2";

  const sizeStyles = {
    sm: "text-xs px-3 py-1.5 rounded gap-1.5 tracking-wider",
    md: "text-sm px-5 py-2.5 rounded-md gap-2 tracking-wide",
    lg: "text-base px-6 py-3 rounded-lg gap-2.5 tracking-wide",
  };

  const variantStyles = {
    primary:
      "bg-ion-cyan text-ink hover:bg-white active:scale-[0.98] shadow-[0_0_20px_rgba(94,231,255,0.25)] hover:shadow-[0_0_25px_rgba(94,231,255,0.45)] font-semibold",
    secondary:
      "glass-panel text-text hover:bg-white/10 hover:border-ion-cyan/40 hover:text-white active:scale-[0.98]",
    outline:
      "border border-stroke text-text-muted hover:text-text hover:border-ion-cyan/50 hover:bg-white/5 active:scale-[0.98]",
    ghost:
      "text-text-muted hover:text-ion-cyan hover:bg-white/5 active:scale-[0.98]",
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${
    variantStyles[variant] || variantStyles.primary
  } ${className}`;

  const content = (
    <>
      {icon && iconPosition === "left" && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "right" && <span className="shrink-0">{icon}</span>}
    </>
  );

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("mailto:");
    return (
      <a
        href={href}
        target={target || (isExternal ? "_blank" : undefined)}
        rel={rel || (isExternal ? "noopener noreferrer" : undefined)}
        className={combinedClasses}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={combinedClasses} {...props}>
      {content}
    </button>
  );
}
