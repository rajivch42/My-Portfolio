import React, { useState, useEffect } from "react";
import Navbar from "@/sections/Navbar";
import Home from "@/sections/Home";
import Skills from "@/sections/Skills";
import Projects from "@/sections/Projects";
import Coding from "@/sections/Coding";
import Education from "@/sections/Education";
import Footer from "@/sections/Footer";

import CometCursor from "@/components/CometCursor";
import ClickSpark from "@/components/ClickSpark";
import CommandPalette from "@/components/CommandPalette";

import { initLenis, destroyLenis } from "@/lib/lenis";

export default function App() {
  const [paletteOpen, setPaletteOpen] = useState(false);

  // Initialize Lenis smooth scroll on mount
  useEffect(() => {
    const lenis = initLenis();
    return () => {
      destroyLenis();
    };
  }, []);

  // Global Cmd+K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-ink text-text relative selection:bg-ion-cyan/20 selection:text-text">
      {/* Signature Comet Cursor (Desktop only, auto-unmounts on touch/reduced-motion) */}
      <CometCursor />

      {/* Spark burst on click */}
      <ClickSpark sparkColor="#5ee7ff" sparkCount={10} sparkRadius={28} />

      {/* Sticky Glass Navigation */}
      <Navbar onOpenPalette={() => setPaletteOpen(true)} />

      {/* Main Sections */}
      <main id="main-content">
        <Home />
        <Skills />
        <Projects />
        <Coding />
        <Education />
      </main>

      {/* Footer */}
      <Footer />

      {/* Cmd+K Command Palette Modal */}
      <CommandPalette
        isOpen={paletteOpen}
        onClose={() => setPaletteOpen(false)}
      />
    </div>
  );
}
