import React from "react";
import { profile } from "@/data/profile";
import { links } from "@/data/links";
import { heroStats } from "@/data/stats";
import DecryptedText from "@/components/DecryptedText";
import ShinyText from "@/components/ShinyText";
import CountUp from "@/components/CountUp";
import PhotoFrame from "@/components/PhotoFrame";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import Magnet from "@/components/Magnet";
import { getLenis } from "@/lib/lenis";

export default function Home() {
  const scrollToProjects = (e) => {
    e.preventDefault();
    const target = document.getElementById("projects");
    if (!target) return;
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(target, { offset: -80 });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 sm:pt-32 pb-20 flex flex-col justify-center overflow-hidden"
    >
      {/* Subtle Background Radial Aura */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-ion-cyan/5 via-nebula-violet/5 to-transparent blur-[140px] pointer-events-none rounded-full"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          {/* Left Column */}
          <div className="order-2 lg:order-1 lg:col-span-7 xl:col-span-6 flex flex-col items-start">
            {/* Terminal greeting badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ink-soft border border-stroke text-text-muted font-mono text-xs mb-6 select-none shadow-sm">
              <span className="w-2 h-2 rounded-full bg-ion-cyan animate-pulse" />
              <span>terminal@rajiv:~</span>
              <span className="text-ion-cyan font-bold">$ cat bio.md</span>
            </div>

            {/* Name with DecryptedText (The only <h1>) */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-text leading-[1.05] mb-4">
              <DecryptedText
                text={profile.name}
                speed={35}
                maxIterations={16}
                className="text-text"
              />
            </h1>

            {/* Role with ShinyText */}
            <div className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6">
              <ShinyText text={profile.role} speed={4} className="font-display font-semibold" />
            </div>

            {/* Bio summary paragraph (max-width 65ch) */}
            <p className="text-base sm:text-lg text-text-muted max-w-[65ch] leading-relaxed mb-8">
              {profile.summary}
            </p>

            {/* 4 Primary CTAs */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-14">
              <Magnet padding={20} magnetStrength={0.3}>
                <Button
                  href="#projects"
                  onClick={scrollToProjects}
                  variant="primary"
                  size="md"
                  icon={<Icon name="arrow-up-right" className="w-4 h-4 text-ink rotate-45" />}
                  iconPosition="right"
                >
                  View Projects
                </Button>
              </Magnet>

              <Magnet padding={15} magnetStrength={0.25}>
                <Button
                  href={links.github}
                  target="_blank"
                  variant="secondary"
                  size="md"
                  icon={<Icon name="github" className="w-4 h-4 text-ion-cyan" />}
                  iconPosition="left"
                >
                  GitHub
                </Button>
              </Magnet>

              <Magnet padding={15} magnetStrength={0.25}>
                <Button
                  href={links.linkedin}
                  target="_blank"
                  variant="secondary"
                  size="md"
                  icon={<Icon name="linkedin" className="w-4 h-4 text-ion-cyan" />}
                  iconPosition="left"
                >
                  LinkedIn
                </Button>
              </Magnet>

              <Magnet padding={15} magnetStrength={0.25}>
                <Button
                  href={links.email}
                  variant="outline"
                  size="md"
                  icon={<Icon name="mail" className="w-4 h-4 text-text-muted" />}
                  iconPosition="left"
                >
                  Email
                </Button>
              </Magnet>
            </div>

            {/* 3 CountUp Stats Row with Dividers */}
            <div className="w-full grid grid-cols-3 border-t border-stroke/80 pt-8 gap-4 sm:gap-6">
              {heroStats.map((stat, idx) => (
                <div
                  key={stat.label}
                  className={`flex flex-col ${
                    idx !== 0 ? "border-l border-stroke/60 pl-4 sm:pl-6" : ""
                  }`}
                >
                  <div className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-text font-display flex items-baseline gap-0.5">
                    <CountUp
                      to={stat.value}
                      decimals={stat.decimals || 0}
                      duration={2.2}
                      className="text-text"
                    />
                    <span className="text-ion-cyan text-xl sm:text-2xl font-bold font-mono">
                      {stat.suffix}
                    </span>
                  </div>
                  <span className="font-mono text-xs sm:text-sm font-medium text-text mt-1">
                    {stat.label}
                  </span>
                  <span className="hidden sm:inline text-xs text-text-muted mt-0.5 leading-snug">
                    {stat.caption}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Enlarged Portrait */}
          <div className="order-1 lg:order-2 lg:col-span-5 xl:col-span-6 flex justify-center lg:justify-end items-end">
            <PhotoFrame src="/rajiv.png" alt={profile.name} />
          </div>
        </div>
      </div>
    </section>
  );
}
