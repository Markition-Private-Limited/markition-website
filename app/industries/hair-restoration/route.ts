import { readFile } from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

const CANONICAL = 'https://markition.com/industries/hair-restoration';

const SEO_INJECT = `
<link rel="canonical" href="${CANONICAL}">
<meta name="robots" content="index,follow">
<meta property="og:url" content="${CANONICAL}">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"ProfessionalService","name":"Markition – Hair Restoration Marketing","url":"${CANONICAL}","description":"Marketing for Hair Restoration Clinics — Google Ads, Meta Ads, SEO, social media, creative and patient acquisition built to turn high-intent searches into consultations.","serviceType":"Digital Marketing","areaServed":"Worldwide"}</script>
</head>`;

const LOGO_BEFORE = `<a class="logo" href="#">MARK<span>ITION</span></a>`;
const LOGO_AFTER = `<a class="logo" href="/" style="display:flex;align-items:center;gap:8px;text-decoration:none;">
  <img src="/favicon.ico" alt="Markition" style="height:22px;width:22px;flex-shrink:0;border-radius:3px;display:block;filter:brightness(0) invert(1);">
  MARK<span style="color:#C8923E;">ITION</span>
</a>`;

export async function GET() {
  const htmlPath = path.join(process.cwd(), 'public', 'industries', 'hair-restoration.html');
  let html = await readFile(htmlPath, 'utf8');

  html = html.replace('</head>', SEO_INJECT);
  html = html.replace(LOGO_BEFORE, LOGO_AFTER);
  // The original uses --warm for the span, override to amber
  html = html.replace('.logo span{color:var(--warm)}', '.logo span{color:#C8923E}');

  return new Response(html, {
    headers: {
      'content-type': 'text/html; charset=utf-8',
    },
  });
}
