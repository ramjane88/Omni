"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  useEffect(() => {
    setXp(Number(localStorage.getItem("omni_xp") || 0));
    setStreak(Number(localStorage.getItem("omni_streak") || 0));
  }, []);
  return (
    <div className="grid gap-4">
      <div className="card">
        <h1 className="text-xl font-semibold">Omni — by Sandeep Kumar Vattipally</h1>
        <p className="text-white/70">Plan your week, track habits, study faster, write reels, and optimize your resume.</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="card"><div className="text-xs text-white/60 mb-1">XP</div><div className="text-3xl">{xp}</div></div>
        <div className="card"><div className="text-xs text-white/60 mb-1">Streak</div><div className="text-3xl">{streak}🔥</div></div>
      </div>
      <div className="card">
        <div className="grid sm:grid-cols-3 gap-2">
          <Link className="btn text-center" href="/planner">Generate Week</Link>
          <Link className="btn text-center" href="/study">Summarize Topic</Link>
          <Link className="btn text-center" href="/scripts">Reel Hooks</Link>
        </div>
      </div>
    </div>
  );
}
