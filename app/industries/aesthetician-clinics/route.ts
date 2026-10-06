import { readFile } from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

const CANONICAL = 'https://markition.com/industries/aesthetician-clinics';

const SEO_INJECT = `
<link rel="canonical" href="${CANONICAL}">
<meta property="og:url" content="${CANONICAL}">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"ProfessionalService","name":"Markition – Aesthetician Clinic Marketing","url":"${CANONICAL}","description":"Markition helps aesthetician clinics generate qualified leads through Google Ads, SEO, Meta Ads, social media and conversion-focused digital marketing.","serviceType":"Digital Marketing","areaServed":"Worldwide"}</script>
</head>`;

const LOGO_BEFORE = `<a href="#" class="logo" aria-label="Markition home">MARKITION</a>`;
const LOGO_AFTER = `<a href="/" class="logo" aria-label="Markition home" style="display:flex;align-items:center;gap:8px;text-decoration:none;">
  <img src="/favicon.ico" alt="Markition" style="height:22px;width:22px;flex-shrink:0;border-radius:3px;display:block;filter:brightness(0);">
  MARK<span style="color:#C8923E;">ITION</span>
</a>`;

export async function GET() {
  const htmlPath = path.join(process.cwd(), 'public', 'industries', 'aesthetician-clinics.html');
  let html = await readFile(htmlPath, 'utf8');

  html = html.replace('</head>', SEO_INJECT);
  // Fix existing canonical (relative → absolute)
  html = html.replace('<link rel="canonical" href="/aesthetician-clinics">', '');
  html = html.replace(LOGO_BEFORE, LOGO_AFTER);

  return new Response(html, {
    headers: {
      'content-type': 'text/html; charset=utf-8',
    },
  });
}
