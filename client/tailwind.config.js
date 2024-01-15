/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        animateDot1: {
          '0%': { opacity: '0' },
          '20%': { opacity: '0' },
          '30%': { opacity: '1' },
          '90%': { opacity: '1' }
        },
        animateDot2: {
          '0%': { opacity: '0' },
          '35%': { opacity: '0' },
          '45%': { opacity: '1' },
          '90%': { opacity: '1' }
        },
        animateDot3: {
          '0%': { opacity: '0' },
          '50%': { opacity: '0' },
          '60%': { opacity: '1' },
          '90%': { opacity: '1' }
        }
      },
      animation: {
        animateDot1: 'animateDot1 2s linear infinite',
        animateDot2: 'animateDot2 2s linear infinite',
        animateDot3: 'animateDot3 2s linear infinite'
      },
      boxShadow: {
        '3xl':
          '0 1px 1px 0 rgba(65, 69, 73, 0.3), ' +
          '0 1px 3px 1px rgba(65, 69, 73, 0.15)'
      }
    }
  },
  plugins: []
};
