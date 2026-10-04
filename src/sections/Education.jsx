import React from "react";
import SectionTitle from "@/components/SectionTitle";
import EducationTimeline from "@/components/EducationTimeline";

export default function Education() {
  return (
    <section id="education" className="relative py-24 sm:py-32 overflow-hidden border-t border-stroke/40">
      {/* Background ambient glow */}
      <div
        className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-nebula-violet/5 blur-[150px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle
          label="Academic Foundation"
          title="Education & Qualifications"
          subtitle="Formal engineering education, computer science rigor, and foundational academic excellence."
          align="center"
        />

        <EducationTimeline />
      </div>
    </section>
  );
}
