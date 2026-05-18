"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, X } from "lucide-react";

type Theme = "ivory" | "midnight" | "sage" | "terracotta";

interface ThemeOption {
  id: Theme;
  name: string;
  colorClass: string;
  bgColor: string;
}

const THEMES: ThemeOption[] = [
  { id: "ivory", name: "Classic Ivory", colorClass: "bg-[#d4af37]", bgColor: "#fbf9f4" },
  { id: "midnight", name: "Midnight Glamour", colorClass: "bg-[#c5a880]", bgColor: "#0d0e12" },
  { id: "sage", name: "Ethereal Sage", colorClass: "bg-[#d1a19d]", bgColor: "#ebede4" },
  { id: "terracotta", name: "Sunset Terracotta", colorClass: "bg-[#ecc2b6]", bgColor: "#b85d43" },
];

export default function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<Theme>("ivory");

  useEffect(() => {
    // Load persisted theme
    const savedTheme = localStorage.getItem("aurelia-theme") as Theme;
    if (savedTheme && ["ivory", "midnight", "sage", "terracotta"].includes(savedTheme)) {
      setCurrentTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, []);

  const changeTheme = (themeId: Theme) => {
    setCurrentTheme(themeId);
    document.documentElement.setAttribute("data-theme", themeId);
    localStorage.setItem("aurelia-theme", themeId);
    setIsOpen(false);
  };

  // Orbit parameters for the expanded floating circles
  const getOrbitPosition = (index: number) => {
    const angle = (index * 90 + 225) * (Math.PI / 180); // Spread around top-left arc
    const radius = 80; // distance in pixels
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    };
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Small floating tooltip */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-16 right-0 bg-theme-badgeBg text-theme-badgeText text-xs py-1.5 px-3 rounded-full shadow-lg font-sans font-medium whitespace-nowrap pointer-events-none tracking-widest uppercase scale-90"
          >
            Change Vibe
          </motion.div>
        )}
      </AnimatePresence>

      {/* Theme Options Orbit */}
      <AnimatePresence>
        {isOpen && (
          <>
            {THEMES.map((theme, idx) => {
              const pos = getOrbitPosition(idx);
              return (
                <motion.button
                  key={theme.id}
                  onClick={() => changeTheme(theme.id)}
                  initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    x: pos.x,
                    y: pos.y,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      delay: idx * 0.05,
                    },
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0,
                    x: 0,
                    y: 0,
                    transition: { duration: 0.2, delay: (THEMES.length - 1 - idx) * 0.05 },
                  }}
                  whileHover={{ scale: 1.15 }}
                  className={`absolute w-12 h-12 rounded-full shadow-xl border border-primary-text/10 flex items-center justify-center cursor-pointer overflow-hidden transition-colors duration-300`}
                  style={{ backgroundColor: theme.bgColor }}
                  title={theme.name}
                >
                  <span className={`w-3.5 h-3.5 rounded-full ${theme.colorClass} shadow-inner`} />
                  
                  {/* Subtle active circle glow */}
                  {currentTheme === theme.id && (
                    <motion.div 
                      layoutId="activeThemeOutline" 
                      className="absolute inset-1 rounded-full border border-accent/60"
                      transition={{ type: "spring", stiffness: 250, damping: 25 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </>
        )}
      </AnimatePresence>

      {/* Main Palette toggle button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-theme-badgeBg text-theme-badgeText flex items-center justify-center shadow-2xl cursor-pointer border border-primary-text/10 relative"
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Palette className="w-6 h-6 text-theme-badgeText" />}
        </motion.div>
      </motion.button>
    </div>
  );
}
