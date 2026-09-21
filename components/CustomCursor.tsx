"use client";

import { useEffect, useRef, useState } from "react";

const EMOJI_MAP: Record<string, string> = {
  default: "🙂",
  // play: "🎬",
  link: "🔗",
  hire: "🤙",
  point: "👉"
};

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [emoji, setEmoji] = useState(EMOJI_MAP.default);
  const currentKeyRef = useRef("default"); 

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;

    document.documentElement.classList.add("custom-cursor-active");

    const el = cursorRef.current;
    if (!el) return;
    
    el.style.opacity = "0";

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let raf = 0;

    const render = () => {
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      raf = 0;
    };

    const move = (e: PointerEvent) => {
      const target = e.target as HTMLElement;

      // 1. IF we are hovering over a YouTube video (iframe), hide the emoji and stop!
      if (target?.tagName?.toLowerCase() === "iframe") {
        el.style.opacity = "0";
        return; 
      } 
      // 2. Otherwise, make sure the emoji is visible
      else if (el.style.opacity !== "1") {
        el.style.opacity = "1";
      }

      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(render);

      const interactiveTarget = target?.closest("[data-cursor]");
      const key = interactiveTarget?.getAttribute("data-cursor") ?? "default";
      
      if (currentKeyRef.current !== key) {
        currentKeyRef.current = key;
        setEmoji(EMOJI_MAP[key] ?? EMOJI_MAP.default);
      }
    };

    // Hide if mouse leaves the browser window entirely
    const handleMouseOut = (e: MouseEvent) => {
      if (!e.relatedTarget && el) {
        el.style.opacity = "0";
      }
    };

    window.addEventListener("pointermove", move);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("mouseout", handleMouseOut);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, []);

  return (
    <div 
      ref={cursorRef} 
      className="emoji-cursor transition-opacity duration-200" 
      aria-hidden="true"
    >
      {emoji}
    </div>
  );
}