/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0A0A0A",
        panel: "#161616",
        primary: "#6C5CE7",
        secondary: "#00CEC9",
        accent: "#FDCB6E"
      },
      borderRadius: { xl: "20px" }
    }
  },
  plugins: []
}
