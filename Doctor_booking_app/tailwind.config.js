/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFF5F9',
          100: '#FFE6F2',
          200: '#FFC2DF',
          300: '#FF9ECC',
          400: '#FF7BB9',
          500: '#FF4D8F', 
          600: '#FF1A66',
          700: '#E6004D',
          800: '#B30038',
          900: '#800028',
        },
        secondary: {
          50: '#F5F0FE',
          100: '#EBE0FD',
          200: '#D7C2FB',
          300: '#C3A3F9',
          400: '#B388EB', 
          500: '#9966E5',
          600: '#7F44DF',
          700: '#6622D9',
          800: '#5019AA',
          900: '#39127B',
        },
        accent: {
          50: '#FFF6F0',
          100: '#FFECE0',
          200: '#FFD9C2',
          300: '#FFC7A3',
          400: '#FFB085',
          500: '#FF9966',
          600: '#FF7733',
          700: '#FF5500',
          800: '#CC4400',
          900: '#993300',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 15px rgba(0, 0, 0, 0.07)',
        'hover': '0 10px 25px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}