export default function manifest() {
  return {
    name: "Omni — by Sandeep Kumar Vattipally",
    short_name: "Omni",
    description: "Your personal AI that manages your whole life.",
    start_url: "/",
    display: "standalone",
    background_color: "#06060A",
    theme_color: "#7C5CFF",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" }
    ]
  };
}
