"use client";
import { useState, useMemo } from "react";
import ModelSelect from "./ModelSelect";

export default function CallAI({
  label,
  kind,
  placeholder,
  extraFields
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
  const [model, setModel] = useState("gpt-4o-mini");

  const disabled = useMemo(()=> loading || !input.trim(), [loading, input]);

  async function go() {
    setLoading(true);
    try {
      const res = await fetch("/api/omni", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, input, extra: { role, model } })
      });
      const j = await res.json();
      if (!res.ok) {
        setOut(
          `Error ${res.status}: ${j.error || "Unknown"}\n` +
          `Detail: ${(j.detail || "—").toString().slice(0, 400)}`
        );
      } else {
        setOut(j.text || "No output");
        const xp = Number(localStorage.getItem("omni_xp") || 0) + 10;
        localStorage.setItem("omni_xp", String(xp));
      }
    } catch (e: any) {
      setOut(`Client error: ${e?.message || e}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card grid gap-3">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-lg">{label}</h2>
        <ModelSelect model={model} setModel={setModel} />
      </div>

      {kind === "resume" && (
        <input
          className="input"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="Target role (e.g. Product Manager)"
        />
      )}

      <textarea
        className="input min-h-[120px]"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={placeholder}
      />

      {extraFields}

      <button onClick={go} className="btn" disabled={disabled}>
        {loading ? "Thinking..." : "Generate"}
      </button>

      {loading ? (
        <div className="bg-[#0B0B11]/80 border border-white/10 rounded-2xl p-3">
          <div className="text-xs text-white/60 mb-2">Generating…</div>
          <div className="animate-pulse grid gap-2">
            <div className="h-3 rounded bg-white/10" />
            <div className="h-3 rounded bg-white/10" />
            <div className="h-3 rounded bg-white/10" />
            <div className="h-3 rounded bg-white/10 w-2/3" />
          </div>
        </div>
      ) : (
        out && (
          <pre className="whitespace-pre-wrap text-sm bg-[#0B0B11]/80 border border-white/10 rounded-2xl p-3">
            {out}
          </pre>
        )
      )}
    </div>
  );
}
