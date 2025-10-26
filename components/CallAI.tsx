"use client";
import { useState } from "react";

export default function CallAI({
  label, kind, placeholder, extraFields
}: {
  label: string;
  kind: "weekly" | "study" | "reels" | "resume";
  placeholder: string;
  extraFields?: React.ReactNode;
}) {
  const [input, setInput] = useState("");
  const [role, setRole] = useState("Software Engineer");
  const [out, setOut] = useState("");
  const [loading, setLoading] = useState(false);

  async function go() {
    setLoading(true);
    const res = await fetch("/api/omni", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind, input, extra: { role } })
    });
    const j = await res.json();
    setOut(j.text || j.error || "No output");
    setLoading(false);
    const xp = Number(localStorage.getItem("omni_xp") || 0) + 10;
    localStorage.setItem("omni_xp", String(xp));
  }

  return (
    <div className="card grid gap-3">
      <h2 className="font-semibold text-lg">{label}</h2>
      {kind === "resume" && (
        <input className="input" value={role} onChange={e=>setRole(e.target.value)} placeholder="Target role (e.g. Product Manager)"/>
      )}
      <textarea className="input min-h-[120px]" value={input} onChange={e=>setInput(e.target.value)} placeholder={placeholder}/>
      {extraFields}
      <button onClick={go} className="btn" disabled={loading}>{loading ? "Thinking..." : "Generate"}</button>
      {loading ? (
        <div className="bg-[#0f0f0f] border border-[#222] rounded-xl p-3">
          <div className="text-xs text-[#aaa] mb-2">Generating…</div>
          <div className="animate-pulse grid gap-2">
            <div className="h-3 rounded bg-[#1b1b1b]" />
            <div className="h-3 rounded bg-[#1b1b1b]" />
            <div className="h-3 rounded bg-[#1b1b1b]" />
            <div className="h-3 rounded bg-[#1b1b1b] w-2/3" />
          </div>
        </div>
      ) : out && <pre className="whitespace-pre-wrap text-sm bg-[#0f0f0f] border border-[#222] rounded-xl p-3">{out}</pre>}
    </div>
  );
}
