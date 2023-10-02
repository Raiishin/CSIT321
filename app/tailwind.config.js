/** @type {import('tailwindcss').Config} */
module.exports = {
  safelist: ['bg-red-500', 'text-3xl', 'lg:text-4xl'],
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        purple: '#343a5e',
        blue: '#1E40AF',
        'light-blue': '#3B82F6',
        'blue-500': 'rgb(59 130 246)',
        'blue-700': 'rgb(29 78 216)',
        brown: '#AC8B54',
        'light-brown': '#4C453C',
        'dark-brown': '#272320',
        'light-gray': '#d1d5db',
        'dark-gray': '#4b5563',
        red: '#ef4444',
        'light-cyan': '#9CFFE7',
        cyan: '#ccd6f6',
        'dark-cyan': '#0e7490',
        gold: '#D4B238',
        boxShadow: {
          '5xl': '1 35px 60px -15px rgba(50, 50, 50, 0.3)'
        }
      }
    }
  },
  plugins: []
};
