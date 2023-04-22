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
      grey: "#6B7280",
      white: "#FFF",
    },
    extend: {
      gridTemplateColumns: {
        16: "repeat(16, minmax(0, 1fr))",
        sidebar: "minmax(300px, 2fr) 5fr",
      },
      boxShadow: {
        detailShadow: "0px 4px 60px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};
