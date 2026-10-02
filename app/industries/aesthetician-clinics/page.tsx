import type { Metadata } from 'next';
import EstheticianClinicsIndustryPage from './EstheticianClinicsIndustryPage';

export const metadata: Metadata = {
  title: 'Esthetic Clinic Marketing Agency | Google Ads, SEO & Client Lead Generation',
  description: 'Markition helps med spas and Esthetician clinics fill their treatment calendar with high-value injectable, laser, and skincare clients through Google Ads, local SEO, and conversion-optimized landing pages. Get a free clinic audit.',
  keywords: 'med spa marketing agency, google ads for med spas, Esthetic clinic SEO, botox marketing, med spa lead generation, Esthetician marketing',
  openGraph: {
    title: 'Esthetic Clinic Marketing Agency | Markition',
    description: 'Fill your treatment calendar with high-value clients. Google Ads, SEO & lead generation built exclusively for med spas and Esthetic clinics.',
    type: 'website',
    images: [{ url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80', width: 1200, height: 630, alt: 'Esthetic Clinic Marketing Agency' }],
  },
  twitter: { card: 'summary_large_image', title: 'Esthetic Clinic Marketing Agency | Markition', description: 'Fill your treatment calendar with high-value clients through Google Ads, SEO & lead generation.' },
};

export default function Page() {
  return <EstheticianClinicsIndustryPage />;
}
