import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'azul': {
          DEFAULT: '#8FC7F3',
          'claro': '#CFEAFB',
        },
        'creme': '#FFF8F0',
        'chocolate': {
          DEFAULT: '#6B4226',
          'escuro': '#4B2E1F',
        },
        'cinza': '#8A94A6',
        'texto': '#2C2C2C',
        'sucesso': '#22C55E',
      },
      fontFamily: {
        'heading': ['"DM Serif Display"', 'serif'],
        'body': ['"Poppins"', 'sans-serif'],
        'accent': ['"Nunito"', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
