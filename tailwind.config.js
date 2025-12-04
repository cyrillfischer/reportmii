/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        lg: "1024px",
        xl: "1200px",
        "2xl": "1400px",
      },
    },

    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },

      colors: {
        transparent: "transparent",
        white: "#ffffff",
        black: "#000000",

        gray: {
          50: "#fafafa",
          100: "#f4f4f4",
          200: "#eaeaea",
          300: "#dcdcdc",
          400: "#b9b9b9",
          500: "#8a8a8a",
          600: "#616161",
          700: "#4a4a4a",
          800: "#2e2e2e",
          900: "#1a1a1a",
        },

        mint: {
          50: "#f8fdfd",
          100: "#edf7f7",
          200: "#dff7f5",
          300: "#c5ecea",
          400: "#a8d6d4",
          500: "#7eb6b8",
          600: "#5fa0a2",
          700: "#3a7b7e",
        },

        charcoal: {
          light: "#edf0f0",
          DEFAULT: "#1b1f23",
        },
      },

      backgroundImage: {
        "gradient-mint-strong":
          "linear-gradient(180deg, rgba(126,182,184,0.18) 0%, rgba(255,255,255,1) 75%)",
      },

      borderRadius: {
        lg: "12px",
        xl: "16px",
        "2xl": "24px",
      },

      boxShadow: {
        soft: "0 4px 14px rgba(0,0,0,0.06)",
        medium: "0 8px 22px rgba(0,0,0,0.10)",
        strong: "0 12px 32px rgba(0,0,0,0.14)",
      },
    },
  },

  plugins: [
    // 🔥 CUSTOM 3D / CARD-FLIP UTILITIES
    function ({ addUtilities }) {
      addUtilities({
        ".transform-style-preserve-3d": {
          transformStyle: "preserve-3d",
        },
        ".backface-hidden": {
          backfaceVisibility: "hidden",
        },
        ".perspective-1000": {
          perspective: "1000px",
        },
        ".rotate-y-180": {
          transform: "rotateY(180deg)",
        },
      });
    },
  ],
};
