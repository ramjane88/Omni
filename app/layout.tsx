import "./globals.css";
import Link from "next/link";

export const metadata = { title: "Omni", description: "AI Life OS (MVP)" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/>
        <link rel="manifest" href="/manifest.webmanifest"/>
        <link rel="preconnect" href="https://api.openai.com" crossOrigin="anonymous" />
      </head>
      <body>
        <nav className="sticky top-0 z-10 bg-background/70 backdrop-blur border-b border-[#1f1f1f]">
          <div className="mx-auto max-w-3xl px-4 py-3 flex items-center justify-between">
            <Link href="/" className="font-semibold tracking-wide">OMNI</Link>
            <div className="hidden sm:flex gap-2 text-sm">
              <Link className="tab" href="/planner">Planner</Link>
              <Link className="tab" href="/habits">Habits</Link>
              <Link className="tab" href="/study">Study</Link>
              <Link className="tab" href="/scripts">Scripts</Link>
              <Link className="tab" href="/resume">Resume</Link>
            </div>
          </div>
        </nav>

        <main className="mx-auto max-w-3xl px-4 py-6">{children}</main>

        <div className="fixed sm:hidden bottom-3 left-0 right-0">
          <div className="mx-auto max-w-md">
            <div className="rounded-2xl bg-[#111]/90 backdrop-blur border border-[#222] px-3 py-2 mx-3 flex items-center justify-between">
              <Link className="px-3 py-2 rounded-xl" href="/planner">🗓️</Link>
              <Link className="px-3 py-2 rounded-xl" href="/habits">🔥</Link>
              <Link className="px-3 py-2 rounded-xl" href="/">🏠</Link>
              <Link className="px-3 py-2 rounded-xl" href="/study">📚</Link>
              <Link className="px-3 py-2 rounded-xl" href="/resume">📄</Link>
            </div>
          </div>
        </div>

        <footer className="mx-auto max-w-3xl px-4 pb-8 text-xs text-[#aaa]">
          Built fast with ♥ — MVP
        </footer>

        <script dangerouslySetInnerHTML={{__html: `
          if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
            window.addEventListener('load', () => {
              navigator.serviceWorker.register('/sw.js').catch(()=>{});
            });
          }
        `}}/>
      </body>
    </html>
  );
}
