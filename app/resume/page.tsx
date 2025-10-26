import CallAI from "@/components/CallAI";
export default function Resume() {
  return (
    <div className="grid gap-4">
      <div className="card">
        <h1 className="text-xl font-semibold">Resume Optimizer</h1>
        <p className="text-[#aaa]">Paste your resume text. Pick a target role. Get ATS-optimized output.</p>
      </div>
      <CallAI label="Optimize resume" kind="resume" placeholder="Paste your resume text here…" />
    </div>
  );
}
