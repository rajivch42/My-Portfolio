import React, { useState, useEffect, useRef } from "react";
import Icon from "./Icon";
import { links } from "@/data/links";
import { profile } from "@/data/profile";
import { getLenis } from "@/lib/lenis";

const ITEMS = [
  // Sections
  { id: "sec-home", title: "Go to Home", category: "Navigation", target: "home", type: "scroll", icon: "terminal" },
  { id: "sec-skills", title: "Go to Skills & Toolkit", category: "Navigation", target: "skills", type: "scroll", icon: "code" },
  { id: "sec-projects", title: "Go to Featured Projects", category: "Navigation", target: "projects", type: "scroll", icon: "external" },
  { id: "sec-coding", title: "Go to Coding Profiles & Stats", category: "Navigation", target: "coding", type: "scroll", icon: "leetcode" },
  { id: "sec-education", title: "Go to Education Timeline", category: "Navigation", target: "education", type: "scroll", icon: "terminal" },

  // Profiles
  { id: "link-gh", title: "GitHub Profile (@rajivch42)", category: "Socials", url: links.github, type: "link", icon: "github" },
  { id: "link-li", title: "LinkedIn Profile (@rajiv-ch1403)", category: "Socials", url: links.linkedin, type: "link", icon: "linkedin" },
  { id: "link-lc", title: "LeetCode Profile (@CC_Bros)", category: "Coding", url: links.leetcode, type: "link", icon: "leetcode" },
  { id: "link-hr", title: "HackerRank Profile (@CC_Bros)", category: "Coding", url: links.hackerrank, type: "link", icon: "hackerrank" },
  { id: "link-cc", title: "CodeChef Profile (@rajiv_ch)", category: "Coding", url: links.codechef, type: "link", icon: "codechef" },

  // Live Demos
  { id: "demo-voyageur", title: "Launch Voyageur (Live Trip Planner)", category: "Projects", url: links.projects.voyageur.live, type: "link", icon: "external" },

  // Actions
  { id: "act-mail", title: `Send Email to ${profile.email}`, category: "Actions", url: links.email, type: "link", icon: "mail" },
  { id: "act-copy", title: "Copy Email Address", category: "Actions", action: "copy-email", type: "action", icon: "terminal" },
];

export default function CommandPalette({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);

  const filteredItems = ITEMS.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setCopied(false);
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  // Keyboard navigation inside palette
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          handleSelect(filteredItems[selectedIndex]);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex, filteredItems]);

  const handleSelect = (item) => {
    if (item.type === "scroll") {
      onClose();
      const target = document.getElementById(item.target);
      if (target) {
        const lenis = getLenis();
        if (lenis) {
          lenis.scrollTo(target, { offset: -80 });
        } else {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else if (item.type === "link") {
      window.open(item.url, "_blank", "noopener,noreferrer");
      onClose();
    } else if (item.action === "copy-email") {
      navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        onClose();
      }, 900);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-start justify-center pt-20 sm:pt-28 px-4 bg-ink/80 backdrop-blur-md transition-opacity duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-ink-soft/95 border border-ion-cyan/40 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_30px_rgba(94,231,255,0.15)] overflow-hidden flex flex-col animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-stroke gap-3 bg-ink/50">
          <Icon name="search" className="w-5 h-5 text-ion-cyan shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command or search..."
            className="w-full bg-transparent text-text text-sm sm:text-base outline-none font-mono placeholder:text-text-muted"
          />
          <kbd className="px-2 py-0.5 text-xs font-mono bg-white/10 text-text-muted rounded border border-white/10">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 flex flex-col gap-1">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-left transition-colors font-mono text-xs sm:text-sm ${
                    isSelected
                      ? "bg-ion-cyan text-ink font-semibold"
                      : "text-text hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      name={item.icon}
                      className={`w-4 h-4 ${
                        isSelected ? "text-ink" : "text-ion-cyan"
                      }`}
                    />
                    <span>{item.title}</span>
                  </div>
                  <span
                    className={`text-[10px] uppercase tracking-wider ${
                      isSelected ? "text-ink/80 font-bold" : "text-text-muted"
                    }`}
                  >
                    {copied && item.action === "copy-email" ? "Copied!" : item.category}
                  </span>
                </button>
              );
            })
          ) : (
            <div className="py-8 text-center text-text-muted font-mono text-xs">
              No matching commands or destinations found.
            </div>
          )}
        </div>

        {/* Footer Hint */}
        <div className="px-4 py-2 border-t border-stroke bg-ink/40 flex items-center justify-between text-[11px] font-mono text-text-muted">
          <span>Navigate with ↑ ↓ • Select with Enter</span>
          <span>Cmd+K</span>
        </div>
      </div>
    </div>
  );
}
