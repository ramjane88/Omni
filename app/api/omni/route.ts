import { NextRequest } from "next/server";
export const runtime = "edge";
export const preferredRegion = "bom1"; // Mumbai

const ALLOW = new Set<string>([
  "gpt-4o-mini",
  "gpt-4o",
  "gpt-4.1-mini",
  "gpt-4.1",
  "o4-mini",
  "o4",
  "gpt-3.5-turbo",
  "gpt-4-turbo-preview",
  "gpt-4o-mini-translate",
  "gpt-4o-mini-audio"
]);

const BUCKET: Record<string, { t: number; n: number }> = {};
function limited(ip: string, limit = 20) {
  const now = Date.now(), win = Math.floor(now / 60000);
  const rec = BUCKET[ip] ?? { t: win, n: 0 };
  if (rec.t !== win) { rec.t = win; rec.n = 0; }
  rec.n += 1; BUCKET[ip] = rec;
  return rec.n > limit;
}
function sysPrompt(kind: string) {
  return `You are Omni. Be structured and export-friendly. Mode: ${kind}`;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anon";
  if (limited(ip)) return new Response(JSON.stringify({ error: "Rate limit exceeded" }), { status: 429 });

  const { kind, input, extra } = await req.json();
  if (!input || typeof input !== "string")
    return new Response(JSON.stringify({ error: "Missing input" }), { status: 400 });

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey)
    return new Response(JSON.stringify({ error: "Server missing OPENAI_API_KEY" }), { status: 500 });

  let user = input;
  if (kind === "weekly") user = `7-day plan:\n${input}`;
  if (kind === "study")  user = `Explain, then 5 bullets, 5 flashcards, 5 quiz:\n${input}`;
  if (kind === "reels")  user = `Give 8 viral short scripts:\n${input}`;
  if (kind === "resume") user = `Optimize resume for ${extra?.role || "the role"}:\n${input}`;

  const model = (extra?.model && typeof extra.model === "string" && ALLOW.has(extra.model))
    ? extra.model : "gpt-4o-mini";

  try {
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: sysPrompt(kind) },
          { role: "user", content: user }
        ],
        temperature: 0.6
      }),
    });

    const txt = await r.text();
    if (!r.ok) {
      return new Response(JSON.stringify({ error: "Upstream AI error", detail: txt }), { status: 502 });
    }

    const data = JSON.parse(txt);
    const text = data?.choices?.[0]?.message?.content || "No content";
    return new Response(JSON.stringify({ text }), { headers: { "Content-Type": "application/json" } });
  } catch(e:any) {
    return new Response(JSON.stringify({ error: "Fetch exception", detail: e?.message || String(e) }), { status: 502 });
  }
}
