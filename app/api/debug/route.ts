export const runtime = "edge";
export const preferredRegion = "bom1";
export async function GET() {
  const key = process.env.OPENAI_API_KEY;
  return new Response(JSON.stringify({
    hasKey: !!key,
    startsWith: key ? key.slice(0,8) : null
  }), { headers: { "Content-Type": "application/json" } });
}
