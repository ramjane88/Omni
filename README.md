# Omni — AI Life OS (Mobile-first PWA) v2

Owner: **Sandeep Kumar Vattipally**

## Quick start
```bash
npm i
# create .env.local with:
# OPENAI_API_KEY=sk-...
npm run dev
```

## Model Selection
Use the dropdown in the UI to choose any of the 10 allowed models.
Defaults to `gpt-4o-mini`. Availability depends on your OpenAI account & plan.

## Deploy
- Push to GitHub
- Import to Vercel
- Add `OPENAI_API_KEY` in Project → Settings → Environment Variables (Production)
- Deploy

## Endpoints
- `/api/health` → ok
- `/api/debug` → shows key presence
- `/planner`, `/habits`, `/study`, `/scripts`, `/resume`
