/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          sage: {
            100: "#a8d8d2",
            200: "#7ec8be",
            300: "#4db0a4",
            400: "#2a9e8e",
            500: "#1a7a6c",
            600: "#135c50",
            700: "#0e4540",
            800: "#0a3530",
            900: "#06221e",
          },
        },
        boxShadow: {
          "glow-sm": "0 0 12px rgba(26, 122, 108, 0.35)",
          "glow": "0 0 25px rgba(26, 122, 108, 0.45), 0 0 50px rgba(26, 122, 108, 0.15)",
          "glow-lg": "0 0 40px rgba(26, 122, 108, 0.4), 0 0 80px rgba(26, 122, 108, 0.2)",
          "glow-border": "0 0 0 1px rgba(26, 122, 108, 0.5), 0 0 20px rgba(26, 122, 108, 0.2)",
        },
      },
    },
    plugins: [],
  }
