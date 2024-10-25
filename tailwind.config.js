// tailwind.config.js
module.exports = {
  darkMode: "media", // or 'class' if you want manual toggle
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      animation: {
        "reverse-spin": "reverse-spin 1s linear infinite",
      },
      keyframes: {
        "reverse-spin": {
          from: {
            transform: "rotate(360deg)",
          },
        },
      },
      colors: {
        lightBlue: "#eceff7", // Light background color
        darkBlue: "#1e3a8a", // Darker blue for dark mode (adjust as needed)
        navBlue: "#2C538FE0",
        navOrange: "#E89837E0",
      },
      backgroundImage: {
        "light-gradient":
          "linear-gradient(113deg, rgba(222,231,255,1) 0%, rgba(236,255,251,1) 51%, rgba(244,236,255,1) 100%)",
        "dark-gradient":
          "linear-gradient(113deg, rgba(13,24,60,1) 0%, rgba(0,36,9,1) 51%, rgba(25,17,42,1) 100%)",
      },
      borderRadius: {
        nav: "6px",
      },
    },
  },
  plugins: [],
};
