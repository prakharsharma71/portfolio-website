/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#17151f',
        mist: '#f8f6f1',
        line: 'rgba(23, 21, 31, 0.1)',
        violet: '#7c3aed',
        ocean: '#2563eb',
        ember: '#f97316',
      },
      boxShadow: {
        glow: '0 24px 90px rgba(124, 58, 237, 0.18)',
        soft: '0 20px 70px rgba(23, 21, 31, 0.10)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Sora', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
