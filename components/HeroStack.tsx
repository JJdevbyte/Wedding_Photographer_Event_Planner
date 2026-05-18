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
  // Store cards array where index 0 is bottom and index length-1 is top.
  const [cards, setCards] = useState<CardData[]>(INITIAL_CARDS);
  const [hovered, setHovered] = useState<number | null>(null);

  const cycleToBack = (id: number) => {
    setCards((prev) => {
      // Find the card being cycled
      const clickedCardIndex = prev.findIndex((c) => c.id === id);
      if (clickedCardIndex === -1) return prev;
      
      const updated = [...prev];
      const [card] = updated.splice(clickedCardIndex, 1);
      // Put it at the bottom of the array (rendered first, thus lowest Z-index)
      return [card, ...updated];
    });
  };

  return (
    <div className="relative w-full h-[550px] flex items-center justify-center select-none">
      {/* Decorative helper text */}
      <div className="absolute -top-12 text-center pointer-events-none">
        <span className="font-sans text-[11px] tracking-[0.25em] text-accent font-semibold uppercase">
          Interactive Deck
        </span>
        <h2 className="font-serif text-2xl mt-1 text-primary-text/60 italic">
          Hover to spread • Drag to toss
        </h2>
      </div>

      <div className="relative w-[300px] sm:w-[350px] h-[420px] flex items-center justify-center">
        {cards.map((card, index) => {
          const isTop = index === cards.length - 1;
          const isHovered = hovered === card.id;
          
          // Fan out multipliers on hover
          const rotMult = isHovered ? card.rotation * 1.6 : card.rotation;
          const offXMult = isHovered ? card.offsetX * 2.2 : card.offsetX;
          const offYMult = isHovered ? card.offsetY * 2.2 : card.offsetY;

          return (
            <InteractiveCard
              key={card.id}
              card={card}
              index={index}
              isTop={isTop}
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
  );
}

interface CardProps {
  card: CardData;
  index: number;
  isTop: boolean;
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
  rotMult,
  offXMult,
  offYMult,
  onDragEnd,
  onMouseEnter,
  onMouseLeave,
}: CardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Create responsive tilt/rotate values during dragging
  const rotateDrag = useTransform(x, [-150, 150], [-15, 15]);
  const opacityDrag = useTransform(x, [-200, -150, 0, 150, 200], [0.4, 0.9, 1, 0.9, 0.4]);

  const handleDragEnd = (_event: any, info: any) => {
    // If dragged sufficiently horizontally or vertically, toss it
    const threshold = 100;
    if (Math.abs(info.offset.x) > threshold || Math.abs(info.offset.y) > threshold) {
      onDragEnd();
    }
    // Snap back
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      drag={isTop}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.65}
      onDragEnd={handleDragEnd}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        x,
        y,
        rotate: isTop ? rotateDrag : rotMult,
        opacity: isTop ? opacityDrag : 1,
        zIndex: index + 10,
      }}
      animate={{
        x: offXMult,
        y: offYMult,
        scale: isTop ? 1.02 : 0.96 + index * 0.015,
        transition: { type: "spring", stiffness: 200, damping: 18 },
      }}
      className={`absolute w-full h-full rounded-[2.5rem] bg-theme-card p-4 shadow-2xl border border-primary-text/10 flex flex-col justify-between ${
        isTop ? "cursor-grab active:cursor-grabbing" : "pointer-events-auto"
      } select-none`}
    >
      {/* Top Banner */}
      <div className="flex justify-between items-center px-2 pt-2">
        <span className="font-sans text-[10px] tracking-[0.2em] font-semibold text-accent uppercase">
          {card.tag}
        </span>
        <div className="w-1.5 h-1.5 rounded-full bg-accent" />
      </div>

      {/* Main Image */}
      <div className="relative flex-grow my-4 rounded-[1.75rem] overflow-hidden border border-primary-text/5 bg-primary-bg">
        <Image
          src={card.image}
          alt={card.label}
          fill
          sizes="(max-width: 768px) 100vw, 350px"
          priority={isTop}
          className="object-cover pointer-events-none select-none"
        />
        {/* Subtle lens flare overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 mix-blend-overlay" />
      </div>

      {/* Bottom Information */}
      <div className="flex justify-between items-end px-2 pb-1 font-serif">
        <div className="flex flex-col">
          <span className="text-xs text-primary-text/40 font-sans tracking-wider">GALLERY CARD</span>
          <span className="text-sm font-semibold tracking-wide text-primary-text mt-0.5">
            {card.label}
          </span>
        </div>
        <span className="text-base text-accent font-semibold italic">Aurelia</span>
      </div>
    </motion.div>
  );
}
