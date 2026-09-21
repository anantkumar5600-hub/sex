"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { hireMe } from "@/data/content";

export default function HireMe() {
  // Track the current stage of the video sequence
  const [videoStage, setVideoStage] = useState<"idle" | "enter" | "loop" | "leave">("idle");
  const isHoveringRef = useRef(false);

  // Refs to control the individual video elements
  const enterVideoRef = useRef<HTMLVideoElement>(null);
  const loopVideoRef = useRef<HTMLVideoElement>(null);
  const leaveVideoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    isHoveringRef.current = true;
    setVideoStage("enter");

    // Play the enter video from the beginning
    if (enterVideoRef.current) {
      enterVideoRef.current.currentTime = 0;
      enterVideoRef.current.play().catch(() => {});
    }

    // Pause the other videos in case they were running
    if (loopVideoRef.current) loopVideoRef.current.pause();
    if (leaveVideoRef.current) leaveVideoRef.current.pause();
  };

  const handleEnterEnded = () => {
    // Once the enter video finishes, check if we are still hovering
    if (isHoveringRef.current) {
      setVideoStage("loop");
      if (loopVideoRef.current) {
        loopVideoRef.current.currentTime = 0;
        loopVideoRef.current.play().catch(() => {});
      }
    }
  };

  const handleMouseLeave = () => {
    isHoveringRef.current = false;

    // Prevent the leave video from playing if we were already fully idle
    if (videoStage === "idle") return;

    setVideoStage("leave");

    // Play the leave video from the beginning
    if (leaveVideoRef.current) {
      leaveVideoRef.current.currentTime = 0;
      leaveVideoRef.current.play().catch(() => {});
    }

    // Pause the others
    if (enterVideoRef.current) enterVideoRef.current.pause();
    if (loopVideoRef.current) loopVideoRef.current.pause();
  };

  const handleLeaveEnded = () => {
    // Reset to transparent background when the leave video finishes
    setVideoStage("idle");
  };

  return (
    <section
      id="hire"
      className="relative border-t border-ink-line py-28 md:py-40 overflow-hidden isolate"
    >
      {/* Background Videos container */}
      <div className="absolute inset-0 pointer-events-none -z-10" aria-hidden>
        {/* 1. Enter Video */}
        <video
          ref={enterVideoRef}
          src="./1.mp4"
          muted
          playsInline
          onEnded={handleEnterEnded}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            videoStage === "enter" ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* 2. Loop Video */}
        <video
          ref={loopVideoRef}
          src="./2.mp4"
          muted
          playsInline
          loop
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            videoStage === "loop" ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* 3. Leave Video */}
        <video
          ref={leaveVideoRef}
          src="./3.mp4"
          muted
          playsInline
          onEnded={handleLeaveEnded}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            videoStage === "leave" ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      <div className="relative mx-auto max-w-shell px-6 md:px-10 text-left">
        <h2 className="font-display text-4xl md:text-6xl tracking-tight max-w-3xl text-paper">
          {hireMe?.headline}
        </h2>

        <p className="mt-6 text-paper-dim max-w-2xl">
          {hireMe?.sub}
        </p>

        {/* Keeping the smooth fade-up on page scroll for the button area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col items-start gap-4"
        >
          <a
            href={hireMe?.calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hire"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-paper px-8 py-4 text-sm font-medium tracking-wide text-ink transition-colors duration-300 hover:bg-paper-dim shadow-xl relative z-10"
          >
            {hireMe?.ctaLabel}
          </a>
        </motion.div>
      </div>
    </section>
  );
}