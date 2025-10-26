import manifest from "../manifest";
export function GET() {
  return new Response(JSON.stringify(manifest()), {
    headers: { "Content-Type": "application/manifest+json" }
  });
}
