/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('https://images.squarespace-cdn.com/content/v1/5a93d7cd12b13f8318462b89/1537940454160-JPDZ3STP225AUNDOLVEK/image-asset.jpeg?format=2500w')"
      }
    },
  },
  plugins: [],
}

