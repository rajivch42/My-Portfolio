import React from "react";
import SectionTitle from "@/components/SectionTitle";
import CountUp from "@/components/CountUp";
import Icon from "@/components/Icon";
import Tag from "@/components/Tag";
import Button from "@/components/Button";
import Magnet from "@/components/Magnet";
import { leetcodeStats, codechefStats, hackerrankStats } from "@/data/stats";
import { achievements } from "@/data/achievements";
import { links } from "@/data/links";

export default function Coding() {
  return (
    <section id="coding" className="relative py-24 sm:py-32 overflow-hidden border-t border-stroke/40">
      {/* Background glow */}
      <div
        className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-ion-cyan/5 blur-[140px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle
          label="Problem Solving"
          title="Coding Profiles & Achievements"
          subtitle="Proven problem-solving rigor through algorithmic competitions, verified data structure mastery, and continuous practice."
        />

        {/* 3 Platform Cards: Sequence LeetCode -> CodeChef -> HackerRank */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {/* Card 1: LeetCode (Full Real Stats) */}
          <div className="rounded-2xl glass-panel border border-ion-cyan/40 bg-ink-soft/90 p-6 sm:p-8 flex flex-col justify-between shadow-[0_0_30px_rgba(94,231,255,0.1)] relative overflow-hidden group">
            {/* Top Accent Gradient Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-ion-cyan to-nebula-violet" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#FFA116]/10 border border-[#FFA116]/30 flex items-center justify-center text-[#FFA116]">
                    <Icon name="leetcode" className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-text">LeetCode</h3>
                    <span className="font-mono text-xs text-ion-cyan">
                      {leetcodeStats.badges} Badges • @CC_Bros
                    </span>
                  </div>
                </div>
                <Tag variant="cyan" size="sm">
                  Verified
                </Tag>
              </div>

              {/* Main Rating Number */}
              <div className="mb-6 p-4 rounded-xl bg-ink/80 border border-stroke flex items-baseline justify-between">
                <div>
                  <span className="font-mono text-xs text-text-muted block mb-1">
                    Contest Rating
                  </span>
                  <div className="text-3xl sm:text-4xl font-extrabold text-text font-display flex items-baseline">
                    <CountUp to={leetcodeStats.rating} duration={2} />
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-mono text-xs text-text-muted block mb-1">
                    Total Solved
                  </span>
                  <div className="text-2xl sm:text-3xl font-bold text-ion-cyan font-mono flex items-baseline justify-end">
                    <CountUp to={leetcodeStats.solved} duration={2} suffix="+" />
                  </div>
                </div>
              </div>

              {/* Difficulty Breakdown */}
              <div className="grid grid-cols-3 gap-2.5 mb-8">
                <div className="p-3 rounded-lg bg-white/[0.03] border border-stroke text-center">
                  <span className="font-mono text-[10px] text-[#00b8a3] uppercase block mb-0.5">
                    Easy
                  </span>
                  <span className="font-mono text-base font-bold text-text">
                    <CountUp to={leetcodeStats.easy} duration={1.5} />
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-white/[0.03] border border-stroke text-center">
                  <span className="font-mono text-[10px] text-[#ffc01e] uppercase block mb-0.5">
                    Medium
                  </span>
                  <span className="font-mono text-base font-bold text-text">
                    <CountUp to={leetcodeStats.medium} duration={1.5} />
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-white/[0.03] border border-stroke text-center">
                  <span className="font-mono text-[10px] text-[#ff375f] uppercase block mb-0.5">
                    Hard
                  </span>
                  <span className="font-mono text-base font-bold text-text">
                    <CountUp to={leetcodeStats.hard} duration={1.5} />
                  </span>
                </div>
              </div>
            </div>

            <Magnet padding={15} magnetStrength={0.25} className="w-full">
              <Button
                href={links.leetcode}
                target="_blank"
                variant="primary"
                size="sm"
                className="w-full"
                icon={<Icon name="arrow-up-right" className="w-3.5 h-3.5 text-ink" />}
              >
                View LeetCode Profile
              </Button>
            </Magnet>
          </div>

          {/* Card 2: CodeChef (Contest Rating 1447, Contests 51, Questions 157) */}
          <div className="rounded-2xl glass-panel border border-ember/40 bg-ink-soft/90 p-6 sm:p-8 flex flex-col justify-between shadow-[0_0_30px_rgba(255,107,74,0.1)] relative overflow-hidden group">
            {/* Top Accent Gradient Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-ember to-[#ffb36b]" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#5B4638]/20 border border-[#5B4638]/50 flex items-center justify-center text-[#ffb36b]">
                    <Icon name="codechef" className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-text">CodeChef</h3>
                    <span className="font-mono text-xs text-ember">
                      {codechefStats.handle}
                    </span>
                  </div>
                </div>
                <Tag variant="ember" size="sm">
                  Verified
                </Tag>
              </div>

              {/* Main Rating Number & Contests */}
              <div className="mb-4 p-4 rounded-xl bg-ink/80 border border-stroke flex items-baseline justify-between">
                <div>
                  <span className="font-mono text-xs text-text-muted block mb-1">
                    Contest Rating
                  </span>
                  <div className="text-3xl sm:text-4xl font-extrabold text-text font-display flex items-baseline">
                    <CountUp to={codechefStats.rating} duration={2} />
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-mono text-xs text-text-muted block mb-1">
                    Contests
                  </span>
                  <div className="text-2xl sm:text-3xl font-bold text-ember font-mono flex items-baseline justify-end">
                    <CountUp to={codechefStats.contests} duration={2} />
                  </div>
                </div>
              </div>

              {/* Questions Metric */}
              <div className="p-4 rounded-xl bg-white/[0.03] border border-stroke flex items-center justify-between mb-8">
                <div>
                  <span className="font-mono text-xs text-text-muted block mb-0.5">
                    Questions Solved
                  </span>
                  <span className="text-xs text-text-muted/80">Platform Practice</span>
                </div>
                <div className="text-2xl font-bold text-text font-mono">
                  <CountUp to={codechefStats.questions} duration={1.5} />
                </div>
              </div>
            </div>

            <Magnet padding={15} magnetStrength={0.25} className="w-full">
              <Button
                href={links.codechef}
                target="_blank"
                variant="primary"
                size="sm"
                className="w-full"
                icon={<Icon name="arrow-up-right" className="w-3.5 h-3.5 text-ink" />}
              >
                View CodeChef Profile
              </Button>
            </Magnet>
          </div>

          {/* Card 3: HackerRank (C++ 4 Star, Java 3 Star) */}
          <div className="rounded-2xl glass-panel border border-[#00EA64]/40 bg-ink-soft/90 p-6 sm:p-8 flex flex-col justify-between shadow-[0_0_30px_rgba(0,234,100,0.08)] relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#00EA64]" />
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#00EA64]/10 border border-[#00EA64]/40 flex items-center justify-center text-[#00EA64]">
                    <Icon name="hackerrank" className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-text">HackerRank</h3>
                    <span className="font-mono text-xs text-[#00EA64]">
                      {hackerrankStats.handle}
                    </span>
                  </div>
                </div>
                <Tag variant="cyan" size="sm">
                  Verified
                </Tag>
              </div>

              {/* C++ 4 Star and Java 3 Star Skill Badges */}
              <div className="space-y-3 mb-8">
                <div className="p-4 rounded-xl bg-ink/80 border border-stroke flex items-center justify-between hover:border-[#00EA64]/40 transition-colors">
                  <div>
                    <span className="font-mono text-xs text-text-muted block mb-0.5">
                      Skill Rating
                    </span>
                    <div className="text-base sm:text-lg font-bold text-text font-display flex items-center gap-2">
                      C++
                      <span className="px-2 py-0.5 rounded-full bg-[#00EA64]/10 text-[#00EA64] text-xs font-mono border border-[#00EA64]/30">
                        4 Star
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4].map((star) => (
                      <Icon key={star} name="star" className="w-4 h-4 text-[#00EA64]" />
                    ))}
                    <Icon name="star" className="w-4 h-4 text-white/20" />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-ink/80 border border-stroke flex items-center justify-between hover:border-ion-cyan/40 transition-colors">
                  <div>
                    <span className="font-mono text-xs text-text-muted block mb-0.5">
                      Skill Rating
                    </span>
                    <div className="text-base sm:text-lg font-bold text-text font-display flex items-center gap-2">
                      Java
                      <span className="px-2 py-0.5 rounded-full bg-ion-cyan/10 text-ion-cyan text-xs font-mono border border-ion-cyan/30">
                        3 Star
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3].map((star) => (
                      <Icon key={star} name="star" className="w-4 h-4 text-ion-cyan" />
                    ))}
                    {[4, 5].map((star) => (
                      <Icon key={star} name="star" className="w-4 h-4 text-white/20" />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Magnet padding={15} magnetStrength={0.25} className="w-full">
              <Button
                href={links.hackerrank}
                target="_blank"
                variant="primary"
                size="sm"
                className="w-full"
                icon={<Icon name="arrow-up-right" className="w-3.5 h-3.5 text-ink" />}
              >
                View HackerRank Profile
              </Button>
            </Magnet>
          </div>
        </div>

        {/* Verified Achievements with Ember Left Border */}
        <div className="flex flex-col gap-4 pt-8 border-t border-stroke/60">
          <span className="font-mono text-xs uppercase tracking-widest text-ember font-semibold mb-2">
            // Verified Hackathon &amp; Contest Milestones
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-xl glass-panel bg-ink-soft/70 border-l-4 border-l-ember border border-stroke flex flex-col justify-between hover:border-ember/40 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <Tag variant="ember" size="xs" className="shrink-0">
                      {item.badge}
                    </Tag>
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs text-ion-cyan hover:underline inline-flex items-center gap-1 group/link shrink-0"
                        title="View verification link"
                      >
                        <span>Verify</span>
                        <Icon name="arrow-up-right" className="w-3 h-3 shrink-0 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                      </a>
                    )}
                  </div>

                  <div className="mb-3">
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs text-ion-cyan hover:underline leading-relaxed block break-words"
                      >
                        {item.subtitle}
                      </a>
                    ) : (
                      <span className="font-mono text-xs text-text-muted leading-relaxed block break-words">
                        {item.subtitle}
                      </span>
                    )}
                  </div>

                  <h4 className="text-base font-bold text-text mb-2 leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
