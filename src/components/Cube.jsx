import React, { useRef, useState, useEffect } from "react";
import { cubeSkills } from "@/data/skills";
import Icon from "./Icon";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIntersection } from "@/hooks/useIntersection";
import { useIsTouch } from "@/hooks/useIsTouch";

export default function Cube() {
  const containerRef = useRef(null);
  const isVisible = useIntersection(containerRef, { threshold: 0.1 });
  const prefersReducedMotion = useReducedMotion();
  const isTouch = useIsTouch();

  const [rotation, setRotation] = useState({ x: -18, y: 35 });
  const [activeFace, setActiveFace] = useState(cubeSkills[0]);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: -18, y: 35 });
  const currentRotation = useRef({ x: -18, y: 35 });

  // Mouse inertia follow
  useEffect(() => {
    if (prefersReducedMotion) return;

    let animId = null;
    let idleCounter = 0;

    const handleMouseMove = (e) => {
      if (isDragging || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const normX = (e.clientX - centerX) / (rect.width * 1.5);
      const normY = (e.clientY - centerY) / (rect.height * 1.5);

      targetRotation.current.x = -normY * 45;
      targetRotation.current.y = normX * 65 + idleCounter;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const loop = () => {
      if (isVisible) {
        if (!isDragging) {
          idleCounter += 0.2;
          targetRotation.current.y += 0.15;
        }

        // Lerp
        currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * 0.08;
        currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * 0.08;

        setRotation({
          x: currentRotation.current.x,
          y: currentRotation.current.y,
        });
      }
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isVisible, isDragging, prefersReducedMotion]);

  // Touch drag support
  const handleTouchStart = (e) => {
    if (e.touches.length !== 1) return;
    setIsDragging(true);
    dragStart.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      rotX: currentRotation.current.x,
      rotY: currentRotation.current.y,
    };
  };

  const handleTouchMove = (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - dragStart.current.x;
    const deltaY = e.touches[0].clientY - dragStart.current.y;

    targetRotation.current.y = dragStart.current.rotY + deltaX * 0.7;
    targetRotation.current.x = dragStart.current.rotX - deltaY * 0.7;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const getFaceTransform = (face) => {
    // 240px cube / 120px offset on mobile, 280px / 140px on desktop
    const d = 130;
    switch (face) {
      case "front":
        return `translateZ(${d}px)`;
      case "back":
        return `rotateY(180deg) translateZ(${d}px)`;
      case "right":
        return `rotateY(90deg) translateZ(${d}px)`;
      case "left":
        return `rotateY(-90deg) translateZ(${d}px)`;
      case "top":
        return `rotateX(90deg) translateZ(${d}px)`;
      case "bottom":
        return `rotateX(-90deg) translateZ(${d}px)`;
      default:
        return "";
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-center py-6 select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      data-cursor-label="drag"
    >
      {/* 3D Scene viewport */}
      <div
        className="w-[260px] h-[260px] sm:w-[280px] sm:h-[280px] flex items-center justify-center cursor-grab active:cursor-grabbing"
        style={{ perspective: "1000px" }}
      >
        <div
          className="relative w-[260px] h-[260px] transition-transform duration-75"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          }}
        >
          {cubeSkills.map((skill) => (
            <div
              key={skill.face}
              onMouseEnter={() => setActiveFace(skill)}
              className="absolute inset-0 rounded-2xl border border-ion-cyan/30 backdrop-blur-md bg-ink-soft/75 p-6 flex flex-col items-center justify-center shadow-[inset_0_0_35px_rgba(139,123,255,0.18)] transition-colors hover:border-ion-cyan group"
              style={{
                transform: getFaceTransform(skill.face),
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            >
              <div className="w-16 h-16 rounded-xl bg-ink/80 border border-stroke flex items-center justify-center mb-4 text-ion-cyan group-hover:scale-110 group-hover:text-white transition-all shadow-[0_0_20px_rgba(94,231,255,0.2)]">
                <Icon name={skill.icon} className="w-10 h-10" />
              </div>
              <h4 className="text-lg font-bold text-text text-center tracking-tight mb-1">
                {skill.name}
              </h4>
              <span className="font-mono text-xs text-ion-cyan uppercase tracking-wider">
                {skill.category}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Floor Shadow */}
      <div
        className="w-48 h-8 rounded-[100%] bg-gradient-to-r from-transparent via-ion-cyan/20 to-transparent blur-md mt-6 pointer-events-none"
        aria-hidden="true"
      />

      {/* Interactive Tooltip Card for Active Face */}
      <div className="mt-6 w-full max-w-xs text-center p-3 rounded-lg glass-panel transition-all duration-300">
        <div className="font-mono text-xs text-ion-cyan font-semibold uppercase tracking-wider mb-1">
          {activeFace.name} • {activeFace.category}
        </div>
        <p className="text-xs text-text-muted leading-relaxed">
          {activeFace.description}
        </p>
      </div>
    </div>
  );
}
