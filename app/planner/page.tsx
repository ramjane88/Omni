import CallAI from "@/components/CallAI";
export default function Planner() {
  return (
    <div className="grid gap-4">
      <div className="card">
        <h1 className="text-xl font-semibold">Weekly Planner</h1>
        <p className="text-white/70">Describe your goals; Omni returns a 7-day plan.</p>
      </div>
      <CallAI label="Plan my week" kind="weekly" placeholder="Example: Study 8h, 3 gym days, post 2 reels, client work evenings..." />
    </div>
  );
}
