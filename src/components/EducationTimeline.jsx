import React, { useEffect, useRef } from "react";
import { education } from "@/data/education";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import Tag from "./Tag";

export default function EducationTimeline() {
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  const starRef = useRef(null);
  const cardRefs = useRef([]);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const container = containerRef.current;
    const star = starRef.current;
    const line = lineRef.current;
    if (!container || !star || !line) return;

    const ctx = gsap.context(() => {
      // Scrubbed animation: shooting star head travels down the timeline line
      const lineLength = line.clientHeight;

      gsap.fromTo(
        star,
        { y: 0, opacity: 0.2 },
        {
          y: lineLength - 20,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top 65%",
            end: "bottom 75%",
            scrub: 0.5,
            onUpdate: (self) => {
              // Light up entries as star reaches them
              const progress = self.progress;
              cardRefs.current.forEach((card, index) => {
                if (!card) return;
                const threshold = (index + 0.2) / education.length;
                if (progress >= threshold) {
                  card.classList.add("border-ion-cyan/60", "shadow-[0_0_30px_rgba(94,231,255,0.15)]");
                  card.classList.remove("border-stroke/60");
                } else {
                  card.classList.remove("border-ion-cyan/60", "shadow-[0_0_30px_rgba(94,231,255,0.15)]");
                  card.classList.add("border-stroke/60");
                }
              });
            },
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div ref={containerRef} className="relative max-w-3xl mx-auto py-8">
      {/* Central Glowing Timeline Track */}
      <div
        ref={lineRef}
        className="absolute left-4 sm:left-1/2 top-4 bottom-4 -translate-x-1/2 w-[2px] bg-gradient-to-b from-stroke via-ion-cyan/40 to-stroke/30"
        aria-hidden="true"
      >
        {/* Scrubbed Glowing Shooting Star Head */}
        {!prefersReducedMotion && (
          <div
            ref={starRef}
            className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white shadow-[0_0_20px_#5ee7ff,0_0_35px_#8b7bff] pointer-events-none flex items-center justify-center z-20"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-ion-cyan animate-ping" />
          </div>
        )}
      </div>

      {/* Timeline Entries */}
      <div className="flex flex-col gap-12 sm:gap-16">
        {education.map((item, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={item.institution}
              className={`relative flex flex-col sm:flex-row items-start ${
                isEven ? "sm:flex-row-reverse text-left sm:text-left" : "sm:flex-row text-left"
              }`}
            >
              {/* Timeline Center Node */}
              <div
                className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-ink border-2 border-ion-cyan flex items-center justify-center z-10 shadow-[0_0_10px_rgba(94,231,255,0.4)]"
                aria-hidden="true"
              >
                <div className="w-2 h-2 rounded-full bg-ion-cyan" />
              </div>

              {/* Content Card (Half-width on desktop) */}
              <div
                ref={(el) => (cardRefs.current[index] = el)}
                className={`ml-12 sm:ml-0 w-[calc(100%-3rem)] sm:w-[calc(50%-2.5rem)] rounded-2xl glass-panel bg-ink-soft/80 border border-stroke/60 p-6 sm:p-7 transition-all duration-500 hover:border-ion-cyan/50 ${
                  isEven ? "sm:mr-auto" : "sm:ml-auto"
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="font-mono text-xs text-ion-cyan font-bold tracking-wider">
                    {item.timeline}
                  </span>
                  <Tag variant="cyan" size="xs">
                    {item.grade}
                  </Tag>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-text mb-1">
                  {item.degree}
                </h3>

                <h4 className="text-sm font-semibold text-text-muted mb-3 font-mono">
                  {item.institution}
                </h4>

                <p className="text-xs sm:text-sm text-text-muted leading-relaxed mb-4">
                  {item.details}
                </p>

                <div className="flex items-center gap-1.5 font-mono text-[11px] text-text-muted/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-stroke" />
                  <span>{item.location}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
