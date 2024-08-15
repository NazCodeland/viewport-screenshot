/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,jsm,ts}"],
  theme: {
    screeens: {
      'url': '100px',
      mobile: '375px',
      tablet: '768px',
      laptop: '1024px',
      desktop: '1440px',
      '4k': '2160px'
    }
  },
  plugins: [],
};