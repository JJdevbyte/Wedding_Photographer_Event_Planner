"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, PanInfo } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ScanEye } from "lucide-react";

export interface WeddingData {
  id: number;
  title: string;
  location: string;
  category: string;
  image: string;
  description: string;
  client: string;
  date: string;
  galleryImages: string[];
}

export const WEDDINGS: WeddingData[] = [
  {
    id: 1,
    title: "Napa Valley Vineyard",
    location: "Helena Estate, California",
    category: " Bespoke Event Planning",
    image: "/images/hero1.png",
    description: "An elegant, sun-drenched celebration nestled among lush vineyards. A long candlelight table layout, crystal accents, and wildflower-infused runners combined rustic heritage with upscale editorial elegance.",
    client: "Charlotte & James",
    date: "September 24, 2025",
    galleryImages: ["/images/hero1.png", "/images/hero2.png", "/images/hero3.png", "/images/hero4.png", "/images/hero1.png", "/images/hero2.png"]
  },
  {
    id: 2,
    title: "The Cliffside Ravello",
    location: "Villa Cimbrone, Amalfi Coast",
    category: "Fine Art Photography",
    image: "/images/hero3.png",
    description: "Suspended between the sky and the sea, this elopement focused on architectural wisteria installations, a romantic balcony sunset portrait, and fine-art cinematic frames that immortalized classical Italian romance.",
    client: "Isabella & Lucas",
    date: "June 12, 2025",
    galleryImages: ["/images/hero3.png", "/images/hero4.png", "/images/hero1.png", "/images/hero2.png", "/images/hero3.png", "/images/hero4.png"]
  },
  {
    id: 3,
    title: "Intimate Paris Balcony",
    location: "Champs-Élysées, France",
    category: "Editorial Photography & Design",
    image: "/images/about.png",
    description: "A private, high-fashion Parisian escape. Overlooking the romantic Parisian landscape, featuring classic vintage film photography, elegant cream apparel, and soft candlelight moments capturing pure joy.",
    client: "Genevieve & Henri",
    date: "October 08, 2025",
    galleryImages: ["/images/about.png", "/images/hero1.png", "/images/hero2.png", "/images/hero3.png", "/images/hero4.png", "/images/about.png"]
  },
  {
    id: 4,
    title: "The Imperial Gardens",
    location: "Traditional Shrine, Kyoto",
    category: "Full Event Architecture",
    image: "/images/hero4.png",
    description: "A gorgeous, tranquil celebration honoring heritage and nature. Incorporating floating cherry blossom petals, traditional paper screen lights, and organic minimalist design elements for a serene ceremony.",
    client: "Emi & Kenji",
    date: "April 18, 2025",
    galleryImages: ["/images/hero4.png", "/images/hero2.png", "/images/hero3.png", "/images/hero1.png", "/images/hero4.png", "/images/hero2.png"]
  }
];

interface FeaturedSliderProps {
  onSelectWedding: (wedding: WeddingData) => void;
}

