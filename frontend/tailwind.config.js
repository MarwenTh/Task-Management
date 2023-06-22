/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      height: {
        157: "175px",
      },
      width: {
        500: "500px",
        400: "400px",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
