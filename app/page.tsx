"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Compass, Menu, Heart } from "lucide-react";
import HeroStack from "@/components/HeroStack";
import FeaturedSlider, { WeddingData } from "@/components/FeaturedSlider";
import WeddingModal from "@/components/WeddingModal";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import BookingForm from "@/components/BookingForm";
import ThemeSwitcher from "@/components/ThemeSwitcher";

export default function Home() {
  const [selectedWedding, setSelectedWedding] = useState<WeddingData | null>(null);

  return (
    <main className="min-h-screen relative flex flex-col items-center selection:bg-accent/30">
      
      {/* 1. Sleek Editorial Top Navigation */}
      <header className="w-full max-w-7xl h-24 px-6 md:px-12 flex justify-between items-center z-40 relative">
        {/* Logo */}
        <motion.a 
          href="#"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif text-2xl font-bold tracking-[0.2em] text-primary-text uppercase"
        >
          AURELIA
        </motion.a>

        {/* Links */}
        <nav className="hidden md:flex gap-10 font-sans text-[11px] tracking-[0.25em] font-semibold text-primary-text/60 uppercase">
          <a href="#showcase" className="hover:text-accent transition-colors">Showcase</a>
          <a href="#about" className="hover:text-accent transition-colors">Philosophy</a>
          <a href="#services" className="hover:text-accent transition-colors">Rates</a>
          <a href="#booking" className="hover:text-accent transition-colors">Inquire</a>
        </nav>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4"
        >
          <a 
            href="#booking" 
            className="hidden sm:inline-block px-6 py-2.5 rounded-full border border-primary-text/25 text-[10px] tracking-widest font-sans font-semibold uppercase hover:bg-primary-text/5 transition-colors"
          >
            Consultation
          </a>
          <button className="p-2 rounded-full border border-primary-text/10 hover:bg-primary-text/5 transition-colors md:hidden">
            <Menu className="w-4 h-4 text-primary-text" />
          </button>
        </motion.div>
      </header>

      {/* 2. Hero Landmark Section */}
      <section className="w-full min-h-[calc(100vh-6rem)] flex flex-col justify-between items-center py-12 relative overflow-hidden">
        
        {/* Spencer Gabor Layering Trick: Giant display text placed BEHIND the fanned card stack */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
          <motion.h1 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.05 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="font-serif text-[18vw] font-bold text-primary-text tracking-[0.1em] uppercase leading-none select-none text-center"
          >
            AURELIA
          </motion.h1>
        </div>

        {/* Ambient background particles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px] pointer-events-none z-0" />

        {/* Fanned centerpiece floating stack */}
        <div className="w-full z-10 my-auto">
          <HeroStack />
        </div>

        {/* Bottom Banner */}
        <div className="w-full max-w-7xl px-6 md:px-12 flex flex-col sm:flex-row justify-between items-center gap-6 z-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-accent/15 flex items-center justify-center animate-spin-slow">
              <Compass className="w-4 h-4 text-accent" />
            </div>
            <span className="font-sans text-[10px] tracking-[0.2em] font-semibold text-primary-text/50 uppercase">
              BASED IN NY / PARIS • AVAILABLE GLOBALLY
            </span>
          </div>

          <a 
            href="#showcase"
            className="font-sans text-[10px] tracking-[0.3em] font-bold text-accent uppercase flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            Explore Showcase <span>↓</span>
          </a>
        </div>
      </section>

      {/* 3. Featured 3D Slider Section */}
      <section id="showcase" className="w-full border-t border-primary-text/10 py-12">
        <FeaturedSlider onSelectWedding={(wedding) => setSelectedWedding(wedding)} />
      </section>

      {/* 4. Philosophy Section */}
      <AboutSection />

      {/* 5. Services & Commission Rates Grid */}
      <ServicesSection />

      {/* 6. Dynamic Stateful Booking Form */}
      <BookingForm />

      {/* 7. Minimalist Footer */}
      <footer className="w-full max-w-7xl py-12 px-6 md:px-12 border-t border-primary-text/10 flex flex-col sm:flex-row justify-between items-center gap-6 font-sans text-[10px] tracking-widest text-primary-text/40 uppercase">
        <div className="flex items-center gap-1">
          <span>&copy; {new Date().getFullYear()} AURELIA VANE. ALL RIGHTS PRESERVED.</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span>DESIGNED WITH</span>
          <Heart className="w-3.5 h-3.5 text-accent animate-pulse" />
          <span>IN PARIS</span>
        </div>
      </footer>

      {/* 8. Overlay Case Study Modal Portal */}
      <WeddingModal 
        wedding={selectedWedding} 
        onClose={() => setSelectedWedding(null)} 
      />

      {/* 9. Floating Orbit Vibe Selector */}
      <ThemeSwitcher />
    </main>
  );
}
