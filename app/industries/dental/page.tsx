import type { Metadata } from 'next';
import DentalIndustryPage from './DentalIndustryPage';

export const metadata: Metadata = {
  title: 'Dental Marketing Agency | Google Ads, SEO & Lead Generation for Dentists',
  description: 'Markition helps dental practices fill their chairs with high-value patients through Google Ads, local SEO, and conversion-optimized landing pages. Get a free practice audit.',
  keywords: 'dental marketing agency, google ads for dentists, dental SEO, dental lead generation, implant marketing, cosmetic dentistry marketing',
  openGraph: {
    title: 'Dental Marketing Agency | Markition',
    description: 'Fill your chairs with high-value patients. Google Ads, SEO & lead generation built exclusively for dental practices.',
    type: 'website',
    images: [{ url: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=80', width: 1200, height: 630, alt: 'Dental Marketing Agency' }],
  },
  twitter: { card: 'summary_large_image', title: 'Dental Marketing Agency | Markition', description: 'Fill your chairs with high-value patients through Google Ads, SEO & lead generation.' },
};

export default function Page() {
  return <DentalIndustryPage />;
}
