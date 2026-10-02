import type { Metadata } from 'next';
import RoofingIndustryPage from './RoofingIndustryPage';

export const metadata: Metadata = {
  title: 'Roofing Marketing Agency | Google Ads, SEO & Lead Generation for Roofers',
  description: 'Markition helps roofing contractors fill their crew calendar with high-value storm restoration and re-roof jobs through Google Ads, local SEO, and conversion-optimized landing pages. Get a free company audit.',
  keywords: 'roofing marketing agency, google ads for roofers, roofing SEO, roofing lead generation, storm damage marketing, re-roof marketing',
  openGraph: {
    title: 'Roofing Marketing Agency | Markition',
    description: 'Fill your crew calendar with high-value jobs. Google Ads, SEO & lead generation built exclusively for roofing contractors.',
    type: 'website',
    images: [{ url: 'https://images.unsplash.com/photo-1632759145351-1d592919f522?auto=format&fit=crop&w=1200&q=80', width: 1200, height: 630, alt: 'Roofing Marketing Agency' }],
  },
  twitter: { card: 'summary_large_image', title: 'Roofing Marketing Agency | Markition', description: 'Fill your crew calendar with high-value jobs through Google Ads, SEO & lead generation.' },
};

export default function Page() {
  return <RoofingIndustryPage />;
}
