import React, { useRef, useState, useEffect } from "react";
import { carouselSkills } from "@/data/skills";
import Icon from "./Icon";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIntersection } from "@/hooks/useIntersection";

export default function SkillCarousel() {
  const containerRef = useRef(null);
  const isVisible = useIntersection(containerRef, { threshold: 0.1 });
  const prefersReducedMotion = useReducedMotion();

  const [angle, setAngle] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const currentAngle = useRef(0);

  const radius = 340; // 3D ring radius in px
  const count = carouselSkills.length;
  const step = (Math.PI * 2) / count;

  useEffect(() => {
    if (prefersReducedMotion) return;

    let animId = null;

    const animate = () => {
      if (isVisible && !isPaused && !isDragging) {
        currentAngle.current += 0.003;
        setAngle(currentAngle.current);
      }
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isVisible, isPaused, isDragging, prefersReducedMotion]);

  // Pointer drag support
  const handlePointerDown = (e) => {
    setIsDragging(true);
    startX.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const diff = clientX - startX.current;
    startX.current = clientX;
    currentAngle.current += diff * 0.005;
    setAngle(currentAngle.current);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  if (prefersReducedMotion) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-6">
        {carouselSkills.map((skill) => (
          <div
            key={skill.name}
            className="glass-panel p-3 rounded-xl flex items-center gap-3 border border-stroke"
          >
            <Icon name={skill.icon} className="w-6 h-6 text-ion-cyan shrink-0" />
            <div>
              <div className="text-sm font-semibold text-text">{skill.name}</div>
              <div className="text-[10px] font-mono text-text-muted">{skill.category}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        setIsDragging(false);
      }}
      onMouseDown={handlePointerDown}
      onMouseMove={handlePointerMove}
      onMouseUp={handlePointerUp}
      onTouchStart={handlePointerDown}
      onTouchMove={handlePointerMove}
      onTouchEnd={handlePointerUp}
      className="relative w-full h-[380px] sm:h-[420px] flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing select-none"
    >
      {/* 3D Ring Viewport */}
      <div
        className="relative w-full h-full flex items-center justify-center"
        style={{ perspective: "1000px" }}
      >
        {carouselSkills.map((skill, index) => {
          const itemAngle = angle + index * step;
          // Calculate 3D cylindrical coordinates
          const x = Math.sin(itemAngle) * radius;
          const z = Math.cos(itemAngle) * radius;
          // Normalized depth (-1 back, 1 front)
          const depth = (z + radius) / (2 * radius);
          const opacity = 0.25 + depth * 0.75;
          const scale = 0.7 + depth * 0.45;

          return (
            <div
              key={skill.name}
              className="absolute flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl glass-panel border border-stroke/80 backdrop-blur-md shadow-lg transition-transform duration-75 group"
              style={{
                transform: `translate3d(${x}px, 0px, ${z}px) scale(${scale})`,
                opacity: opacity,
                zIndex: Math.floor(depth * 100),
                width: "120px",
                height: "100px",
              }}
            >
              <div className="w-10 h-10 rounded-lg bg-ink/90 border border-stroke flex items-center justify-center mb-2 text-ion-cyan group-hover:text-white transition-colors">
                <Icon name={skill.icon} className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono font-bold text-text truncate text-center w-full">
                {skill.name}
              </span>
              <span className="text-[9px] font-mono text-ion-cyan/80 uppercase tracking-wider">
                {skill.category}
              </span>
            </div>
          );
        })}
      </div>

      {/* Subdued ambient center aura */}
      <div
        className="absolute w-48 h-48 rounded-full bg-ion-cyan/5 blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />
    </div>
  );
}
