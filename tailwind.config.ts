import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        '3xl': '1920px',
      },
      maxWidth: {
        '8xl': '1440px',
        '9xl': '1600px',
      },
      height: {
        'screen-navbar': 'calc(100vh - 64px)',
      },
    },
  },
  plugins: [],
};
export default config;