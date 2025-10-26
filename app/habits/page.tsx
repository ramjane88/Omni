"use client";
import { useEffect, useState } from "react";
type Habit = { id: string; title: string; doneToday: boolean; streak: number; };
export default function Habits() {
  const [habits, setHabits] = useState<Habit[]>([]);
  useEffect(() => {
    const v = localStorage.getItem("omni_habits");
    setHabits(v ? JSON.parse(v) : []);
  }, []);
  function save(next: Habit[]) {
    setHabits(next);
    localStorage.setItem("omni_habits", JSON.stringify(next));
  }
  function add() {
    const title = prompt("Habit name (e.g. Study 30m)")?.trim();
    if (!title) return;
    save([{ id: crypto.randomUUID(), title, doneToday: false, streak: 0 }, ...habits]);
  }
  function toggle(id: string) {
    const next = habits.map(h => h.id===id ? { ...h, doneToday: !h.doneToday, streak: !h.doneToday ? h.streak+1 : Math.max(0,h.streak-1)} : h);
    const diff = next.find(h=>h.id===id)?.doneToday ? 5 : -5;
    const xp = Number(localStorage.getItem("omni_xp")||0)+diff;
    localStorage.setItem("omni_xp", String(Math.max(0,xp)));
    localStorage.setItem("omni_streak", String(Math.max( Number(localStorage.getItem("omni_streak")||0), next.find(h=>h.id===id)?.streak || 0 )));
    save(next);
  }
  return (
    <div className="grid gap-4">
      <div className="card flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Habits</h1>
          <p className="text-[#aaa]">Tap to mark done today. Simple local streaks.</p>
        </div>
        <button className="btn" onClick={add}>Add Habit</button>
      </div>
      <div className="grid gap-3">
        {habits.map(h=>(
          <div key={h.id} className="card flex items-center justify-between">
            <div>
              <div className="font-medium">{h.title}</div>
              <div className="text-xs text-[#aaa]">Streak: {h.streak}</div>
            </div>
            <button onClick={()=>toggle(h.id)} className={`px-3 py-2 rounded-xl border ${h.doneToday ? "bg-secondary text-black" : "bg-transparent"}`}>
              {h.doneToday ? "Done" : "Mark done"}
            </button>
          </div>
        ))}
        {habits.length===0 && <div className="text-[#888]">No habits yet. Add one.</div>}
      </div>
    </div>
  );
}
