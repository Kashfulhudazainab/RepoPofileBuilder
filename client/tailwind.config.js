/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'bg-primary':      '#0D1117',
        'bg-card':         '#161B22',
        'bg-card-hover':   '#1C2128',
        'accent-blue':     '#2D9CDB',
        'accent-teal':     '#1ABC9C',
        'text-primary':    '#FFFFFF',
        'text-secondary':  '#8B949E',
        'text-muted':      '#6E7681',
        'border-custom':   '#21262D',
        'tag-bg':          '#1C2128',
        'tag-text':        '#58A6FF',
      },
    },
  },
  plugins: [],
};