"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Camera, Sparkles, MapPin, Feather } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-6 md:px-12 lg:px-24 w-full flex justify-center border-t border-primary-text/10">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
        {/* Left Column: Interactive Portrait */}
        <div className="md:col-span-5 flex justify-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="relative w-[280px] sm:w-[320px] h-[400px] rounded-[3rem] p-4 bg-theme-card border border-primary-text/10 shadow-2xl flex flex-col justify-between group cursor-pointer"
          >
            {/* Tag */}
            <div className="flex justify-between items-center px-2">
              <span className="font-sans text-[9px] tracking-[0.2em] font-semibold text-accent uppercase">
                THE FOUNDER & ARTIST
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            </div>

            {/* Profile Photo with Shimmer Flare */}
            <div className="relative flex-grow my-4 rounded-[2rem] overflow-hidden bg-primary-bg border border-primary-text/5 lens-flare-hover">
              <Image
                src="/images/about.png"
                alt="Aurelia Vane"
                fill
                sizes="320px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Signature */}
            <div className="flex justify-between items-end px-2 pt-1 font-serif text-primary-text">
              <div>
                <p className="text-[10px] text-primary-text/40 font-sans tracking-widest uppercase">Creative Lead</p>
                <p className="text-base font-semibold tracking-wide mt-0.5">Aurelia Vane</p>
              </div>
              <span className="text-xl text-accent font-semibold italic">Aurelia</span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Editorial Bio Description */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.15 }}
          className="md:col-span-7 flex flex-col justify-center"
        >
          <span className="font-sans text-[10px] tracking-[0.3em] text-accent font-semibold uppercase block mb-3">
            The Creative Philosophy
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-primary-text leading-[1.1] mb-6">
            Bespoke memories preserved in high-fashion frameworks.
          </h2>

          <div className="font-sans text-sm text-primary-text/70 space-y-4 leading-relaxed max-w-xl font-light">
            <p>
              Hello, I&rsquo;m Aurelia. For the past decade, I have focused on capturing extraordinary couples and co-creating luxury, timeless wedding experiences. By blending fine-art editorial photography with meticulous wedding orchestration, my studio delivers bespoke memories tailored to design-conscious partners.
            </p>
            <p>
              I believe a wedding shouldn&rsquo;t just be documented; it should be celebrated like a piece of high art. Drawing inspiration from classical architecture, cinematic lighting, and modern typography, I seek raw emotional authenticity and elevated aesthetics in equal measure.
            </p>
          </div>

          {/* Core Credentials */}
          <div className="grid grid-cols-2 gap-6 mt-10 pt-8 border-t border-primary-text/10 max-w-xl">
            <div className="flex gap-3">
              <Camera className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="font-serif text-lg font-bold text-primary-text">Editorial Camera</h5>
                <p className="font-sans text-[11px] text-primary-text/50 mt-0.5">Medium format film & cinematic digital capture.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Feather className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="font-serif text-lg font-bold text-primary-text">Bespoke Curation</h5>
                <p className="font-sans text-[11px] text-primary-text/50 mt-0.5">Custom timeline layout and interior wedding styling.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="font-serif text-lg font-bold text-primary-text">Global Coverage</h5>
                <p className="font-sans text-[11px] text-primary-text/50 mt-0.5">Available for luxury commissions worldwide.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Sparkles className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="font-serif text-lg font-bold text-primary-text">Awwwards Vibe</h5>
                <p className="font-sans text-[11px] text-primary-text/50 mt-0.5">Premium, high-performance interactions.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
