import { readFile } from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

const CANONICAL = 'https://markition.com/industries/roofing';

const SEO_INJECT = `
<link rel="canonical" href="${CANONICAL}">
<meta property="og:url" content="${CANONICAL}">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"ProfessionalService","name":"Markition – Roofing Marketing","url":"${CANONICAL}","description":"Markition helps roofing companies generate qualified leads through Google Ads, SEO, Meta Ads, social media and conversion-focused digital marketing.","serviceType":"Digital Marketing","areaServed":"Worldwide"}</script>
</head>`;

const LOGO_BEFORE = `<a class="logo" href="#">MARKITION</a>`;
const LOGO_AFTER = `<a class="logo" href="/" style="display:flex;align-items:center;gap:8px;text-decoration:none;">
  <img src="/favicon.ico" alt="Markition" style="height:22px;width:22px;flex-shrink:0;border-radius:3px;display:block;filter:brightness(0) invert(1);">
  MARK<span style="color:#C8923E;">ITION</span>
</a>`;

export async function GET() {
  const htmlPath = path.join(process.cwd(), 'public', 'industries', 'roofing.html');
  let html = await readFile(htmlPath, 'utf8');

  html = html.replace('</head>', SEO_INJECT);
  // Fix placeholder canonical URL
  html = html.replace('<link rel="canonical" href="[CANONICAL_URL]">', '');
  html = html.replace(LOGO_BEFORE, LOGO_AFTER);

  return new Response(html, {
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
