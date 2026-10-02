import type { Metadata } from 'next';
import HairRestorationIndustryPage from './HairRestorationIndustryPage';

export const metadata: Metadata = {
  title: 'Hair Restoration Marketing Agency | Google Ads, SEO & Patient Lead Generation',
  description: 'Markition helps hair restoration and transplant clinics fill their consultation calendar with high-value FUE, FUT, and PRP patients through Google Ads, local SEO, and conversion-optimized landing pages. Get a free clinic audit.',
  keywords: 'hair restoration marketing agency, google ads for hair clinics, hair transplant SEO, hair restoration lead generation, FUE marketing, PRP marketing',
  openGraph: {
    title: 'Hair Restoration Marketing Agency | Markition',
    description: 'Fill your consultation calendar with high-value patients. Google Ads, SEO & lead generation built exclusively for hair restoration clinics.',
    type: 'website',
    images: [{ url: 'https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?auto=format&fit=crop&w=1200&q=80', width: 1200, height: 630, alt: 'Hair Restoration Marketing Agency' }],
  },
  twitter: { card: 'summary_large_image', title: 'Hair Restoration Marketing Agency | Markition', description: 'Fill your consultation calendar with high-value patients through Google Ads, SEO & lead generation.' },
};

export default function Page() {
  return <HairRestorationIndustryPage />;
}
