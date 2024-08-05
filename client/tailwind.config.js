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
    extend: {
      colors: {
        "flag-blue": "rgba(117, 172, 240, 1.0)",
        "flag-red": "rgba(236, 121, 152, 1.0)",
        "flag-purple": "rgba(95, 37, 82, 1.0)",
        "light-purple": "rgba(184, 71, 159, 1.0)",
        // #b8479f, 50% on color picker of w3schools.com
      },
    },
  },
  plugins: [flowbite.plugin(), require("tailwind-scrollbar")],
};
