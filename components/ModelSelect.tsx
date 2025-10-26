"use client";
import { memo } from "react";

const MODELS = [
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
];

export default memo(function ModelSelect({
  model,
  setModel
}: {
  model: string;
  setModel: (v: string) => void;
}) {
  return (
    <div className="grid gap-1">
      <label className="text-xs text-white/60">Model</label>
      <select
        value={model}
        onChange={(e) => setModel(e.target.value)}
        className="input"
      >
        {MODELS.map(m => <option key={m} value={m}>{m}</option>)}
      </select>
    </div>
  );
});
