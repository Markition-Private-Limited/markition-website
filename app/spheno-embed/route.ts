import { readFile } from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET() {
  const htmlPath = path.join(process.cwd(), "public", "spheno-index.html");
  let html = await readFile(htmlPath, "utf8");

  html = html
    // Hide Spheno's own fixed header — Markition's shared Navbar wraps this iframe
    .replace(
      "</head>",
      `<style>
        #root header { display: none !important; }
      </style>
      </head>`
    );

  return new Response(html, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}
