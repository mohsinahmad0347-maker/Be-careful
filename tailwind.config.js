/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#eff8ff',
          100: '#dbeffe',
          200: '#bfe3fd',
          300: '#93d1fc',
          400: '#60b7f9',
          500: '#3b97f5',
          600: '#2578ea',
          700: '#1d62d7',
          800: '#1e50ae',
          900: '#1e4589',
          950: '#172b53',
        },
        medical: {
          blue:    '#2578ea',
          cyan:    '#06b6d4',
          navy:    '#172b53',
          light:   '#eff8ff',
          white:   '#ffffff',
          gray:    '#f1f5f9',
          green:   '#10b981',
          orange:  '#f59e0b',
          red:     '#ef4444',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card:   '0 1px 3px 0 rgb(0 0 0 / 0.07), 0 1px 2px -1px rgb(0 0 0 / 0.07)',
        'card-hover': '0 4px 12px 0 rgb(37 120 234 / 0.15)',
        sidebar: '2px 0 8px 0 rgb(0 0 0 / 0.05)',
      },
      borderRadius: {
        xl2: '1rem',
        xl3: '1.5rem',
      },
      animation: {
        'fade-in':      'fadeIn 0.5s ease-in-out',
        'slide-up':     'slideUp 0.4s ease-out',
        'slide-in':     'slideIn 0.3s ease-out',
        'pulse-slow':   'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ecg':          'ecg 2s linear infinite',
        'float':        'float 3s ease-in-out infinite',
        'spin-slow':    'spin 3s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)',    opacity: '1' },
        },
        slideIn: {
          '0%':   { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)',      opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        ecg: {
          '0%':   { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
      },
    },
  },
  plugins: [],
}
