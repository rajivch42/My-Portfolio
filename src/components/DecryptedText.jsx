import React, { useState, useEffect } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~|}{[]:;?><";

export default function DecryptedText({
  text,
  speed = 40,
  maxIterations = 15,
  sequential = true,
  revealDirection = "start",
  useOriginalCharsOnly = false,
  className = "",
  parentClassName = "",
  encryptedClassName = "text-ion-cyan/70 font-mono",
  animateOn = "mount",
  ...props
}) {
  const [displayText, setDisplayText] = useState(text);
  const [isDecrypted, setIsDecrypted] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayText(text);
      setIsDecrypted(true);
      return;
    }

    let interval = null;
    let iteration = 0;
    const originalText = text;

    interval = setInterval(() => {
      setDisplayText((current) =>
        originalText
          .split("")
          .map((letter, index) => {
            if (letter === " ") return " ";
            if (index < iteration) {
              return originalText[index];
            }
            return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
          })
          .join("")
      );

      if (iteration >= originalText.length) {
        setIsDecrypted(true);
        clearInterval(interval);
      }

      iteration += 1 / 2;
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, prefersReducedMotion]);

  return (
    <span className={`inline-block ${parentClassName}`} {...props}>
      <span className={className}>
        {displayText}
      </span>
    </span>
  );
}
