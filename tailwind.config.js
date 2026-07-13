/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        /* Обязательно через CSS-переменные next/font: голые имена 'Inter'/'Montserrat'
           ищут шрифт, установленный в системе пользователя, а не self-hosted файлы */
        sans: ['var(--font-inter)', 'Arial', 'Helvetica', 'sans-serif'],
        heading: ['var(--font-montserrat)', 'Arial', 'Helvetica', 'sans-serif'],
      },
      colors: {
        navy: {
          950: '#050d1a',
          900: '#0a192f',
          800: '#112240',
          700: '#233554',
          600: '#2d4468',
          200: '#a3b9d3',
          100: '#d1dce9',
          50:  '#e8edf4',
        },
        crimson: {
          700: '#9b1515',
          600: '#b71c1c',
          500: '#c62828',
          400: '#ef5350',
        },
        gold: {
          600: '#b8860b',
          500: '#c9a227',
          400: '#d4b045',
          300: '#e8c96a',
        },
      },
      boxShadow: {
        'soft': '0 8px 24px rgba(0, 0, 0, 0.08)',
        'soft-lg': '0 16px 48px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
};
