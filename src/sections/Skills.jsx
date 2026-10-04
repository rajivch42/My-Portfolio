import React, { Suspense, lazy } from "react";
import SectionTitle from "@/components/SectionTitle";
import { skillGroups } from "@/data/skills";

const Cube = lazy(() => import("@/components/Cube"));
const SkillCarousel = lazy(() => import("@/components/SkillCarousel"));

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 sm:py-32 overflow-hidden border-t border-stroke/40">
      {/* Background Accent glow */}
      <div
        className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-nebula-violet/5 blur-[140px] rounded-full pointer-events-none -translate-y-1/2"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle
          label="Technical Toolkit"
          title="Skills & Technologies"
          subtitle="Specialized in building full-stack platforms, scalable cloud services, and algorithmic problem-solving."
        />

        {/* 2-Column Interactive Visual Centrepiece (Cube left, Carousel right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center mb-20">
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="w-full flex justify-center">
              <Suspense
                fallback={
                  <div className="w-[260px] h-[260px] rounded-2xl glass-panel animate-pulse flex items-center justify-center text-text-muted font-mono text-xs">
                    Loading 3D Engine...
                  </div>
                }
              >
                <Cube />
              </Suspense>
            </div>
            <p className="font-mono text-xs text-text-muted mt-2 text-center">
              <span className="text-ion-cyan">✦</span> Hover or drag cube to inspect technologies
            </p>
          </div>

          <div className="lg:col-span-7 flex flex-col items-center justify-center">
            <div className="w-full">
              <Suspense
                fallback={
                  <div className="w-full h-[380px] rounded-2xl glass-panel animate-pulse flex items-center justify-center text-text-muted font-mono text-xs">
                    Initializing Carousel...
                  </div>
                }
              >
                <SkillCarousel />
              </Suspense>
            </div>
            <p className="font-mono text-xs text-text-muted mt-2 text-center">
              <span className="text-ion-cyan">✦</span> Drag to spin ring • Hover to pause
            </p>
          </div>
        </div>

        {/* 4 Plain-Text Skill Groups (No boxes, clean typography per design.md) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-12 border-t border-stroke/60">
          {skillGroups.map((group) => (
            <div key={group.title} className="flex flex-col">
              <h3 className="font-mono text-xs uppercase tracking-widest text-ion-cyan mb-4 font-semibold">
                // {group.title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="text-base text-text-muted hover:text-text transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-stroke group-hover:bg-ion-cyan transition-colors" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
