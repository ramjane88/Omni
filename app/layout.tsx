import "./globals.css";
import Link from "next/link";

export const metadata = { title: "Omni — by Sandeep Kumar Vattipally", description: "AI Life OS" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/>
        <link rel="manifest" href="/manifest.webmanifest"/>
        <link rel="preconnect" href="https://api.openai.com" crossOrigin="anonymous" />
      </head>
      <body>
        <nav className="sticky top-0 z-10 backdrop-blur bg-background/60 border-b border-white/10">
          <div className="mx-auto max-w-3xl px-4 py-3 flex items-center justify-between">
            <Link href="/" className="brand">OMNI</Link>
            <div className="hidden sm:flex gap-2 text-sm items-center">
              <span className="badge">by Sandeep Kumar Vattipally</span>
              <Link className="tab" href="/planner">Planner</Link>
              <Link className="tab" href="/habits">Habits</Link>
              <Link className="tab" href="/study">Study</Link>
              <Link className="tab" href="/scripts">Scripts</Link>
              <Link className="tab" href="/resume">Resume</Link>
            </div>
          </div>
        </nav>

        <main className="mx-auto max-w-3xl px-4 py-6 animate-[fadeIn_300ms_ease-out]">{children}</main>

        <div className="fixed sm:hidden bottom-3 left-0 right-0">
          <div className="mx-auto max-w-md">
            <div className="rounded-2xl bg-[#0B0B11]/80 backdrop-blur border border-white/10 px-3 py-2 mx-3 flex items-center justify-between">
              <Link className="px-3 py-2 rounded-xl" href="/planner">🗓️</Link>
              <Link className="px-3 py-2 rounded-xl" href="/habits">🔥</Link>
              <Link className="px-3 py-2 rounded-xl" href="/">🏠</Link>
              <Link className="px-3 py-2 rounded-xl" href="/study">📚</Link>
              <Link className="px-3 py-2 rounded-xl" href="/resume">📄</Link>
            </div>
          </div>
        </div>

        <footer className="mx-auto max-w-3xl px-4 pb-8 text-xs text-white/60">
          Omni — by <span className="font-medium">Sandeep Kumar Vattipally</span>
        </footer>

        <style>{`
          @keyframes fadeIn { from{opacity:0; transform: translateY(4px);} to{opacity:1; transform: none;} }
        `}</style>
      </body>
    </html>
  );
}
