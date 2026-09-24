'use client';

import { useState, useRef } from 'react';
import { HeroSection } from './components/HeroSection';
import { TrustSection } from './components/TrustSection';
import { ProblemSection } from './components/ProblemSection';
import { ServicesSection } from './components/ServicesSection';
import { SystemSection } from './components/SystemSection';
import { ProofResultsSection } from './components/ProofResultsSection';
import { CaseStudySection } from './components/CaseStudySection';
import { WhyChooseUsSection } from './components/WhyChooseUsSection';
import { FaqSection } from './components/FaqSection';
import { FinalCtaSection } from './components/FinalCtaSection';
import { StickyMobileCta } from './components/StickyMobileCta';
import { AuditModal } from './components/AuditModal';

export default function DentalIndustryPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>();
  const heroFormRef = useRef<HTMLDivElement>(null);

  const handleOpenAudit = (serviceName?: string) => {
    setSelectedService(serviceName);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full text-[#030A28]">
      <div ref={heroFormRef}>
        <HeroSection onOpenAudit={handleOpenAudit} />
      </div>
      <TrustSection onOpenAudit={handleOpenAudit} />
      <ProblemSection onOpenAudit={handleOpenAudit} />
      <ServicesSection onOpenAudit={handleOpenAudit} />
      <SystemSection onOpenAudit={handleOpenAudit} />
      <ProofResultsSection onOpenAudit={handleOpenAudit} />
      <CaseStudySection onOpenAudit={handleOpenAudit} />
      <WhyChooseUsSection onOpenAudit={handleOpenAudit} />
      <FaqSection onOpenAudit={handleOpenAudit} />
      <FinalCtaSection onOpenAudit={handleOpenAudit} />
      <StickyMobileCta onOpenAudit={handleOpenAudit} />
      <AuditModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} prefilledService={selectedService} />
    </div>
  );
}
