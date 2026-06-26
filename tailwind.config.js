/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      lg: {
        min: "1034px",
      },
      md: {
        min: "768px",
        max: "1034px",
      },
      sm: {
        max: "768px",
        min: "565px",
      },
      xs: {
        max: "565px",
      },
    },
    extend: {
      fontFamily: {
        'archivo': ['var(--font-archivo)', 'Archivo', 'sans-serif'],
        'archivo-exp': ['var(--font-archivo-expanded)', 'Archivo Expanded', 'Archivo', 'sans-serif'],
        'mono': ['var(--font-jetbrains-mono)', 'JetBrains Mono', 'monospace'],
        'space-grotesk': ['var(--font-space-grotesk)', 'Space Grotesk', 'sans-serif'],
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
};