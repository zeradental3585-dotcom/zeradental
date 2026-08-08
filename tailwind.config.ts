import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: '#0B1F33', 700: '#12314d', 500: '#3d5a75', 300: '#7d93a8' },
        mint: { 50: '#eefbf7', 100: '#d3f5ec', 200: '#a7ebda', 400: '#38c9a6', 500: '#12b48d', 600: '#0d9273', 700: '#0b7359' },
        sand: { 50: '#fbfaf7', 100: '#f4f1ea' },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(11,31,51,.05), 0 8px 24px -12px rgba(11,31,51,.15)',
        lift: '0 2px 4px rgba(11,31,51,.06), 0 20px 40px -20px rgba(11,31,51,.28)',
      },
      maxWidth: { content: '1180px' },
    },
  },
  plugins: [],
};
export default config;
