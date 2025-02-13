import { RotateRight } from "@mui/icons-material";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        //1. Headers and Titles: Use this color for main headers, page titles, and primary navigation items.
        //2. Primary Buttons: Apply this color to call-to-action buttons like "Submit," "Save," or "Add New."
        //3. Active Elements: Highlight active links or menu items with this color.
        primary: {
          DEFAULT: "#008080",
          100: "#E0F2F1",
          200: "#B2DFDF",
          300: "#80CCCC",
          400: "#4DB8B8",
          500: "#008080",
          600: "#006666",
          700: "#004C4C",
          800: "#003333",
          900: "#001A1A",
        },

        // For navigation bars, sidebars, and secondary buttons. This color provides contrast without overwhelming the design.
        secondary: {
          DEFAULT: "#002147",
          100: "#E6E6FF",
          200: "#B3B3FF",
          300: "#8080FF",
          400: "#4D4DFF",
          500: "#1A1AFF",
          600: "#0000E6",
          700: "#0000B3",
          800: "#000080",
          900: "#00004D",
        },

        //1. Backgrounds: Use for the general background of the application or for specific sections like forms and cards.
        //2. Borders and Dividers: Apply to borders around input fields, cards, or as dividers between sections.
        accentPrimary: "#F0F0F0",

        //1. Text Areas: For backgrounds of text fields, modals, and popup forms.
        //2. Clean UI Elements: Use for card backgrounds, secondary buttons, and areas where you need contrast with darker colors.
        accentSecondary: "#FFFFFF",

        //1. Warning Messages: Apply to warning banners or messages that need to draw attention (e.g., “Low Stock” alerts).
        //2. Important Notifications: Use for icons or text that convey critical information or require user attention.
        accentTertiary: {
          DEFAULT: "#FF7F50",
          100: "#FFDAB9",
          200: "#FFC09E",
          300: "#FFA07A",
          400: "#FF8C66",
          500: "#FF7F50",
          600: "#FF7040",
          700: "#FF5C33",
          800: "#FF471A",
          900: "#FF3300",
        },

        //1. Primary Text: Use for all main content, body text, and important labels to ensure readability.
        //2. Headings and Subheadings: Apply to subheadings or secondary titles to create a visual hierarchy.
        textPrimary: {
          DEFAULT: "#333",
          100: "#F2F2F2",
          200: "#E6E6E6",
          300: "#c4c4c4",
          400: "#B3B3B3",
          500: "#999999",
          600: "#666666",
          700: "#4D4D4D",
          800: "#333333",
          900: "#1A1A1A",
        },

        // Secondary Text: Use for labels, metadata, or less important information like timestamps or tooltips.
        textSecondary: "#666",

        //1. Error Messages: Apply to error alerts, form validation messages, or critical warnings.
        //2. Critical Buttons: Use for buttons that perform irreversible actions like “Delete” or “Remove.”
        error: {
          DEFAULT: "#DC143C",
          100: "#ffdddd",
          200: "#feb1b1",
          300: "#ff9595",
          400: "#ff4a4a",
          500: "#DC143C",
          600: "#ba0f0f",
          700: "#8B0000",
          800: "#800000",
          900: "#660000",
        },
      },
      borderRadius: {
        small: "0.25rem",
        medium: "0.5rem",
        large: "1rem",
        extra: "1.5rem",
      },
      transitionProperty: {
        "transform-opacity": "transform, opacity",
      },
      translate: {
        4: "1rem", // Adjust the value as needed
      },
      keyframes: {
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "10%, 30%, 50%, 70%, 90%": {
            transform: "translateX(-2px)",
            rotate: "5deg",
          },
          "20%, 40%, 60%, 80%": {
            transform: "translateX(2px)",
            rotate: "-5deg",
          },
        },
        pop: {
          "0%": { transform: "scale(0)" },
          "50%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        shake: "shake 0.5s",
        shakeLonger: "shake 0.5s ease-in-out 5",
        shakeInfinite: "shake 0.5s infinite",
        popIn: "pop 0.25s ease-in-out",
        popOut: "pop 0.25s ease-in-out reverse",
        "slide-up": "slide-up 0.1s ease-out",
      },
    },
  },
  plugins: [],
};
