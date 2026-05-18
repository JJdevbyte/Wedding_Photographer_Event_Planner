"use client";

import React, { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";

interface CardData {
  id: number;
  image: string;
  label: string;
  tag: string;
  rotation: number;
  offsetY: number;
  offsetX: number;
}

const INITIAL_CARDS: CardData[] = [
  {
    id: 1,
    image: "/images/hero1.png",
    label: "01 / THE EMBRACE",
    tag: "PORTRAITURE",
    rotation: -8,
    offsetY: 20,
    offsetX: -30,
  },
  {
    id: 2,
    image: "/images/hero2.png",
    label: "02 / THE TABLESCAPE",
    tag: "PLANNING & DETAILS",
    rotation: 5,
    offsetY: -15,
    offsetX: 20,
  },
  {
    id: 3,
    image: "/images/hero3.png",
    label: "03 / THE MEDITERRANEAN",
    tag: "SCENIC CEREMONIES",
    rotation: -3,
    offsetY: 10,
    offsetX: -10,
  },
  {
    id: 4,
    image: "/images/hero4.png",
    label: "04 / THE BOUQUET",
    tag: "CANDID MOMENTS",
    rotation: 6,
    offsetY: 5,
    offsetX: 15,
  },
];

export default function HeroStack() {
  const [cards, setCards] = useState<CardData[]>(INITIAL_CARDS);
  const [hovered, setHovered] = useState<number | null>(null);
  const [isDeckHovered, setIsDeckHovered] = useState(false);

  const cycleToBack = (id: number) => {
    setCards((prev) => {
      const clickedCardIndex = prev.findIndex((c) => c.id === id);
      if (clickedCardIndex === -1) return prev;
      
      const updated = [...prev];
      const [card] = updated.splice(clickedCardIndex, 1);
      return [card, ...updated];
    });
  };

  return (
    <div className="relative w-full h-[550px] flex flex-col items-center justify-center select-none overflow-hidden">
      {/* Dynamic Title / Helper instructions */}
      <div className="text-center mb-6 pointer-events-none z-10">
        <span className="font-sans text-[11px] tracking-[0.25em] text-accent font-semibold uppercase">
          Curated Visual Deck
        </span>
        <h2 className="font-serif text-2xl mt-1 text-primary-text/60 italic">
          Hover to arrange proofs • Swipe active card to cycle lens
        </h2>
      </div>

      {/* Broad Hover Area for horizontal layout spread */}
      <div
        onMouseEnter={() => setIsDeckHovered(true)}
        onMouseLeave={() => {
          setIsDeckHovered(false);
          setHovered(null);
        }}
        className="relative w-full max-w-4xl h-[430px] flex items-center justify-center transition-all duration-300"
      >
        <div className="relative w-[280px] sm:w-[310px] h-[390px] flex items-center justify-center">
          {cards.map((card, index) => {
            const isTop = index === cards.length - 1;
            const isHovered = hovered === card.id;
            
            // Core calculations for dynamic planner proof layout
            let rotMult = card.rotation;
            let offXMult = card.offsetX;
            let offYMult = card.offsetY;

            if (isDeckHovered) {
              const spreadRatio = index - (cards.length - 1) / 2; // arranges cards from left to right (-1.5, -0.5, 0.5, 1.5)
              offXMult = spreadRatio * 175; // spread proofs side-by-side
              rotMult = spreadRatio * 3.5;  // give cards an elegant planner arc
              offYMult = -12;               // levitate active stack items
            } else if (isHovered) {
              rotMult = card.rotation * 1.5;
              offXMult = card.offsetX * 2.2;
              offYMult = card.offsetY * 2.2;
            }

            return (
              <InteractiveCard
                key={card.id}
                card={card}
                index={index}
                isTop={isTop}
                isHovered={isHovered}
                isDeckHovered={isDeckHovered}
                rotMult={rotMult}
                offXMult={offXMult}
                offYMult={offYMult}
                onDragEnd={() => cycleToBack(card.id)}
                onMouseEnter={() => setHovered(card.id)}
                onMouseLeave={() => setHovered(null)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

interface CardProps {
  card: CardData;
  index: number;
  isTop: boolean;
  isHovered: boolean;
  isDeckHovered: boolean;
  rotMult: number;
  offXMult: number;
  offYMult: number;
  onDragEnd: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

function InteractiveCard({
  card,
  index,
  isTop,
  isHovered,
  isDeckHovered,
  rotMult,
  offXMult,
  offYMult,
  onDragEnd,
  onMouseEnter,
  onMouseLeave,
}: CardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isFlashing, setIsFlashing] = useState(false);
  
  const rotateDrag = useTransform(x, [-150, 150], [-15, 15]);
  const opacityDrag = useTransform(x, [-200, -150, 0, 150, 200], [0.4, 0.9, 1, 0.9, 0.4]);

  const handleDragEnd = (_event: any, info: any) => {
    const threshold = 90;
    if (Math.abs(info.offset.x) > threshold || Math.abs(info.offset.y) > threshold) {
      // Trigger a bright camera flash effect
      setIsFlashing(true);
      setTimeout(() => {
        onDragEnd();
        setIsFlashing(false);
      }, 180);
    }
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      drag={isTop || isDeckHovered}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.65}
      onDragEnd={handleDragEnd}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        x,
        y,
        rotate: isTop && !isDeckHovered ? rotateDrag : rotMult,
        opacity: isTop ? opacityDrag : 1,
        zIndex: index + (isHovered ? 25 : 10),
        willChange: "transform",
      }}
      animate={{
        x: offXMult,
        y: offYMult,
        scale: isHovered 
          ? 1.05 
          : isTop 
          ? 1.02 
          : 0.94 + index * 0.015,
        transition: { type: "spring", stiffness: 220, damping: 19 },
      }}
      className={`absolute w-full h-full rounded-[2.5rem] bg-theme-card p-4 shadow-2xl border border-primary-text/10 flex flex-col justify-between select-none overflow-hidden transition-colors duration-500 ${
        isTop || isDeckHovered ? "cursor-grab active:cursor-grabbing" : "pointer-events-auto"
      }`}
    >
      {/* Camera shutter flash effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isFlashing ? [1, 0.8, 0] : 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="absolute inset-0 bg-white z-40 rounded-[2.5rem] pointer-events-none"
      />

      {/* Premium Camera Viewfinder Overlay HUD */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: (isTop || isDeckHovered) && isHovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="absolute inset-4 rounded-[1.5rem] border border-accent/25 pointer-events-none z-20 flex flex-col justify-between p-4 font-sans text-[8px] tracking-[0.15em] text-accent font-bold"
      >
        {/* Top Viewfinder Controls */}
        <div className="flex justify-between items-start">
          <div className="w-3.5 h-3.5 border-t-2 border-l-2 border-accent/50 rounded-tl-sm" />
          <div className="flex items-center gap-1.5 bg-black/50 px-2 py-0.5 rounded-full text-white/95 backdrop-blur-md border border-white/10 text-[7px] uppercase font-semibold tracking-widest scale-90">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
            <span>REC [RAW]</span>
          </div>
          <div className="w-3.5 h-3.5 border-t-2 border-r-2 border-accent/50 rounded-tr-sm" />
        </div>

        {/* Center Target Box */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
          <div className="w-10 h-10 border border-accent/30 rounded-md flex items-center justify-center backdrop-blur-[0.5px]">
            <div className="w-1.5 h-1.5 rounded-full bg-accent/70 animate-pulse" />
          </div>
          <span className="absolute -bottom-7 font-sans text-[5.5px] text-accent/60 tracking-[0.2em] uppercase whitespace-nowrap">
            AF-C LOCKED
          </span>
        </div>

        {/* Bottom Camera Indicators */}
        <div className="flex justify-between items-end">
          <div className="w-3.5 h-3.5 border-b-2 border-l-2 border-accent/50 rounded-bl-sm" />
          <div className="flex gap-4 font-sans text-[7px] text-accent/80 bg-black/50 px-3 py-1 rounded-md backdrop-blur-md border border-white/10 tracking-widest font-semibold scale-90">
            <span>1/250s</span>
            <span>f/2.8</span>
            <span>ISO 100</span>
          </div>
          <div className="w-3.5 h-3.5 border-b-2 border-r-2 border-accent/50 rounded-br-sm" />
        </div>
      </motion.div>

      {/* Top Banner Tag */}
      <div className="flex justify-between items-center px-2 pt-2">
        <span className="font-sans text-[9px] tracking-[0.25em] font-semibold text-accent uppercase">
          {card.tag}
        </span>
        <div className="w-1.5 h-1.5 rounded-full bg-accent" />
      </div>

      {/* Main Image with Parallax Shimmer Overlay */}
      <div className="relative flex-grow my-4 rounded-[1.75rem] overflow-hidden border border-primary-text/5 bg-primary-bg">
        <Image
          src={card.image}
          alt={card.label}
          fill
          sizes="(max-width: 768px) 100vw, 350px"
          priority={isTop}
          className="object-cover pointer-events-none select-none transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 mix-blend-overlay" />
      </div>

      {/* Bottom Information */}
      <div className="flex justify-between items-end px-2 pb-1 font-serif">
        <div className="flex flex-col">
          <span className="text-[9px] text-accent font-sans tracking-[0.15em] uppercase">Commission Frame</span>
          <span className="text-sm font-semibold tracking-wide text-primary-text mt-0.5">
            {card.label}
          </span>
        </div>
        <span className="text-base text-accent font-semibold italic">Aurelia</span>
      </div>
    </motion.div>
  );
}
