import { readFile } from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET() {
  const htmlPath = path.join(process.cwd(), "public", "tech-index.html");
  let html = await readFile(htmlPath, "utf8");

  html = html
    // Clear SSR content so React hydrates fresh client-side
    .replace(
      /<div id="root" data-server-rendered="true">[^]*?(?=<\/div>\s*<script)/,
      '<div id="root">'
    )
    // Trick the Vite router into rendering "/" (its home route)
    .replace(
      '<script type="module"',
      `<script>history.replaceState(null,"","/");</script><script type="module"`
    )
    // Hide the Vite navbar — Markition's shared Navbar wraps this iframe
    .replace(
      "</head>",
      `<style>
        #root header { display: none !important; }
        #root header + div.fixed { display: none !important; }
      </style>
      </head>`
    );

  return new Response(html, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}
