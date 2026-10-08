import React, { useState } from "react";
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

      {/* Enlarged Cutout Image Container with Smooth Bottom Fade Mask */}
      <div className="relative w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[480px] xl:max-w-[540px] flex justify-center items-end group">
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
              className="w-full h-auto max-h-[48vh] sm:max-h-[55vh] lg:max-h-[62vh] xl:max-h-[68vh] object-contain drop-shadow-[0_20px_45px_rgba(0,0,0,0.85)] filter transition-all duration-500 group-hover:scale-[1.02] group-hover:drop-shadow-[0_25px_50px_rgba(94,231,255,0.3)]"
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
      </div>
    </div>
  );
}
