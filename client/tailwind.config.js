const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  // mode: "jit",
  content: [
    "./index.html",
    "./src/**/*.{cjs,mjs,js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {},
  },
  plugins: [flowbite.plugin(), require("tailwind-scrollbar")],
};
