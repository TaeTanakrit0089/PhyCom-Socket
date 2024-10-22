// tailwind.config.js
module.exports = {
  darkMode: 'media', // or 'class' if you want manual toggle
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        lightBlue: '#eceff7', // Light background color
        darkBlue: '#1e3a8a', // Darker blue for dark mode (adjust as needed)
      },
      backgroundImage: {
        'light-gradient': 'linear-gradient(152deg, rgba(236,239,247,1) 0%, rgba(246,255,253,1) 36%, rgba(252,250,255,1) 100%)',
      },
    },
  },
  plugins: [],
}
