import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsTouch } from "@/hooks/useIsTouch";

export default function CometCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const canvasRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const isTouch = useIsTouch();

  const [cursorLabel, setCursorLabel] = useState("");
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouse = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const trail = useRef([]);

  useEffect(() => {
    if (prefersReducedMotion || isTouch) return;

    document.body.classList.add("custom-cursor-enabled");

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (!isVisible) setIsVisible(true);

      // Add particle to trail
      trail.current.push({
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 2.5 + 1.5,
        alpha: 0.8,
        color: Math.random() > 0.4 ? "#5ee7ff" : "#8b7bff",
      });

      if (trail.current.length > 25) {
        trail.current.shift();
      }

      // Check hover targets for custom labels or link snap
      const target = e.target;
      const labelEl = target.closest("[data-cursor-label]");
      if (labelEl) {
        setCursorLabel(labelEl.getAttribute("data-cursor-label"));
      } else {
        setCursorLabel("");
      }

      const interactiveEl = target.closest("a, button, input, textarea, [role='button']");
      setIsHoveringLink(!!interactiveEl);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    let animId = null;

    const render = () => {
      // Direct dot update
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0)`;
      }

      // Lerp ring (0.15 factor as specified in architecture.md)
      ring.current.x += (mouse.current.x - ring.current.x) * 0.15;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.15;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0)`;
      }

      // Canvas particle trail update
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < trail.current.length; i++) {
        const p = trail.current[i];
        p.alpha *= 0.91;
        p.size *= 0.95;

        if (p.alpha > 0.05) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 5;
          ctx.fill();
          ctx.restore();
        }
      }

      trail.current = trail.current.filter((p) => p.alpha > 0.05);

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      document.body.classList.remove("custom-cursor-enabled");
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isVisible, prefersReducedMotion, isTouch]);

  if (prefersReducedMotion || isTouch) return null;

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[99999] transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {/* Particle Trail Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Lagging Ring with Dynamic States */}
      <div
        ref={ringRef}
        className={`absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-ion-cyan pointer-events-none transition-[width,height,background-color,border-color] duration-200 flex items-center justify-center ${
          cursorLabel
            ? "w-16 h-16 bg-ink/90 border-ion-cyan shadow-[0_0_20px_rgba(94,231,255,0.4)]"
            : isHoveringLink
            ? "w-12 h-12 border-white bg-ion-cyan/15 shadow-[0_0_15px_rgba(94,231,255,0.3)]"
            : isClicking
            ? "w-6 h-6 border-nebula-violet bg-nebula-violet/20"
            : "w-9 h-9 border-ion-cyan/60"
        }`}
      >
        {cursorLabel && (
          <span className="font-mono text-[10px] font-bold text-ion-cyan uppercase tracking-wider select-none animate-fadeIn">
            {cursorLabel}
          </span>
        )}
      </div>

      {/* Instant Ion-Cyan Dot */}
      <div
        ref={dotRef}
        className={`absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-ion-cyan pointer-events-none shadow-[0_0_8px_#5ee7ff] ${
          cursorLabel ? "opacity-0" : "opacity-100"
        }`}
      />
    </div>
  );
}
