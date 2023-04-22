/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      primary: {
        100: "#EEE3FF",
        600: "#8054C7",
        700: "#5A3696",
      },
      secondary: {
        600: "#63D838",
      },
      transparent: "transparent",
      grey: "#6B7280",
      white: "#FFF",
      "grey-secondary": "#F3F4F6",
      "grey-border": "#E5E7EB",
      "filter-button-text": "#111827",
    },
    extend: {
      gridTemplateColumns: {
        16: "repeat(16, minmax(0, 1fr))",
        sidebar: "minmax(300px, 2fr) 5fr",
      },
      boxShadow: {
        detailShadow: "0px 4px 60px rgba(0, 0, 0, 0.05)",
        filters:
          "0px 0px 0px 1px rgba(0, 0, 0, 0.05), 0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};
