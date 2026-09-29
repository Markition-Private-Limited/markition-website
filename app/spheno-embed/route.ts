import { readFile } from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET() {
  const htmlPath = path.join(process.cwd(), "public", "spheno-index.html");
  const html = await readFile(htmlPath, "utf8");

  return new Response(html, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}
