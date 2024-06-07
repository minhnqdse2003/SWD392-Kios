const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      // backgroundColor: {
      //   primary: "var(--color-primary)",
      //   secondary: "var(--color-secondary)",
      //   btn: "var(--color-btn)",
      //   "btn-text": "var(--color-btn-text)",
      //   background: "var(--color-bg)",
      //   paragraph: "var(--color-para)",
      //   headline: "var(--color-headline)",
      // },
      // textColor: {
      //   primary: "var(--color-primary)",
      //   secondary: "var(--color-secondary)",
      //   btn: "var(--color-btn)",
      //   "btn-text": "var(--color-btn-text)",
      //   background: "var(--color-bg)",
      //   paragraph: "var(--color-para)",
      //   headline: "var(--color-headline)",
      // },
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        btn: "var(--color-btn)",
        "btn-text": "var(--color-btn-text)",
        background: "var(--color-bg)",
        paragraph: "var(--color-para)",
        headline: "var(--color-headline)",
        "sub-headline": "var(--color-sub-headline)",
        tertiary: "var(--color-tertiary)",
        "card-bg": "var(--color-card-bg)",
        "card-heading": "var(--color-card-heading)",
        "card-para": "var(--color-card-para)",
      },
    },
  },
  plugins: [nextui()],
};
