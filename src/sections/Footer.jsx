import React from "react";
import { profile } from "@/data/profile";
import { socials } from "@/data/socials";
import Icon from "@/components/Icon";
import Magnet from "@/components/Magnet";
import Button from "@/components/Button";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-stroke bg-ink-soft/40 py-16 sm:py-20 overflow-hidden">
      {/* Background Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-ion-cyan/5 blur-[120px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10 flex flex-col items-center">
        {/* Monogram Badge */}
        <div className="w-12 h-12 rounded-xl glass-panel flex items-center justify-center text-ion-cyan font-mono font-bold text-lg mb-6 shadow-[0_0_20px_rgba(94,231,255,0.15)]">
          RC
        </div>

        {/* Closing Punchline */}
        <h3 className="text-2xl sm:text-3xl font-extrabold text-text tracking-tight mb-3">
          Designed with precision. Engineered for scale.
        </h3>
        <p className="text-text-muted text-base max-w-[55ch] mb-8 leading-relaxed">
          Open to software engineering roles, full-stack opportunities, and technical collaborations. Let’s build something remarkable.
        </p>

        {/* Email CTA */}
        <div className="mb-10">
          <Button
            href={`mailto:${profile.email}`}
            variant="primary"
            size="lg"
            icon={<Icon name="mail" className="w-5 h-5 text-ink" />}
            iconPosition="left"
          >
            {profile.email}
          </Button>
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-12">
          {socials.map((social) => (
            <Magnet key={social.name} padding={15} magnetStrength={0.3}>
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="w-11 h-11 rounded-lg glass-panel flex items-center justify-center text-text-muted hover:text-ion-cyan hover:border-ion-cyan/40 transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <Icon name={social.icon} className="w-5 h-5" />
              </a>
            </Magnet>
          ))}
        </div>

        {/* Bottom Credits & Built With */}
        <div className="pt-8 border-t border-stroke/60 w-full flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-text-muted gap-4">
          <p>© {currentYear} Rajiv Chaurasiya. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span>Built with React 18, Tailwind, GSAP & Lenis</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
