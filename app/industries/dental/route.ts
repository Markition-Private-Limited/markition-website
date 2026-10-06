import { readFile } from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

const CANONICAL = 'https://markition.com/industries/dental';

const SEO_INJECT = `
<link rel="canonical" href="${CANONICAL}">
<meta property="og:url" content="${CANONICAL}">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"ProfessionalService","name":"Markition – Dental Marketing","url":"${CANONICAL}","description":"Markition helps dental practices grow through Google Ads, Meta Ads, SEO, social media, reels and conversion-focused digital marketing.","serviceType":"Digital Marketing","areaServed":"Worldwide"}</script>
</head>`;

const LOGO_BEFORE = `<a href="#" class="brand">MARKI<i>TION</i></a>`;
const LOGO_AFTER = `<a href="/" class="brand" style="display:flex;align-items:center;gap:8px;text-decoration:none;">
  <img src="/favicon.ico" alt="Markition" style="height:22px;width:22px;flex-shrink:0;border-radius:3px;display:block;filter:brightness(0);">
  MARKI<i style="color:#C8923E;font-style:normal;">TION</i>
</a>`;

export async function GET() {
  const htmlPath = path.join(process.cwd(), 'public', 'industries', 'dental.html');
  let html = await readFile(htmlPath, 'utf8');

  html = html.replace('</head>', SEO_INJECT);
  html = html.replace(LOGO_BEFORE, LOGO_AFTER);
  // Fix the blue i color in CSS to amber
  html = html.replace('.brand i{color:var(--blue);font-style:normal}', '.brand i{color:#C8923E;font-style:normal}');

  return new Response(html, {
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
