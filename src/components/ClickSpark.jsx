import React, { useRef, useEffect } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsTouch } from "@/hooks/useIsTouch";

export default function ClickSpark({
  sparkColor = "#5ee7ff",
  sparkSize = 10,
  sparkRadius = 24,
  sparkCount = 8,
  duration = 450,
}) {
  const canvasRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const isTouch = useIsTouch();

  useEffect(() => {
    if (prefersReducedMotion || isTouch) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let sparks = [];
    let animationId = null;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleClick = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      const now = performance.now();

      for (let i = 0; i < sparkCount; i++) {
        const angle = (Math.PI * 2 * i) / sparkCount + (Math.random() - 0.5) * 0.5;
        const speed = sparkRadius * (0.8 + Math.random() * 0.5);
        sparks.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          startTime: now,
        });
      }

      if (!animationId) {
        animationId = requestAnimationFrame(render);
      }
    };

    const render = (now) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparks = sparks.filter((spark) => {
        const elapsed = now - spark.startTime;
        const progress = elapsed / duration;
        if (progress >= 1) return false;

        const alpha = 1 - progress;
        const currentDistance = progress * 1.2;
        const px = spark.x + spark.vx * currentDistance;
        const py = spark.y + spark.vy * currentDistance;

        ctx.save();
        ctx.beginPath();
        ctx.arc(px, py, Math.max(1, (1 - progress) * (sparkSize / 3)), 0, Math.PI * 2);
        ctx.fillStyle = sparkColor;
        ctx.globalAlpha = alpha;
        ctx.shadowColor = sparkColor;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.restore();

        return true;
      });

      if (sparks.length > 0) {
        animationId = requestAnimationFrame(render);
      } else {
        animationId = null;
      }
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("click", handleClick);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [sparkColor, sparkSize, sparkRadius, sparkCount, duration, prefersReducedMotion, isTouch]);

  if (prefersReducedMotion || isTouch) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      aria-hidden="true"
    />
  );
}
