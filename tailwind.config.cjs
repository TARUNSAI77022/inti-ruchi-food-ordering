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
        primary: {
          light: '#FCD34D',
          DEFAULT: '#F59E0B',
          dark: '#B45309',
        },
        accent: {
          light: '#FDBA74',
          DEFAULT: '#F97316',
          dark: '#C2410C',
        },
        dark: {
          900: '#0A0A0B',
          800: '#121214',
          700: '#1C1C1F',
        },
        glass: {
          DEFAULT: 'rgba(255, 255, 255, 0.05)',
          border: 'rgba(255, 255, 255, 0.1)',
          hover: 'rgba(255, 255, 255, 0.08)',
        }
      },
      boxShadow: {
        '3d-sm': '0 10px 20px -5px rgba(0, 0, 0, 0.3)',
        '3d-lg': '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        'glass-sm': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'neumorph-dark': '8px 8px 16px #080809, -8px -8px 16px #0e0e0d',
        'glow-primary': '0 0 20px rgba(245, 158, 11, 0.4)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'premium-gradient': 'linear-gradient(135deg, #121214 0%, #0A0A0B 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'subtle-rotate': 'subtle-rotate 10s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'subtle-rotate': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(5deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        }
      }
    },
  },
  plugins: [],
}
