/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Google Sans Flex"', '"Google Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        surface: {
          50:  '#f9f9f9',  // White
          100: '#e0e0e0',
          200: '#a7a7a7',  // Light Gray
          400: '#646464',  // Gray
          800: '#333333',  // Dark Gray
          900: '#1a1a1a',
          950: '#0d0d0d',
        },
        accent: {
          300: '#f16001',
          400: '#e85002',  // Branding Orange
          500: '#c10801',
          600: '#9a0601',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
