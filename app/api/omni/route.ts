import { NextRequest } from "next/server";
export const runtime = "edge";

const BUCKET: Record<string, { t: number; n: number }> = {};
function limited(ip: string, limit = 20) {
  const now = Date.now();
  const win = Math.floor(now / 60000);
  const rec = BUCKET[ip] ?? { t: win, n: 0 };
  if (rec.t !== win) { rec.t = win; rec.n = 0; }
  rec.n += 1; BUCKET[ip] = rec;
  return rec.n > limit;
}
function sysPrompt(kind: string) {
  return `You are Omni, an AI Life OS. Be concise, structured, export-friendly. Mode: ${kind}`;
}
export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anon";
  if (limited(ip)) return new Response(JSON.stringify({ error: "Rate limit exceeded. Try again in a minute." }), { status: 429 });

  const { kind, input, extra } = await req.json();
  if (!input || typeof input !== "string") return new Response(JSON.stringify({ error: "Missing input" }), { status: 400 });

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return new Response(JSON.stringify({ error: "Server missing OPENAI_API_KEY" }), { status: 500 });

  let userPrompt = "";
  if (kind === "weekly") userPrompt = `Create a pragmatic 7-day plan:\n${input}`;
  else if (kind === "study") userPrompt = `Explain clearly, then 5 bullets, 5 flashcards, 5 quiz:\n${input}`;
  else if (kind === "reels") userPrompt = `Give 8 viral micro-scripts for niche:\n${input}`;
  else if (kind === "resume") userPrompt = `Optimize resume for ${extra?.role || "the role"}:\n${input}`;
  else userPrompt = input;

  const r = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: sysPrompt(kind) },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.65
    })
  });

  if (!r.ok) {
    const t = await r.text();
    return new Response(JSON.stringify({ error: "Upstream AI error", detail: t }), { status: 502 });
  }
  const data = await r.json();
  const text = data.choices?.[0]?.message?.content || "No content";
  return new Response(JSON.stringify({ text }), { headers: { "Content-Type": "application/json" } });
}
