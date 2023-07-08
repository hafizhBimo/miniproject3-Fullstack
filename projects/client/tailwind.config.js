/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "../../node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      sans: [
        "Arial",
        "Helvetica",
        "Tahoma",
        "Verdana",
        "Geneva",
        "Roboto",
        "Helvetica Neue",
        "sans-serif",
      ],
      serif: [
        "Times New Roman",
        "Georgia",
        "Garamond",
        "Baskerville",
        "Didot",
        "Playfair Display",
        "serif",
      ],
      mono: ["Courier New", "Lucida Console", "Monaco", "monospace"],
      cursive: ["Brush Script MT", "Lucida Handwriting", "Cursive"],
      fantasy: ["Impact", "Papyrus", "fantasy"],
      josefin: ["Josefin Sans", "sans-serif"],
      japans: ["Noto Sans JP", "sans-serif"],

    },
  },
  plugins: [require("flowbite/plugin")],
};
