"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, MapPin, Sparkles, UserCheck } from "lucide-react";
import Image from "next/image";
import { WeddingData } from "./FeaturedSlider";

interface WeddingModalProps {
  wedding: WeddingData | null;
  onClose: () => void;
}

export default function WeddingModal({ wedding, onClose }: WeddingModalProps) {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (wedding) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [wedding]);

  return (
    <AnimatePresence>
      {wedding && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 overflow-y-auto bg-primary-bg flex justify-center custom-cursor-area"
        >
          {/* Main scrollable body */}
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { type: "spring", stiffness: 150, damping: 20 } }}
            exit={{ y: 60, opacity: 0, transition: { duration: 0.25 } }}
            className="w-full min-h-screen px-4 py-16 sm:px-8 md:px-12 lg:px-24 flex flex-col items-center relative"
          >
            {/* Floating Close Button */}
            <button
              onClick={onClose}
              className="fixed top-8 right-8 z-[60] w-14 h-14 rounded-full bg-theme-badgeBg text-theme-badgeText border border-primary-text/10 shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-transform cursor-pointer"
              title="Close Gallery"
            >
              <X className="w-6 h-6 text-theme-badgeText" />
            </button>

            {/* Back Button helper */}
            <button
              onClick={onClose}
              className="absolute top-8 left-8 text-xs font-sans tracking-widest font-semibold uppercase text-accent hover:opacity-80 transition-opacity flex items-center gap-2 cursor-pointer"
            >
              ← Back to Home
            </button>

            {/* 1. Header Information Grid */}
            <div className="w-full max-w-5xl mt-12 grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-primary-text/10 pb-12 mb-16">
              {/* Giant Serif Title */}
              <div className="md:col-span-2 flex flex-col justify-between">
                <div>
                  <span className="font-sans text-[10px] tracking-[0.3em] text-accent font-semibold uppercase block mb-3">
                    Portfolio Detail Portal
                  </span>
                  <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-primary-text leading-[1.05]">
                    {wedding.title}
                  </h1>
                </div>
                <p className="font-serif text-xl sm:text-2xl text-primary-text/70 italic leading-relaxed mt-8 max-w-2xl font-light">
                  &ldquo;{wedding.description}&rdquo;
                </p>
              </div>

              {/* Metadata Sidebar Card */}
              <div className="bg-theme-card rounded-[2rem] p-6 sm:p-8 border border-primary-text/10 shadow-xl flex flex-col justify-between gap-6">
                <div>
                  <h4 className="font-serif text-2xl font-bold border-b border-primary-text/5 pb-3 mb-5 text-primary-text">
                    Commission Spec
                  </h4>
                  
                  <div className="flex flex-col gap-4 font-sans text-xs">
                    <div className="flex items-center gap-3">
                      <UserCheck className="w-4 h-4 text-accent" />
                      <div>
                        <p className="text-primary-text/40 uppercase tracking-wider text-[9px]">Clients</p>
                        <p className="text-primary-text font-medium text-sm mt-0.5">{wedding.client}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-accent" />
                      <div>
                        <p className="text-primary-text/40 uppercase tracking-wider text-[9px]">Location</p>
                        <p className="text-primary-text font-medium text-sm mt-0.5">{wedding.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-accent" />
                      <div>
                        <p className="text-primary-text/40 uppercase tracking-wider text-[9px]">Date</p>
                        <p className="text-primary-text font-medium text-sm mt-0.5">{wedding.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-4 h-4 text-accent" />
                      <div>
                        <p className="text-primary-text/40 uppercase tracking-wider text-[9px]">Design Focus</p>
                        <p className="text-primary-text font-medium text-sm mt-0.5">{wedding.category}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-[10px] text-accent tracking-[0.2em] font-semibold uppercase italic mt-4 text-right">
                  AURELIA DESIGN STUDIO
                </div>
              </div>
            </div>

            {/* 2. Editorial Irregular Masonry Grid Layout */}
            <div className="w-full max-w-5xl">
              {/* Large Split Display (Double Column) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative h-[480px] rounded-[2.5rem] overflow-hidden border border-primary-text/10 bg-theme-card group lens-flare-hover"
                >
                  <Image
                    src={wedding.galleryImages[0]}
                    alt="Fine Art Portrait"
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-6 left-6 bg-black/40 backdrop-blur-md text-white text-[10px] font-sans tracking-widest py-1.5 px-3 rounded-full border border-white/10 uppercase">
                    01 / Portrait Capture
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="relative h-[480px] rounded-[2.5rem] overflow-hidden border border-primary-text/10 bg-theme-card group lens-flare-hover"
                >
                  <Image
                    src={wedding.galleryImages[1]}
                    alt="Detail Design"
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-6 left-6 bg-black/40 backdrop-blur-md text-white text-[10px] font-sans tracking-widest py-1.5 px-3 rounded-full border border-white/10 uppercase">
                    02 / Organic Styling
                  </div>
                </motion.div>
              </div>

              {/* Full Bleed Dramatic Display Banner */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative h-[420px] sm:h-[550px] rounded-[3rem] overflow-hidden border border-primary-text/10 bg-theme-card mb-8 group lens-flare-hover"
              >
                <Image
                  src={wedding.galleryImages[2]}
                  alt="Scenery Overview"
                  fill
                  sizes="(max-width: 1024px) 100vw, 1000px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <span className="font-sans text-[10px] text-accent tracking-[0.25em] font-semibold uppercase block mb-1">
                    Architectural Layout
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl text-white font-bold tracking-wide">
                    The Grand Ceremony Setting
                  </h3>
                </div>
              </motion.div>

              {/* Staggered Masonry (3 Columns Mixed Aspect Ratio) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Column 1: Tall Portrait */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative h-[550px] md:h-[620px] rounded-[2.5rem] overflow-hidden border border-primary-text/10 bg-theme-card group lens-flare-hover"
                >
                  <Image
                    src={wedding.galleryImages[3]}
                    alt="Detail Close-up"
                    fill
                    sizes="350px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-6 left-6 bg-black/40 backdrop-blur-md text-white text-[10px] font-sans tracking-widest py-1.5 px-3 rounded-full border border-white/10 uppercase">
                    03 / Intimate Macro
                  </div>
                </motion.div>

                {/* Column 2: Stacked Squares */}
                <div className="flex flex-col gap-8">
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative h-[290px] rounded-[2.5rem] overflow-hidden border border-primary-text/10 bg-theme-card group lens-flare-hover"
                  >
                    <Image
                      src={wedding.galleryImages[4]}
                      alt="Candid Joy"
                      fill
                      sizes="350px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute bottom-6 left-6 bg-black/40 backdrop-blur-md text-white text-[10px] font-sans tracking-widest py-1.5 px-3 rounded-full border border-white/10 uppercase">
                      04 / Candid Elegance
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative h-[290px] rounded-[2.5rem] overflow-hidden border border-primary-text/10 bg-theme-card group lens-flare-hover"
                  >
                    <Image
                      src={wedding.galleryImages[5]}
                      alt="Event Ambient"
                      fill
                      sizes="350px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute bottom-6 left-6 bg-black/40 backdrop-blur-md text-white text-[10px] font-sans tracking-widest py-1.5 px-3 rounded-full border border-white/10 uppercase">
                      05 / Ambient Sunset
                    </div>
                  </motion.div>
                </div>

                {/* Column 3: Medium Tall Portrait */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative h-[480px] md:h-[520px] rounded-[2.5rem] overflow-hidden border border-primary-text/10 bg-theme-card group lens-flare-hover"
                >
                  <Image
                    src={wedding.galleryImages[0]}
                    alt="Bridal Dressing"
                    fill
                    sizes="350px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-6 left-6 bg-black/40 backdrop-blur-md text-white text-[10px] font-sans tracking-widest py-1.5 px-3 rounded-full border border-white/10 uppercase">
                    06 / Editorial Close
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Modal Footer Callout */}
            <div className="w-full max-w-xl text-center mt-24 border-t border-primary-text/10 pt-16">
              <span className="font-serif text-3xl font-semibold italic text-primary-text">
                Inspired by this narrative?
              </span>
              <p className="font-sans text-xs text-primary-text/50 uppercase tracking-widest mt-2">
                Let&rsquo;s co-create your bespoke wedding event.
              </p>
              
              <button
                onClick={onClose}
                className="mt-8 px-8 py-3 rounded-full bg-accent text-primary-bg font-sans font-semibold tracking-wider text-xs uppercase hover:bg-accent-hover transition-colors shadow-lg cursor-pointer"
              >
                Return to Showcase
              </button>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
