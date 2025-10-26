import CallAI from "@/components/CallAI";
export default function Scripts() {
  return (
    <div className="grid gap-4">
      <div className="card">
        <h1 className="text-xl font-semibold">Reel Script Generator</h1>
        <p className="text-[#aaa]">Give your niche or product. Omni returns 8 short scripts.</p>
      </div>
      <CallAI label="Generate reel scripts" kind="reels" placeholder="e.g. AI side hustles for students" />
    </div>
  );
}
