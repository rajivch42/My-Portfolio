import React, { useRef, useEffect } from "react";
import { useIntersection } from "@/hooks/useIntersection";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { setupCanvas } from "@/lib/canvas";

export default function ShootingStars({ maxStars = 20 }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const isVisible = useIntersection(containerRef, { threshold: 0.05 });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let width = container.clientWidth;
    let height = container.clientHeight;
    let canvasHelper = setupCanvas(canvas, width, height);

    const handleResize = () => {
      if (!container || !canvas) return;
      width = container.clientWidth;
      height = container.clientHeight;
      canvasHelper = setupCanvas(canvas, width, height);
    };

    window.addEventListener("resize", handleResize);

    let stars = [];
    let lastSpawnTime = 0;
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    let animationId = null;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      scrollVelocity = Math.min(Math.abs(currentScrollY - lastScrollY), 35);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    const spawnStar = (now) => {
      const angle = (Math.PI / 4) + (Math.random() - 0.5) * 0.3; // ~45 deg downward
      const speed = 4 + Math.random() * 4 + scrollVelocity * 0.3;
      const length = 60 + Math.random() * 80;

      stars.push({
        x: Math.random() * width * 1.2 - width * 0.1,
        y: -50,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        length,
        opacity: 0.7 + Math.random() * 0.3,
        thickness: 1 + Math.random() * 1.5,
        tailColor: Math.random() > 0.5 ? "#5ee7ff" : "#8b7bff",
      });
    };

    const render = (now) => {
      if (isVisible && canvasHelper) {
        const { ctx } = canvasHelper;
        ctx.clearRect(0, 0, width, height);

        // Decay velocity
        scrollVelocity *= 0.92;

        // Spawn logic: 3-5 per second, more during high scroll velocity
        const spawnInterval = Math.max(180 - scrollVelocity * 5, 80);
        if (now - lastSpawnTime > spawnInterval && stars.length < maxStars) {
          spawnStar(now);
          lastSpawnTime = now;
        }

        // Update & draw stars
        stars = stars.filter((star) => {
          star.x += star.vx;
          star.y += star.vy;

          if (star.x > width + 100 || star.y > height + 100) {
            return false;
          }

          const tailX = star.x - star.vx * (star.length / 5);
          const tailY = star.y - star.vy * (star.length / 5);

          const grad = ctx.createLinearGradient(tailX, tailY, star.x, star.y);
          grad.addColorStop(0, "transparent");
          grad.addColorStop(0.7, star.tailColor);
          grad.addColorStop(1, "#ffffff");

          ctx.save();
          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(star.x, star.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = star.thickness;
          ctx.lineCap = "round";
          ctx.globalAlpha = star.opacity;
          ctx.stroke();

          // Star head glow
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.thickness + 0.5, 0, Math.PI * 2);
          ctx.fillStyle = "#ffffff";
          ctx.shadowColor = "#5ee7ff";
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.restore();

          return true;
        });
      }

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [isVisible, maxStars, prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
