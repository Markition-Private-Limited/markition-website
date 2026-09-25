import { readFile } from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET() {
  const htmlPath = path.join(process.cwd(), "public", "tech-index.html");
  let html = await readFile(htmlPath, "utf8");

  // The Vite SSG app was server-rendered for path "/" but is now served at "/tech".
  // Fix: clear the SSR content so React hydrates fresh client-side, and
  // inject a history override so the router thinks it's at "/".
  html = html
    // Remove SSR content from root div so React does a full client render
    .replace(
      /<div id="root" data-server-rendered="true">[^]*?(?=<\/div>\s*<script)/,
      '<div id="root">'
    )
    // Inject path override before the app JS loads.
    // 1. Trick the SPA router into initializing at "/" (its home route).
    // 2. After all module scripts finish (load event), silently restore the
    //    URL to "/tech" via replaceState — React Router won't detect this
    //    (it only listens for popstate) so it keeps rendering the home page.
    .replace(
      '<script type="module"',
      `<script>
history.replaceState(null,"","/");
window.addEventListener('load',function(){
  setTimeout(function(){history.replaceState(history.state,document.title,"/tech");},0);
});
</script><script type="module"`
    );

  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  });
}
