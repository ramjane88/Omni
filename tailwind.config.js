/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#06060A",
        panel: "#111118",
        primary: "#7C5CFF",
        secondary: "#00E5D4",
        accent: "#FFD166"
      },
      borderRadius: { '2xl': "20px" },
      boxShadow: {
        glow: "0 0 40px rgba(124,92,255,.25)",
        glass: "0 10px 30px rgba(0,0,0,.35)"
      }
    }
  },
  plugins: []
}
