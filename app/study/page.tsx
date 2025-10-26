import CallAI from "@/components/CallAI";
export default function Study() {
  return (
    <div className="grid gap-4">
      <div className="card">
        <h1 className="text-xl font-semibold">Study Summarizer</h1>
        <p className="text-[#aaa]">Enter a topic or paste notes. Omni returns summary + flashcards + quiz.</p>
      </div>
      <CallAI label="Summarize & generate flashcards" kind="study" placeholder="e.g. Photosynthesis, or paste chapter notes…" />
    </div>
  );
}
