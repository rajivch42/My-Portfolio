import React, { useState } from "react";
import Tag from "./Tag";
import { profile } from "@/data/profile";

export default function PhotoFrame({
  src = "/rajiv.png",
  alt = "Rajiv Chaurasiya",
  className = "",
}) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className={`relative flex flex-col items-center justify-end w-full ${className}`}>
      {/* Diffuse Ambient Atmospheric Glow (Static, No Animation) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[440px] sm:w-[540px] lg:w-[620px] h-[440px] sm:h-[540px] lg:h-[620px] bg-gradient-to-tr from-ion-cyan/15 via-nebula-violet/15 to-transparent blur-[120px] rounded-full pointer-events-none -z-20"
        aria-hidden="true"
      />

      {/* Static Circular Backdrop Disc Behind Rajiv */}
      <div
        className="absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[420px] lg:w-[480px] xl:w-[520px] h-[320px] sm:h-[420px] lg:h-[480px] xl:h-[520px] rounded-full bg-gradient-to-b from-ink-soft/95 via-[#0e1326]/85 to-ink/70 border border-ion-cyan/30 shadow-[inset_0_0_50px_rgba(94,231,255,0.08),0_15px_50px_rgba(0,0,0,0.8)] pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Enlarged Cutout Image Container with Smooth Bottom Fade Mask */}
      <div className="relative w-full max-w-[360px] sm:max-w-[460px] lg:max-w-[560px] xl:max-w-[620px] flex justify-center items-end group">
        {!imageError ? (
          <div
            className="relative w-full flex justify-center"
            style={{
              maskImage: "linear-gradient(to bottom, black 86%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 86%, transparent 100%)",
            }}
          >
            <img
              src={src}
              alt={alt}
              onError={() => setImageError(true)}
              className="w-full h-auto max-h-[520px] sm:max-h-[620px] lg:max-h-[700px] xl:max-h-[760px] 2xl:max-h-[820px] object-contain drop-shadow-[0_20px_45px_rgba(0,0,0,0.85)] filter transition-all duration-500 group-hover:scale-[1.02] group-hover:drop-shadow-[0_25px_50px_rgba(94,231,255,0.3)]"
              loading="eager"
            />
          </div>
        ) : (
          <div className="w-64 h-80 rounded-2xl glass-panel border border-stroke flex flex-col items-center justify-center p-6 text-center select-none">
            <div className="w-20 h-20 rounded-2xl border border-ion-cyan/40 bg-ion-cyan/10 flex items-center justify-center text-ion-cyan font-extrabold text-2xl font-mono mb-3">
              RC
            </div>
            <span className="font-mono text-sm text-text font-bold">Rajiv Chaurasiya</span>
            <span className="font-mono text-xs text-text-muted mt-1">{profile.role}</span>
          </div>
        )}

        {/* Ambient Floor Reflection */}
        <div
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-8 rounded-[100%] bg-gradient-to-r from-transparent via-ion-cyan/25 to-transparent blur-md pointer-events-none -z-10"
          aria-hidden="true"
        />

        {/* Floating Developer Badge: "Open to opportunities" */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
          <Tag variant="ember" size="sm" dot={true} className="backdrop-blur-xl bg-ink/90 border-ember/40 shadow-xl px-3 py-1.5 text-xs font-mono">
            {profile.status}
          </Tag>
        </div>
      </div>
    </div>
  );
}
