"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, Flame, Award, Heart } from "lucide-react";

interface ServiceTier {
  id: number;
  name: string;
  price: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  popular: boolean;
  tag: string;
}

export default function ServicesSection() {
  const tiers: ServiceTier[] = [
    {
      id: 1,
      name: "The Editorial Commission",
      price: "$8,500+",
      description: "Fine-art photography captured entirely on medium-format analog film and cinematic digital sensors. Crafted for design-driven couples who appreciate light, shadow, and timeless elegance.",
      features: [
        "10 Hours of Continuous Coverage",
        "Aurelia Vane as Lead Photographer",
        "Medium Format Film & Digital Capture",
        "Bespoke Leather Bound Album (12x12)",
        "Curated Online Gallery (600+ Images)",
        "Global Travel Arrangements Included"
      ],
      icon: <Award className="w-6 h-6 text-accent" />,
      popular: false,
      tag: "PHOTOGRAPHY COMMISSION"
    },
    {
      id: 2,
      name: "The Bespoke Production",
      price: "$12,000+",
      description: "Complete event architecture, planning, and concept design. We choreograph every sensory detail, from venue selection and lighting blueprints to custom floral aesthetics and timeline management.",
      features: [
        "End-to-End Planning & Concept Art",
        "Bespoke Vendor Sourcing & Contracting",
        "Complete Layout & Lighting Blueprint",
        "Full Weekend On-Site Coordination",
        "Custom Graphic Invitation Layout",
        "Design Mockups & Table Styling"
      ],
      icon: <Flame className="w-6 h-6 text-accent animate-pulse" />,
      popular: true,
      tag: "EVENT DESIGN & PLANNING"
    },
    {
      id: 3,
      name: "The Haute Memoir",
      price: "$18,000+",
      description: "Our signature elite bundle. Combining our high-fashion photography commission, complete cinematic videography, and comprehensive event design/planning in one cohesive luxury experience.",
      features: [
        "Unlimited Wedding Weekend Coverage",
        "Combined Photo & Video Package",
        "Complete Planning & Concept Production",
        "Drone Videography & Highlight Film",
        "Custom Large-Scale Floral Arch Install",
        "Pre-Wedding Couple Rehearsal Session"
      ],
      icon: <Heart className="w-6 h-6 text-accent" />,
      popular: false,
      tag: "THE SIGNATURE UNIFIED EXPERIENCE"
    }
  ];

  return (
    <section id="services" className="py-24 px-6 md:px-12 lg:px-24 w-full flex flex-col items-center border-t border-primary-text/10 bg-theme-card/10">
      <div className="w-full max-w-5xl text-center mb-16">
        <span className="font-sans text-[10px] tracking-[0.3em] text-accent font-semibold uppercase block">
          COMMISSION RATES
        </span>
        <h2 className="font-serif text-4xl sm:text-5xl mt-2 text-primary-text font-bold">
          Tailored Design Systems & Packages
        </h2>
        <p className="font-sans text-xs text-primary-text/40 tracking-widest mt-2 uppercase">
          Each commission represents a unique creative partnership
        </p>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {tiers.map((tier, index) => (
          <motion.div
            key={tier.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 120, damping: 20, delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className={`rounded-[2.5rem] bg-theme-card border p-8 flex flex-col justify-between relative shadow-xl transition-all duration-300 ${
              tier.popular 
                ? "border-accent shadow-2xl scale-[1.03] lg:scale-[1.03] z-10" 
                : "border-primary-text/10"
            }`}
          >
            {/* Popular/Featured Tag Badge */}
            {tier.popular && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-primary-bg font-sans text-[9px] font-bold tracking-[0.25em] py-1.5 px-4 rounded-full uppercase shadow-md">
                Highly Coveted
              </span>
            )}

            <div>
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="font-sans text-[9px] text-accent tracking-[0.15em] font-semibold uppercase">
                    {tier.tag}
                  </span>
                  <h4 className="font-serif text-2xl font-bold text-primary-text mt-1.5">
                    {tier.name}
                  </h4>
                </div>
                <div className="w-12 h-12 rounded-full border border-primary-text/15 flex items-center justify-center flex-shrink-0">
                  {tier.icon}
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-primary-text/10">
                <span className="font-serif text-4xl sm:text-5xl font-bold text-primary-text">
                  {tier.price}
                </span>
                <span className="font-sans text-xs text-primary-text/40 uppercase tracking-widest">Starting commission</span>
              </div>

              {/* Description */}
              <p className="font-sans text-xs text-primary-text/60 leading-relaxed font-light mb-8">
                {tier.description}
              </p>

              {/* Features List */}
              <ul className="space-y-4 mb-8">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-accent" />
                    </div>
                    <span className="font-sans text-xs text-primary-text/75 leading-relaxed font-medium">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Button */}
            <motion.a
              href="#booking"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-4 rounded-full text-center font-sans font-semibold tracking-widest text-xs uppercase transition-all duration-300 shadow-md ${
                tier.popular
                  ? "bg-accent text-primary-bg hover:bg-accent-hover"
                  : "bg-primary-text/5 text-primary-text border border-primary-text/10 hover:bg-primary-text/10"
              }`}
            >
              Inquire Commission
            </motion.a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
