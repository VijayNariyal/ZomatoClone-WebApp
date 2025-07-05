/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#FFF4F1',
          100: '#FFE8E1',
          200: '#FFD1C2',
          300: '#FFB394',
          400: '#FF8F66',
          500: '#FF6B35',
          600: '#E5522A',
          700: '#CC3F20',
          800: '#B32F17',
          900: '#99220F',
        },
        secondary: {
          50: '#F0FFFE',
          100: '#E0FFFC',
          200: '#C2FFF9',
          300: '#94FFF4',
          400: '#66FFEE',
          500: '#4ECDC4',
          600: '#3DB8B0',
          700: '#2E9C96',
          800: '#21807C',
          900: '#166B68',
        },
        accent: {
          50: '#FFF2F2',
          100: '#FFE5E5',
          200: '#FFCCCC',
          300: '#FF9999',
          400: '#FF6666',
          500: '#FF3B30',
          600: '#E62E24',
          700: '#CC221A',
          800: '#B31812',
          900: '#99100C',
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-light': 'bounceLight 0.6s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceLight: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
    },
  },
  plugins: [],
};