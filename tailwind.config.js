/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // Primary brand color (orange) - stays consistent in both modes
        primary: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#F85606', // Main brand color
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        // Semantic colors that adapt to theme
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          tertiary: 'var(--color-text-tertiary)',
        },
        border: 'var(--color-border)',
        input: {
          bg: 'var(--color-input-bg)',
          border: 'var(--color-input-border)',
          text: 'var(--color-input-text)',
        },
      },
    },
  },
  plugins: [],
}

