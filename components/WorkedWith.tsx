"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { clients } from "@/data/content";

// Vibrant fallback colors if your content.ts doesn't have a 'color' property
const THEME_COLORS = [
  "#f43f5e", // Crimson
  "#facc15", // Gold
  "#2dd4bf", // Teal
  "#a855f7", // Amethyst
  "#3b82f6", // Neon Blue
  "#10b981", // Emerald
];

export default function WorkedWith() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSectionHovered, setIsSectionHovered] = useState(false);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (hoveredCardIndex !== null || isDragging) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % clients.length);
    }, 3000);
    
    return () => clearInterval(timer);
  }, [hoveredCardIndex, isDragging]);

  const paginate = (newDirection: number) => {
    setCurrentIndex((prev) => {
      let nextIndex = prev + newDirection;
      if (nextIndex < 0) nextIndex = clients.length - 1;
      if (nextIndex >= clients.length) nextIndex = 0;
      return nextIndex;
    });
  };

  const spiders = [
    { left: "15%", dropHeight: 220, delay: 0.1 },
    { left: "32.5%", dropHeight: 160, delay: 0.2 },
    { left: "50%", dropHeight: 120, delay: 0.3 },
    { left: "67.5%", dropHeight: 160, delay: 0.4 },
    { left: "85%", dropHeight: 220, delay: 0.5 },
  ];

  return (
    <section
      id="worked-with"
      className="relative border-t border-ink-line py-24 md:py-32 overflow-hidden bg-[#040814]"
      onMouseEnter={() => setIsSectionHovered(true)}
      onMouseLeave={() => setIsSectionHovered(false)}
    >
      {/* Spider Arch */}
      {spiders.map((spider, i) => (
        <motion.div
          key={`spider-${i}`}
          className="absolute flex flex-col items-center pointer-events-none z-50 transform -translate-x-1/2"
          style={{ left: spider.left }}
          initial={{ top: -300 }}
          animate={{ top: isSectionHovered ? 0 : -300 }}
          transition={{ type: "spring", stiffness: 120, damping: 12, delay: spider.delay }}
        >
          <div className="w-[1px] bg-white/20" style={{ height: `${spider.dropHeight}px` }} />
          <span className="text-3xl rotate-180 -mt-2 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">🕷️</span>
        </motion.div>
      ))}

      <div className="mx-auto max-w-shell px-6 md:px-10 mb-20 text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-4xl md:text-5xl tracking-tight text-white uppercase tracking-widest"
        >
          previous clients
          <span className="block text-xs text-white/50 tracking-[0.2em] mt-2 font-mono">
            CREATORS I&apos;VE WORKED WITH
          </span>
        </motion.h2>
      </div>

      {/* 3D Carousel Container */}
      <div className="relative h-[480px] w-full flex justify-center items-center perspective-[1200px]">
        {clients.map((client, index) => {
          let offset = index - currentIndex;
          if (offset < -Math.floor(clients.length / 2)) offset += clients.length;
          if (offset > Math.floor(clients.length / 2)) offset -= clients.length;

          const isCenter = offset === 0;
          const isHovered = hoveredCardIndex === index;

          const xOffset = offset * 150; 
          const yOffset = Math.abs(offset) * 35;
          const rotateZ = offset * 8;

          let scale = isCenter ? 1.15 : 0.85 - Math.abs(offset) * 0.05;
          let yFinal = yOffset;
          let rotateX = 0; 

          if (isHovered) {
            scale += 0.05;
            yFinal -= 20;
            rotateX = 15; 
          } else if (isCenter) {
            yFinal -= 10;
          }

          const zIndex = 50 - Math.abs(offset) + (isHovered ? 10 : 0);
          const brightness = isCenter || isHovered ? 1 : Math.max(1 - Math.abs(offset) * 0.5, 0.3);

          // Get color from data OR cycle through the vibrant fallback colors
          const themeColor = (client as any).color || THEME_COLORS[index % THEME_COLORS.length];

          return (
            <motion.div
              key={client.name}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              whileTap={{ cursor: "grabbing", scale: scale * 0.95, rotateX: 10 }} 
              onDragStart={() => setIsDragging(true)}
              onDragEnd={(e, { offset }) => {
                setIsDragging(false);
                if (offset.x <= -40) paginate(1);
                else if (offset.x >= 40) paginate(-1);
              }}
              animate={{
                x: xOffset,
                y: yFinal,
                scale: scale,
                rotateZ: rotateZ,
                rotateX: rotateX,
                zIndex: zIndex,
                filter: `brightness(${brightness})`,
              }}
              transition={{ type: "spring", stiffness: 280, damping: 22, mass: 0.8 }}
              onMouseEnter={() => setHoveredCardIndex(index)}
              onMouseLeave={() => setHoveredCardIndex(null)}
              onClick={() => { if (!isCenter) setCurrentIndex(index); }}
              style={{ 
                transformStyle: "preserve-3d",
                borderColor: (isCenter || isHovered) ? themeColor : "rgba(255,255,255,0.1)",
                // Heavy depth shadows
                boxShadow: (isCenter || isHovered) 
                  ? `0 25px 50px -12px rgba(0,0,0,0.8), 0 0 40px -10px ${themeColor}60, inset 0 0 20px -10px ${themeColor}80` 
                  : "0 10px 30px -10px rgba(0,0,0,0.8), inset 0 0 10px -5px rgba(255,255,255,0.05)"
              }}
              // Rich gradient background for depth instead of flat dark color
              className="absolute w-[240px] h-[360px] bg-gradient-to-b from-[#121829] to-[#040814] rounded-sm border flex flex-col items-center p-6 cursor-grab overflow-hidden group transition-colors duration-500"
            >
              
              {/* Shiny Hover Animation Sweep */}
              {(isCenter || isHovered) && (
                <motion.div
                  className="absolute inset-0 z-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent w-[200%]"
                  initial={{ x: "-100%", opacity: 0 }}
                  animate={{ x: "100%", opacity: 1 }}
                  transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity, repeatDelay: 2 }}
                />
              )}

              {/* Geometric Background Lines */}
              <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
                <div className="absolute top-0 left-1/2 w-[1px] h-full bg-white/30 -translate-x-1/2" />
                <div className="absolute top-1/4 left-0 w-full h-[1px] bg-white/30" />
                <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 0 80 L 120 180 L 240 80" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none" />
                  <path d="M 0 270 L 120 170 L 240 270" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none" />
                </svg>
              </div>

              {/* Top accent line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 rounded-b-md transition-colors duration-500" style={{ backgroundColor: (isCenter || isHovered) ? themeColor : "transparent" }} />

              {/* Perfect Diamond Profile Picture */}
              <div className="relative z-10 w-28 h-28 mt-4 mb-4 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                {/* Colored glowing diamond border */}
                <div 
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{ 
                    clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                    backgroundColor: themeColor,
                    opacity: (isCenter || isHovered) ? 1 : 0.2,
                    boxShadow: `0 0 20px ${themeColor}`
                  }} 
                />
                
                {/* The actual cropped image */}
                <img
                  src={client.logo}
                  alt={client.name}
                  draggable={false}
                  // Scale it down slightly (w-[96%] h-[96%]) to leave a perfect colored border edge around the image
                  className="w-[96%] h-[96%] object-cover relative z-10"
                  style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
                />
              </div>

              {/* Card Information */}
              <motion.div 
                className="relative z-10 w-full flex flex-col items-center mt-auto"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: (isCenter || isHovered) ? 1 : 0.5, y: (isCenter || isHovered) ? 0 : 10 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-bold text-white text-center mb-1 tracking-wide uppercase font-display drop-shadow-md">
                  {client.name}
                </h3>
                
                {/* Subscriber Count */}
                <p className="text-xs font-mono tracking-widest text-white/60 mb-4">
                  {client.subscribers} SUBS
                </p>

                <a
                  href={client.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => { if (!isCenter) e.preventDefault(); }}
                  style={{ 
                    backgroundColor: themeColor, 
                    color: "#000",
                    boxShadow: `0 0 15px -5px ${themeColor}`
                  }}
                  className="px-8 py-2 w-full text-center text-xs font-bold uppercase tracking-widest hover:brightness-125 transition-all duration-200 pointer-events-auto"
                >
                  View
                </a>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}