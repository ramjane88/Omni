export const prompts = {
  weeklyPlan: (goals: string) => `
You are Omni, a concise planner. Build a simple 7-day schedule in markdown.
Input goals: ${goals}
Return sections per day with 3-5 tasks, include study/workout/rest balance. Keep it short.
`,
  summarize: (topic: string) => `
Explain "${topic}" simply. Then give:
- 5 key points
- 5 flashcards (Q/A)
- 5-question quiz (answers after).
Keep it concise.`,
  reels: (niche: string) => `
Generate 8 short-form video scripts for ${niche}. Each 7-9 seconds.
Format:
- Hook
- Line 1
- Line 2
- CTA
`,
  resume: (role: string, resumeText: string) => `
Optimize this resume for ${role}. Improve bullet points with metrics, add ATS keywords, and output:
- Summary paragraph
- 6 improved bullets
- Skills list
- ATS Score (0-100)
Resume:
${resumeText}
`
};
