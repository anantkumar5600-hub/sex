"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { projects, type Project } from "@/data/content";

function Card({
  project,
  index,
  hoveredId,
  setHoveredId,
  playingId,
  setPlayingId
}: {
  project: Project;
  index: number;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
  playingId: string | null;
  setPlayingId: (id: string | null) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  
  const [videoState, setVideoState] = useState<'idle' | 'ready' | 'playing'>('idle');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const isHovered = hoveredId === project.id;
  const isPlaying = playingId === project.id;
  // Dim the card if another card is being hovered OR if another card is playing
  const isDimmed = (hoveredId !== null && !isHovered && playingId === null) || (playingId !== null && !isPlaying);

  // Explicit grid placement matching your requested layout exactly
  let gridClass = "";
  switch (index) {
    case 0: gridClass = "md:col-span-2 md:row-span-2 md:col-start-1 md:row-start-1"; break;
    case 1: gridClass = "md:col-span-1 md:row-span-1 md:col-start-3 md:row-start-1"; break;
    case 2: gridClass = "md:col-span-1 md:row-span-1 md:col-start-3 md:row-start-2"; break;
    case 3: gridClass = "md:col-span-1 md:row-span-1 md:col-start-1 md:row-start-3"; break;
    case 4: gridClass = "md:col-span-1 md:row-span-1 md:col-start-1 md:row-start-4"; break;
    case 5: gridClass = "md:col-span-2 md:row-span-2 md:col-start-2 md:row-start-3"; break;
    default: gridClass = "md:col-span-1 md:row-span-1";
  }

  const mvX = useMotionValue(0.5);
  const mvY = useMotionValue(0.5);
  const springX = useSpring(mvX, { stiffness: 150, damping: 18, mass: 0.4 });
  const springY = useSpring(mvY, { stiffness: 150, damping: 18, mass: 0.4 });

  // Disable 3D tilt entirely while playing so the video is flat and controls are clickable
  const rotateX = useTransform(springY, [0, 1], isPlaying ? [0, 0] : [10, -10]);
  const rotateY = useTransform(springX, [0, 1], isPlaying ? [0, 0] : [-10, 10]);
  const glareX = useTransform(springX, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(springY, [0, 1], ["0%", "100%"]);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.18), transparent 55%)`;

  const handleMove = (e: React.MouseEvent) => {
    if (isPlaying) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mvX.set((e.clientX - rect.left) / rect.width);
    mvY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseEnter = () => {
    if (playingId !== null) return; // Don't trigger hover effects if a video is playing
    setHoveredId(project.id);
    if (videoState === 'idle') {
      timerRef.current = setTimeout(() => {
        setVideoState('ready');
      }, 2000);
    }
  };

  const handleMouseLeave = () => {
    if (playingId !== null) return;
    setHoveredId(null);
    if (timerRef.current) clearTimeout(timerRef.current);
    if (videoState === 'ready') setVideoState('idle');
    mvX.set(0.5);
    mvY.set(0.5);
  };

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (timerRef.current) clearTimeout(timerRef.current);
    setVideoState('playing');
    setPlayingId(project.id);
  };

  const handleExitClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setVideoState('idle');
    setPlayingId(null);
    setHoveredId(null);
  };

  const thumbnail = `https://img.youtube.com/vi/${project.youtubeId}/maxresdefault.jpg`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      // Scale up and elevate the z-index when playing for the "Popped Up" effect
      animate={{ 
        opacity: isDimmed ? 0.2 : 1, 
        scale: isPlaying ? 1.05 : isDimmed ? 0.97 : 1,
        zIndex: isPlaying ? 50 : 1
      }}
      style={{ perspective: 900 }}
      className={`relative w-full h-full ${gridClass}`}
    >
      <motion.div
        ref={ref}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMove}
        onMouseLeave={handleMouseLeave}
        style={{ 
          rotateX, 
          rotateY, 
          transformStyle: "preserve-3d",
          boxShadow: isPlaying ? "0 25px 50px -12px rgba(0, 0, 0, 0.8)" : "none" 
        }}
        className="group relative h-full w-full aspect-video overflow-hidden rounded-lg border border-ink-line bg-ink-raised transition-shadow duration-500"
      >
        {/* Custom Exit Button (Only visible when playing) */}
        {isPlaying && (
          <button
            onClick={handleExitClick}
            className="absolute top-3 right-3 z-[60] flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition-colors hover:bg-red-600 shadow-lg"
            aria-label="Exit video"
          >
            <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        )}

        {videoState === 'idle' ? (
          <>
            <img src={thumbnail} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
            
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: glareBackground }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/10 to-transparent pointer-events-none" />

            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
               <div className="w-16 h-12 bg-red-600 rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
                 <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
               </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 p-3 md:p-5 pointer-events-none">
              <div className="flex items-center gap-2 text-xs text-paper-dim mb-1">
                {/* <span>{project.category}</span> */}
                {/* <span aria-hidden></span> */}
                <span>{project.platform}</span>
              </div>
              <h3 className="font-display text-sm md:text-xl text-paper truncate">{project.title}</h3>
            </div>

            <button
              onClick={handlePlayClick}
              data-cursor="play"
              aria-label={`Play ${project.title}`}
              className="absolute inset-0 w-full h-full z-10 cursor-pointer"
            >
              <span className="sr-only">Play {project.title}</span>
            </button>
          </>
        ) : (
          <>
            <iframe
              className="absolute inset-0 h-full w-full z-20 bg-black"
              src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=${isPlaying ? 1 : 0}&controls=1&rel=0`}
              title={project.title}
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
            />
            {/* Invisible overlay during 'ready' state to capture the click and trigger the 'popped up' animation */}
            {videoState === 'ready' && (
              <div 
                onClick={handlePlayClick} 
                className="absolute inset-0 z-30 cursor-pointer" 
                aria-label="Click to play and expand"
              />
            )}
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function PreviousWork() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);

  return (
    <section id="work" className="border-t border-ink-line py-24 md:py-32">
      <div className="mx-auto max-w-shell px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
          <h2 className="font-display text-4xl md:text-5xl tracking-tight max-w-lg">Previous work</h2>
          {/* <p className="max-w-sm text-paper-dim text-sm md:text-base">
            Hover a card for 2 seconds to load the player, or click anywhere to play the video directly inline.
          </p> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-4 gap-5 md:gap-6">
          {projects.map((project, index) => (
            <Card 
              key={project.id} 
              project={project} 
              index={index} 
              hoveredId={hoveredId} 
              setHoveredId={setHoveredId}
              playingId={playingId}
              setPlayingId={setPlayingId}
            />
          ))}
        </div>
      </div>
    </section>
  );
}