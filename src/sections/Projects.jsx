import React, { Suspense, lazy } from "react";
import SectionTitle from "@/components/SectionTitle";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

const ShootingStars = lazy(() => import("@/components/ShootingStars"));

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 sm:py-32 overflow-hidden border-t border-stroke/40">
      {/* Velocity-driven shooting stars canvas masked strictly to Projects */}
      <Suspense fallback={null}>
        <ShootingStars maxStars={20} />
      </Suspense>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle
          label="Featured Works"
          title="Projects"
          subtitle="Production systems, algorithmic simulators, and full-stack platforms built with an emphasis on performance and clean architecture."
        />

        <div className="flex flex-col">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
