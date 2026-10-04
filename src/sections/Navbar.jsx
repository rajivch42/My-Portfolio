import React, { useState, useEffect } from "react";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import Icon from "@/components/Icon";
import Magnet from "@/components/Magnet";
import { getLenis } from "@/lib/lenis";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "coding", label: "Coding" },
  { id: "education", label: "Education" },
];

export default function Navbar({ onOpenPalette }) {
  const activeSection = useScrollSpy(["home", "skills", "projects", "coding", "education"]);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.getElementById(id);
    if (!target) return;

    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(target, { offset: -80 });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-ink/80 backdrop-blur-xl border-b border-stroke py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#home"
          onClick={(e) => scrollToSection(e, "home")}
          className="group flex items-center gap-2.5 font-mono text-sm tracking-widest text-text font-bold uppercase select-none focus-visible:outline-2 focus-visible:outline-ion-cyan"
        >
          <span className="w-8 h-8 rounded border border-ion-cyan/40 bg-ion-cyan/10 flex items-center justify-center text-ion-cyan text-xs group-hover:border-ion-cyan transition-colors">
            RC
          </span>
          <span className="hidden sm:inline text-text-muted group-hover:text-text transition-colors">
            rajiv.<span className="text-ion-cyan">dev</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav aria-label="Primary" className="hidden md:flex items-center gap-1 bg-ink-soft/60 border border-stroke rounded-full px-3 py-1.5 backdrop-blur-md">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <Magnet key={item.id} padding={12} magnetStrength={0.2}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => scrollToSection(e, item.id)}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-200 select-none ${
                    isActive
                      ? "text-ink font-semibold"
                      : "text-text-muted hover:text-text hover:bg-white/5"
                  }`}
                >
                  {isActive && (
                    <span
                      className="absolute inset-0 bg-ion-cyan rounded-full -z-10 shadow-[0_0_15px_rgba(94,231,255,0.4)]"
                      style={{ transition: "all 0.3s ease" }}
                    />
                  )}
                  {item.label}
                </a>
              </Magnet>
            );
          })}
        </nav>

        {/* Right Action: Command Palette trigger */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenPalette}
            aria-label="Open command palette"
            className="flex items-center gap-2 px-3 py-1.5 rounded-md glass-panel text-text-muted hover:text-text hover:border-ion-cyan/40 transition-colors text-xs font-mono"
          >
            <Icon name="search" className="w-3.5 h-3.5 text-ion-cyan" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="px-1.5 py-0.5 text-[10px] bg-white/10 rounded border border-white/10 text-text font-mono">
              ⌘K
            </kbd>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 rounded-md glass-panel text-text-muted hover:text-text"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-ink/95 border-b border-stroke px-6 py-4 backdrop-blur-xl">
          <nav className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => scrollToSection(e, item.id)}
                  className={`py-2 px-3 rounded font-mono text-sm tracking-wider ${
                    isActive
                      ? "bg-ion-cyan text-ink font-semibold"
                      : "text-text-muted hover:text-text hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
