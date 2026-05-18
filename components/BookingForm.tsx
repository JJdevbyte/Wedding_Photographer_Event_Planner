"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Calendar, MapPin, DollarSign, Users, Sparkles, Send, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";

export default function BookingForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    partnerName: "",
    email: "",
    date: "",
    location: "",
    budget: "$15,000 - $25,000",
    guests: "50 - 100 guests",
    vibe: "ivory",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate luxury booking transmission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Trigger canvas-confetti splash!
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#d4af37", "#ecc2b6", "#d1a19d", "#ffffff", "#b85d43"]
      });
    }, 1800);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="booking" className="py-24 px-6 md:px-12 lg:px-24 w-full flex justify-center border-t border-primary-text/10 relative overflow-hidden">
      
      {/* Decorative ambient blurred blobs in background */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 rounded-full bg-accent/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 rounded-full bg-primary-text/5 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-16 items-start z-10">
        
        {/* Left Column: Heading and Details */}
        <div className="md:col-span-5 flex flex-col justify-between h-full md:sticky md:top-24">
          <div>
            <span className="font-sans text-[10px] tracking-[0.3em] text-accent font-semibold uppercase block mb-3">
              co-create your memoir
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-primary-text leading-[1.1] mb-6">
              Let&rsquo;s arrange your bespoke commission interview.
            </h2>
            <p className="font-sans text-sm text-primary-text/60 leading-relaxed font-light mb-8 max-w-sm">
              We take on a limited number of high-end wedding and event commissions annually to ensure our signature, uncompromised level of visual craftsmanship. Let&rsquo;s start the conversation.
            </p>
          </div>

          <div className="flex flex-col gap-4 font-sans text-xs border-t border-primary-text/10 pt-8 mt-4">
            <div>
              <p className="text-primary-text/40 uppercase tracking-widest text-[9px]">General Inquiry</p>
              <p className="text-primary-text font-medium text-sm mt-0.5">studio@aureliavane.com</p>
            </div>
            <div>
              <p className="text-primary-text/40 uppercase tracking-widest text-[9px]">Phone Consultation</p>
              <p className="text-primary-text font-medium text-sm mt-0.5">+1 (800) 555-AURELIA</p>
            </div>
            <div>
              <p className="text-primary-text/40 uppercase tracking-widest text-[9px]">Studio Address</p>
              <p className="text-primary-text font-medium text-sm mt-0.5">Place Vendôme, Paris / Manhattan, NY</p>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Form Box */}
        <div className="md:col-span-7 bg-theme-card rounded-[2.5rem] p-6 sm:p-8 md:p-10 border border-primary-text/10 shadow-2xl relative">
          
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {/* Inputs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-sans text-[10px] tracking-widest font-semibold uppercase text-primary-text/50">Your Full Name</label>
                    <input
                      required
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Charlotte Rose"
                      className="w-full bg-[#1c1c1c]/5 dark:bg-white/5 border border-primary-text/10 rounded-2xl py-3 px-4 text-xs font-sans focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>

                  {/* Partner Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-sans text-[10px] tracking-widest font-semibold uppercase text-primary-text/50">Partner&rsquo;s Name</label>
                    <input
                      type="text"
                      name="partnerName"
                      value={formData.partnerName}
                      onChange={handleChange}
                      placeholder="e.g. James Helena"
                      className="w-full bg-[#1c1c1c]/5 dark:bg-white/5 border border-primary-text/10 rounded-2xl py-3 px-4 text-xs font-sans focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-sans text-[10px] tracking-widest font-semibold uppercase text-primary-text/50">Email Address</label>
                  <div className="relative">
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. charlotte@domain.com"
                      className="w-full bg-[#1c1c1c]/5 dark:bg-white/5 border border-primary-text/10 rounded-2xl py-3 pl-10 pr-4 text-xs font-sans focus:outline-none focus:border-accent transition-colors"
                    />
                    <Mail className="w-4 h-4 text-primary-text/30 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Wedding Date */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-sans text-[10px] tracking-widest font-semibold uppercase text-primary-text/50">Event Date</label>
                    <div className="relative">
                      <input
                        required
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full bg-[#1c1c1c]/5 dark:bg-white/5 border border-primary-text/10 rounded-2xl py-3 pl-10 pr-4 text-xs font-sans focus:outline-none focus:border-accent transition-colors"
                      />
                      <Calendar className="w-4 h-4 text-primary-text/30 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  {/* Wedding Location */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-sans text-[10px] tracking-widest font-semibold uppercase text-primary-text/50">Event Venue/Location</label>
                    <div className="relative">
                      <input
                        required
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="e.g. Ravello, Amalfi Coast"
                        className="w-full bg-[#1c1c1c]/5 dark:bg-white/5 border border-primary-text/10 rounded-2xl py-3 pl-10 pr-4 text-xs font-sans focus:outline-none focus:border-accent transition-colors"
                      />
                      <MapPin className="w-4 h-4 text-primary-text/30 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Estimated Budget */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-sans text-[10px] tracking-widest font-semibold uppercase text-primary-text/50">Est. Investment Budget</label>
                    <div className="relative">
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full bg-[#1c1c1c]/5 dark:bg-white/5 border border-primary-text/10 rounded-2xl py-3 pl-10 pr-4 text-xs font-sans focus:outline-none focus:border-accent transition-colors appearance-none cursor-pointer"
                      >
                        <option value="$10,000 - $15,000">$10,000 - $15,000</option>
                        <option value="$15,000 - $25,000">$15,000 - $25,000</option>
                        <option value="$25,000 - $40,000">$25,000 - $40,000</option>
                        <option value="$40,000+">$40,000+</option>
                      </select>
                      <DollarSign className="w-4 h-4 text-primary-text/30 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  {/* Guest Count */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-sans text-[10px] tracking-widest font-semibold uppercase text-primary-text/50">Estimated Guests</label>
                    <div className="relative">
                      <select
                        name="guests"
                        value={formData.guests}
                        onChange={handleChange}
                        className="w-full bg-[#1c1c1c]/5 dark:bg-white/5 border border-primary-text/10 rounded-2xl py-3 pl-10 pr-4 text-xs font-sans focus:outline-none focus:border-accent transition-colors appearance-none cursor-pointer"
                      >
                        <option value="Under 50 guests">Intimate elopement (&lt; 50)</option>
                        <option value="50 - 100 guests">Mid-scale celebration (50-100)</option>
                        <option value="100 - 200 guests">Standard grand (100-200)</option>
                        <option value="200+ guests">Grand affair (200+)</option>
                      </select>
                      <Users className="w-4 h-4 text-primary-text/30 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                </div>

                {/* Vibe Selection */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-sans text-[10px] tracking-widest font-semibold uppercase text-primary-text/50">Preferred Color Palette Vibe</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { id: "ivory", label: "Ivory & Champagne" },
                      { id: "midnight", label: "Midnight Gold" },
                      { id: "sage", label: "Ethereal Sage" },
                      { id: "terracotta", label: "Sunset Rust" }
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setFormData(p => ({ ...p, vibe: item.id }))}
                        className={`py-2 px-3 rounded-xl border text-[10px] tracking-wider uppercase font-semibold font-sans transition-colors cursor-pointer text-center ${
                          formData.vibe === item.id
                            ? "bg-accent border-accent text-primary-bg"
                            : "bg-[#1c1c1c]/5 border-primary-text/10 text-primary-text/70"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-sans text-[10px] tracking-widest font-semibold uppercase text-primary-text/50">Your Visual Narrative Wishlist</label>
                  <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your wedding style, desired coverage, or special creative ideas..."
                    className="w-full bg-[#1c1c1c]/5 dark:bg-white/5 border border-primary-text/10 rounded-2xl py-3 px-4 text-xs font-sans focus:outline-none focus:border-accent transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-accent text-primary-bg py-4 rounded-full font-sans font-bold tracking-widest text-xs uppercase flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-bg/30 border-t-primary-bg rounded-full animate-spin" />
                      <span>transmitting request...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 text-primary-bg" />
                      <span>submit commission request</span>
                    </>
                  )}
                </motion.button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, transition: { type: "spring", stiffness: 150, damping: 20 } }}
                className="h-full flex flex-col items-center justify-center text-center py-16"
              >
                <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10 text-accent" />
                </div>
                <h3 className="font-serif text-3xl font-bold text-primary-text">
                  Inquiry Transmitted Successfully
                </h3>
                <p className="font-sans text-xs text-primary-text/40 tracking-widest mt-2 uppercase">
                  AURELIA VANE ARCHITECTURE STUDIO
                </p>
                <p className="font-sans text-xs text-primary-text/70 mt-6 max-w-sm leading-relaxed font-light">
                  Thank you, {formData.fullName}. Your request for the <strong className="text-accent">{formData.vibe.toUpperCase()}</strong> aesthetic on {formData.date} has been prioritized. Aurelia Vane will contact you within 24 hours to schedule a Zoom consultation.
                </p>

                <button
                  type="button"
                  onClick={() => setIsSuccess(false)}
                  className="mt-10 px-8 py-3 rounded-full border border-primary-text/15 text-primary-text text-[10px] tracking-widest font-sans font-semibold uppercase hover:bg-primary-text/5 transition-colors cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
