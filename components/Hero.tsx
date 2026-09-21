"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import MagneticButton from "@/components/MagneticButton";
import { hero } from "@/data/content";

const rotatingWords = [
  "INTEREST",
  "ATTENTION",
  "FOCUS",
  "ENGAGEMENT",
  "IMPACT",
  "RETENTION",
];

const transitionOverlayVideoUrl = "/glitch.mp4";

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [showGlitch, setShowGlitch] = useState(false);
  const glitchVideoRef = useRef<HTMLVideoElement | null>(null);

  // --- 1. MOTION VALUES (8 Grab Handles) ---
  const t = useMotionValue(0); const b = useMotionValue(0);
  const l = useMotionValue(0); const r = useMotionValue(0);
  const tlX = useMotionValue(0); const tlY = useMotionValue(0);
  const trX = useMotionValue(0); const trY = useMotionValue(0);
  const blX = useMotionValue(0); const blY = useMotionValue(0);
  const brX = useMotionValue(0); const brY = useMotionValue(0);

  // --- 2. BUMPY PHYSICS ENGINE (Extremely bouncy) ---
  const springConfig = { stiffness: 600, damping: 4, mass: 1 }; 

  const rawTop = useTransform(() => t.get() + tlY.get() + trY.get());
  const rawBottom = useTransform(() => b.get() + blY.get() + brY.get());
  const rawLeft = useTransform(() => l.get() + tlX.get() + blX.get());
  const rawRight = useTransform(() => r.get() + trX.get() + brX.get());

  const springTop = useSpring(rawTop, springConfig);
  const springBottom = useSpring(rawBottom, springConfig);
  const springLeft = useSpring(rawLeft, springConfig);
  const springRight = useSpring(rawRight, springConfig);

  // --- 3. MAP TO PHYSICAL BOUNDARY ---
  const borderTop = useTransform(springTop, (y) => `${y}px`);
  const borderBottom = useTransform(springBottom, (y) => `${-y}px`);
  const borderLeft = useTransform(springLeft, (x) => `${x}px`);
  const borderRight = useTransform(springRight, (x) => `${-x}px`);

  // --- 4. MAP TO TEXT SCALE ---
  const scaleX = useTransform(() => Math.max(0.1, 1 + (springRight.get() - springLeft.get()) / 500));
  const scaleY = useTransform(() => Math.max(0.1, 1 + (springBottom.get() - springTop.get()) / 120));

  useEffect(() => {
    const interval = setInterval(() => {
      setShowGlitch(true);
      setTimeout(() => setWordIndex((current) => (current + 1) % rotatingWords.length), 150);
      setTimeout(() => setShowGlitch(false), 650);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!showGlitch || !glitchVideoRef.current) return;
    const video = glitchVideoRef.current;
    video.currentTime = 0;
    video.play().catch(() => {});
  }, [showGlitch]);

  const nodeClass = "absolute z-30 h-3 w-3 bg-white cursor-grab active:cursor-grabbing hover:scale-150 transition-transform -ml-1.5 -mt-1.5";
  const dragConstraints = { top: 0, bottom: 0, left: 0, right: 0 };
  const dragElastic = 0.8;

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black select-none flex flex-col justify-center">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        .minecraft-font { font-family: 'Press Start 2P', monospace; }
        
        .text-3d-block {
          color: white;
          text-shadow:
            1px 1px 0px #222, 2px 2px 0px #222, 3px 3px 0px #222,
            4px 4px 0px #222, 5px 5px 0px #222, 6px 6px 0px #222,
            7px 7px 0px #222, 8px 8px 0px #222, 9px 9px 0px #222, 10px 10px 0px #222;
        }
        
        .text-3d-small {
          color: white;
          text-shadow: 1px 1px 0px #222, 2px 2px 0px #222, 3px 3px 0px #222, 4px 4px 0px #222;
        }
      `}} />

      <video className="absolute inset-0 h-full w-full object-cover" src={hero.bgVideoUrl} poster={hero.bgPoster} autoPlay muted loop playsInline />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 flex flex-col items-center justify-center px-4 md:px-10">
        <div className="relative flex flex-col items-center -rotate-3 transform origin-center">
          
          <motion.div 
            layout 
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="relative inline-flex items-center justify-center p-6 md:p-8 mt-12"
          >
            
            <motion.div style={{ scaleX, scaleY }} className="relative z-20 flex items-center justify-center origin-center bg-transparent">
              <AnimatePresence mode="popLayout">
                <motion.h1
                  key={rotatingWords[wordIndex]}
                  initial={{ opacity: 0, filter: "blur(6px)", scale: 0.9 }}
                  animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                  exit={{ opacity: 0, filter: "blur(6px)", scale: 1.1 }}
                  transition={{ duration: 0.25 }}
                  className="minecraft-font text-3d-block text-4xl md:text-6xl lg:text-[5.5rem] py-2 px-1 text-center leading-tight"
                >
                  {rotatingWords[wordIndex]}

                  {showGlitch && (
                    <motion.video
                      ref={glitchVideoRef}
                      src={transitionOverlayVideoUrl}
                      autoPlay muted playsInline preload="auto"
                      className="pointer-events-none absolute inset-0 z-30 h-full w-full object-cover mix-blend-screen"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.8 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.1 }}
                    />
                  )}
                </motion.h1>
              </AnimatePresence>
            </motion.div>

            <div className="absolute inset-0 z-30">
              <motion.div
                layout 
                className="pointer-events-none absolute border-[1.5px] border-white z-10"
                style={{ top: borderTop, bottom: borderBottom, left: borderLeft, right: borderRight }}
              >
                {/* CHANGED: Wrapped in a full-width flex container to guarantee perfect centering without translate conflicts */}
                <div className="absolute w-full flex justify-center -top-10 md:-top-12">
                  <motion.div 
                    layout 
                    className="bg-transparent text-white px-2 whitespace-nowrap"
                  >
                    <p className="minecraft-font text-lg md:text-2xl tracking-widest text-3d-small">
                      I edit
                    </p>
                  </motion.div>
                </div>

                <motion.div 
                  layout 
                  className="absolute -bottom-3 right-0 bg-white text-black px-1.5 py-0.5 text-[10px] font-bold tracking-widest uppercase"
                >
                  EDIT+
                </motion.div>
              </motion.div>

              {/* Drag Nodes */}
              <motion.div layout drag="y" dragConstraints={dragConstraints} dragElastic={dragElastic} style={{ y: t }} className={`${nodeClass} top-0 left-1/2`} />
              <motion.div layout drag="y" dragConstraints={dragConstraints} dragElastic={dragElastic} style={{ y: b }} className={`${nodeClass} bottom-0 left-1/2`} />
              <motion.div layout drag="x" dragConstraints={dragConstraints} dragElastic={dragElastic} style={{ x: l }} className={`${nodeClass} top-1/2 left-0`} />
              <motion.div layout drag="x" dragConstraints={dragConstraints} dragElastic={dragElastic} style={{ x: r }} className={`${nodeClass} top-1/2 right-0`} />
              
              <motion.div layout drag dragConstraints={dragConstraints} dragElastic={dragElastic} style={{ x: tlX, y: tlY }} className={`${nodeClass} top-0 left-0`} />
              <motion.div layout drag dragConstraints={dragConstraints} dragElastic={dragElastic} style={{ x: trX, y: trY }} className={`${nodeClass} top-0 right-0`} />
              <motion.div layout drag dragConstraints={dragConstraints} dragElastic={dragElastic} style={{ x: blX, y: blY }} className={`${nodeClass} bottom-0 left-0`} />
              <motion.div layout drag dragConstraints={dragConstraints} dragElastic={dragElastic} style={{ x: brX, y: brY }} className={`${nodeClass} bottom-0 right-0`} />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7 }}
          className="mt-20 flex flex-wrap justify-center gap-4 z-40 relative"
        >
          <MagneticButton href="#work">View my work</MagneticButton>
          <MagneticButton href="#hire">work with me</MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}