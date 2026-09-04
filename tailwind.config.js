/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    borderRadius: {
      none: '0px',
      DEFAULT: '0px',
      sm: '0px',
      md: '0px',
      lg: '0px',
      xl: '0px',
      '2xl': '0px',
      '3xl': '0px',
      full: '0px',
    },
    extend: {
      colors: {
        'gta-orange': '#EA7A00',
        'gta-orange-dark': '#C45E00',
        'gta-orange-light': '#F58A07',
        'gta-brown': '#2B1810',
        'gta-brown-dark': '#1A0E0A',
        'gta-brown-light': '#3D2314',
        'gta-tan': '#D4B28C',
        'gta-tan-light': '#F3E5AB',
        'gta-beige': '#F5EDE0',
        'gta-cream': '#FFF8EE',
        'gta-black': '#000000',
        'gta-dark': '#0C0C0C',
        'gta-charcoal': '#181818',
        'gta-gray': '#2A2A2A',
        'gta-gray-light': '#C8C8C8',
        'gta-green': '#2ECC71',
        'gta-green-dark': '#1E824C',
        'gta-red': '#E74C3C',
        'gta-blue': '#3498DB',
        'gta-yellow': '#F1C40F',
      },
      fontFamily: {
        pricedown: ['Pricedown', 'Impact', 'Haettenschweiler', 'Arial Black', 'sans-serif'],
        diploma: ['Diploma', 'OldEnglish', 'serif'],
        sanandreas: ['Diploma', 'OldEnglish', 'serif'],
        heading: ['"Bebas Neue"', 'Impact', 'Haettenschweiler', 'Arial Black', 'sans-serif'],
        nav: ['"Bebas Neue"', 'Impact', 'sans-serif'],
        body: ['"Trebuchet MS"', 'Arial', 'sans-serif'],
        mono: ['"Courier New"', 'monospace'],
      },
      boxShadow: {
        'gta': '3px 3px 0px #000000',
        'gta-lg': '5px 5px 0px #000000',
        'gta-sm': '2px 2px 0px #000000',
        'none': 'none',
      },
      borderWidth: {
        '3': '3px',
      }
    },
  },
  plugins: [],
}
