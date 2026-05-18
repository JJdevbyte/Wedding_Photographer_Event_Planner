/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          bg: "hsl(var(--bg-primary) / <alpha-value>)",
          text: "hsl(var(--text-primary) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent-color) / <alpha-value>)",
          hover: "hsl(var(--accent-hover) / <alpha-value>)",
          muted: "hsl(var(--accent-muted) / <alpha-value>)",
        },
        theme: {
          border: "hsl(var(--border-theme))",
          card: "hsl(var(--card-bg) / <alpha-value>)",
          badgeBg: "hsl(var(--badge-bg) / <alpha-value>)",
          badgeText: "hsl(var(--badge-text) / <alpha-value>)",
          selection: "hsl(var(--selection-bg) / <alpha-value>)",
        }
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      transitionTimingFunction: {
        theme: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      transitionDuration: {
        theme: "600ms",
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
      }
    },
  },
  plugins: [],
}
