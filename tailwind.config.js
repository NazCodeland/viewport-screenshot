/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,jsm,ts}"],
  theme: {
    screeens: {
      mobile: '320px',
      tablet: '768px',
      laptop: '1024px',
      desktop: '1440px',
      '4k': '3840px',
    }
  },
  plugins: [],
};