/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        serif: ['Source Serif 4', 'serif'],
      },
      colors: {
        white: {
          DEFAULT: '#FFFFFF',
          80: 'rgba(255, 255, 255, 0.8)',
          60: 'rgba(255, 255, 255, 0.6)',
          50: 'rgba(255, 255, 255, 0.5)',
          20: 'rgba(255, 255, 255, 0.2)',
          10: 'rgba(255, 255, 255, 0.1)',
          5: 'rgba(255, 255, 255, 0.05)',
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'subtle-rotate': 'subtle-rotate 10s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'subtle-rotate': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(5deg)' },
        }
      }
    },
  },
  plugins: [],
}