export default function FeaturedSlider({ onSelectWedding }: FeaturedSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Motion value for smooth drag translations
  const dragX = useMotionValue(0);
  const springDragX = useSpring(dragX, { stiffness: 200, damping: 24 });

  const slideWidth = 320; // Width of card + margins
  const dragThreshold = 50;

  const handleDragEnd = (_event: any, info: PanInfo) => {
    const offset = info.offset.x;
    
    if (offset < -dragThreshold && activeIndex < WEDDINGS.length - 1) {
      // Swiped Left -> go to next item
      setActiveIndex((prev) => prev + 1);
    } else if (offset > dragThreshold && activeIndex > 0) {
      // Swiped Right -> go to prev item
      setActiveIndex((prev) => prev - 1);
    }
    
    // Reset drag translation
    dragX.set(0);
  };

  const handlePrev = () => {
    if (activeIndex > 0) setActiveIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    if (activeIndex < WEDDINGS.length - 1) setActiveIndex((prev) => prev + 1);
  };

  // Center alignment offset
  const getCenterOffset = () => {
    if (typeof window !== "undefined") {
      const containerWidth = containerRef.current?.offsetWidth || window.innerWidth;
      return (containerWidth - 320) / 2; // Card width is 300px + 20px padding
    }
    return 0;
  };

  const [centerOffset, setCenterOffset] = useState(0);

  useEffect(() => {
    setCenterOffset(getCenterOffset());
    
    const handleResize = () => {
      setCenterOffset(getCenterOffset());
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeIndex]);

  return (
    <div className="relative w-full overflow-hidden py-16 flex flex-col items-center">
      {/* Dynamic Title / Headline that updates based on selection */}
      <div className="text-center mb-12 max-w-xl px-6">
        <span className="font-sans text-[10px] tracking-[0.3em] text-accent font-semibold uppercase">
          Featured Commissions
        </span>
        <h2 className="font-serif text-4xl sm:text-5xl mt-2 text-primary-text font-bold">
          {WEDDINGS[activeIndex].title}
        </h2>
        <p className="font-sans text-xs text-primary-text/40 tracking-widest mt-2 uppercase">
          {WEDDINGS[activeIndex].location}
        </p>
      </div>

      {/* Main Draggable Area */}
      <div 
        ref={containerRef} 
        className="w-full relative h-[480px] flex items-center cursor-grab active:cursor-grabbing select-none"
      >
        <motion.div
          drag="x"
          dragConstraints={{ left: -((WEDDINGS.length - 1) * slideWidth), right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          style={{ x: springDragX }}
          animate={{
            x: centerOffset - activeIndex * slideWidth,
          }}
          transition={{ type: "spring", stiffness: 180, damping: 22 }}
          className="flex gap-8 px-4"
        >
          {WEDDINGS.map((wedding, index) => {
            const distance = index - activeIndex;
            const isActive = distance === 0;
            
            // Calculate 3D tilt
            // Inactive left tilts counter-clockwise, inactive right tilts clockwise.
            let rotate = 0;
            if (distance < 0) rotate = -7;
            if (distance > 0) rotate = 7;

            // Animate scale & opacity
            const scale = isActive ? 1 : 0.88;
            const opacity = isActive ? 1 : 0.45;

            return (
              <motion.div
                key={wedding.id}
                animate={{
                  rotate,
                  scale,
                  opacity,
                }}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
                onClick={() => {
                  if (isActive) {
                    onSelectWedding(wedding);
                  } else {
                    setActiveIndex(index);
                  }
                }}
                className={`w-[290px] sm:w-[320px] h-[400px] flex-shrink-0 bg-theme-card rounded-[2.5rem] p-4 border border-primary-text/10 shadow-xl flex flex-col justify-between relative overflow-hidden transition-all duration-300 group`}
              >
                {/* Image panel */}
                <div className="relative w-full h-[72%] rounded-[1.75rem] overflow-hidden bg-primary-bg border border-primary-text/5">
                  <Image
                    src={wedding.image}
                    alt={wedding.title}
                    fill
                    sizes="320px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  
                  {/* Circular Hover Inspect Button */}
                  {isActive && (
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <motion.div
                        initial={{ scale: 0.8 }}
                        whileHover={{ scale: 1.1 }}
                        className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-lg border border-black/10 cursor-pointer"
                      >
                        <ScanEye className="w-6 h-6 text-[#1c1c1c]" />
                      </motion.div>
                    </div>
                  )}
                </div>

                {/* Info panel */}
                <div className="h-[24%] flex flex-col justify-between px-2 pt-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-serif text-lg font-semibold text-primary-text tracking-wide truncate max-w-[200px]">
                        {wedding.client}
                      </h4>
                      <p className="font-sans text-[10px] text-accent tracking-widest font-semibold uppercase mt-0.5">
                        {wedding.category}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-primary-text/40 tracking-wider font-sans border-t border-primary-text/5 pt-2">
                    <span>{wedding.date}</span>
                    <span className="uppercase text-accent font-semibold italic">Aurelia</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Navigation Arrows & Slider Indicators */}
      <div className="flex flex-col sm:flex-row items-center gap-6 mt-8">
        {/* Indicators */}
        <div className="flex gap-2">
          {WEDDINGS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === idx ? "w-8 bg-accent" : "w-2 bg-primary-text/15"
              }`}
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handlePrev}
            disabled={activeIndex === 0}
            className={`w-12 h-12 rounded-full border border-primary-text/15 flex items-center justify-center hover:bg-primary-text/5 transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed`}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            disabled={activeIndex === WEDDINGS.length - 1}
            className={`w-12 h-12 rounded-full border border-primary-text/15 flex items-center justify-center hover:bg-primary-text/5 transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed`}
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
