import React, { useState } from "react";
import Button from "./Button";
import Tag from "./Tag";
import Icon from "./Icon";
import Magnet from "./Magnet";

export default function ProjectCard({ project, index }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className="relative rounded-2xl glass-panel border border-stroke/80 bg-ink-soft/80 p-6 sm:p-8 md:p-10 transition-all duration-300 hover:border-ion-cyan/40 hover:shadow-[0_10px_40px_rgba(0,0,0,0.6)] group overflow-hidden mb-12 sm:mb-16 last:mb-0"
      data-cursor-label="View"
    >
      {/* Massive Outlined Numeral (The 3rd WOW) */}
      <div
        className="project-numeral absolute top-2 right-4 sm:top-4 sm:right-8 text-7xl sm:text-9xl md:text-[11rem] opacity-35 sm:opacity-40 group-hover:opacity-65 transition-opacity duration-300 pointer-events-none select-none z-0"
        aria-hidden="true"
      >
        {project.numeral}
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left / Top on Mobile: Info & Bullets (col-span-7) */}
        <div className="lg:col-span-7 flex flex-col items-start">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs text-ion-cyan uppercase tracking-widest font-semibold">
              // Featured Project {project.numeral}
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-text tracking-tight mb-2 group-hover:text-ion-cyan transition-colors">
            {project.title}
          </h3>

          <p className="font-mono text-xs sm:text-sm text-ion-cyan/90 mb-4 font-medium">
            {project.tagline}
          </p>

          <p className="text-sm sm:text-base text-text-muted leading-relaxed mb-6 max-w-[60ch]">
            {project.description}
          </p>

          {/* 3 Technical Achievement Bullets */}
          <ul className="flex flex-col gap-2.5 mb-8 w-full">
            {project.bullets.map((bullet, idx) => (
              <li
                key={idx}
                className="text-xs sm:text-sm text-text-muted flex items-start gap-2.5 leading-relaxed"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-ion-cyan mt-1.5 shrink-0 shadow-[0_0_8px_rgba(94,231,255,0.6)]" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          {/* Tech Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag) => (
              <Tag key={tag} variant="neutral" size="sm">
                {tag}
              </Tag>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            {project.links.live && project.links.live !== "#" ? (
              <Magnet padding={12} magnetStrength={0.25}>
                <Button
                  href={project.links.live}
                  variant="primary"
                  size="sm"
                  icon={<Icon name="arrow-up-right" className="w-3.5 h-3.5 text-ink" />}
                >
                  Live Demo
                </Button>
              </Magnet>
            ) : (
              <Button
                variant="outline"
                size="sm"
                disabled
                className="opacity-60 cursor-not-allowed"
                title="Deployment in progress"
              >
                Demo Coming Soon
              </Button>
            )}

            <Magnet padding={12} magnetStrength={0.25}>
              <Button
                href={project.links.github}
                variant="secondary"
                size="sm"
                icon={<Icon name="github" className="w-3.5 h-3.5 text-ion-cyan" />}
                iconPosition="left"
              >
                Source Code
              </Button>
            </Magnet>
          </div>
        </div>

        {/* Right / Visual Preview (col-span-5) */}
        <div className="lg:col-span-5">
          <div className="relative rounded-xl p-1 sm:p-1.5 bg-gradient-to-br from-white/15 via-white/5 to-white/10 border-2 border-stroke/90 group-hover:border-ion-cyan/70 transition-all duration-300 shadow-xl shadow-black/50">
            <div className="relative rounded-lg overflow-hidden border border-white/10 bg-ink/90 aspect-video flex items-center justify-center">
              {!imageError ? (
                <img
                  src={project.image}
                  alt={`${project.title} interface preview`}
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-12 h-12 rounded-xl bg-ion-cyan/10 border border-ion-cyan/30 flex items-center justify-center text-ion-cyan mb-3">
                    <Icon name="code" className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-xs text-text font-semibold">{project.title}</span>
                  <span className="font-mono text-[10px] text-text-muted mt-1">Preview Terminal</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
