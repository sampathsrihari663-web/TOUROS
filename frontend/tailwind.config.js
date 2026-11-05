/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cloud: {
          25: '#FCFDFF',
          50: '#F8FAFC',
          100: '#F0F7FF',
          150: '#E8F3FE',
          200: '#E0F0FE',
          300: '#BAE6FD',
          400: '#7DD3FC',
          500: '#38BDF8',
          600: '#0EA5E9',
          700: '#0284C7',
          800: '#0369A1',
          900: '#075985',
          950: '#082F49',
        },
        skyhaze: {
          50: '#F4F9FF',
          100: '#EBF4FF',
          200: '#DBECFE',
          300: '#BED9FA',
          400: '#91BEF4',
          500: '#609EEB',
          600: '#3B7DDF',
          700: '#2762C9',
          800: '#2350A3',
          900: '#214482',
        },
        slate: {
          850: '#151F32',
          950: '#0B1120',
        },
        gold: {
          300: '#FDE68A',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
        }
      },
      fontFamily: {
        sans: [
          'Plus Jakarta Sans',
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
      },
      boxShadow: {
        'cloud-card': '0 8px 30px -4px rgba(186, 230, 253, 0.25), 0 4px 12px -2px rgba(15, 23, 42, 0.04)',
        'cloud-card-hover': '0 20px 40px -6px rgba(56, 189, 248, 0.22), 0 8px 18px -4px rgba(15, 23, 42, 0.06)',
        'cloud-glow': '0 0 35px -5px rgba(56, 189, 248, 0.4)',
        'cloud-glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'cloud-float': '0 14px 28px rgba(14, 165, 233, 0.15), 0 10px 10px rgba(14, 165, 233, 0.08)',
      },
      animation: {
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'float-medium': 'floatSlow 4s ease-in-out infinite',
        'drift-cloud-1': 'driftCloud1 32s linear infinite',
        'drift-cloud-2': 'driftCloud2 45s linear infinite',
        'drift-cloud-3': 'driftCloud3 28s linear infinite',
        'cloud-pulse': 'cloudPulse 4s ease-in-out infinite',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        driftCloud1: {
          '0%': { transform: 'translateX(-120%)' },
          '100%': { transform: 'translateX(250%)' },
        },
        driftCloud2: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(260%)' },
        },
        driftCloud3: {
          '0%': { transform: 'translateX(-110%)' },
          '100%': { transform: 'translateX(240%)' },
        },
        cloudPulse: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.03)' },
        }
      }
    },
  },
  plugins: [],
}
