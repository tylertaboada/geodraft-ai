/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#f7f6f3',
        charcoal: '#1c1c1c',
        sage: '#4a7c6f',
        stone: '#e8e6e1',
        muted: '#6b7280',
      },
      fontFamily: {
        serif: ['"IBM Plex Serif"', 'Georgia', 'serif'],
        sans: ['"IBM Plex Sans"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}