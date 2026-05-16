import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'fintech-blue': '#0F172A',
        'fintech-accent': '#3B82F6',
      },
    },
  },
  plugins: [],
};

export default config;
