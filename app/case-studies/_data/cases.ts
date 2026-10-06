export type CaseStudy = {
  id: string;
  category: string;
  name: string;
  image: string;
  tag: string;
  scope: string;
  blurb: string;
  headline: string;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "aigenix",
    category: "AI / FINTECH",
    name: "AiGenix",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",
    tag: "INTELLIGENCE",
    scope: "Strategy · Product Experience · Web Platform · AI",
    blurb: "A financial technology experience built around advanced data analytics, AI/ML and customer behaviour profiling — translating real-world data into actionable intelligence.",
    headline: "TURNING COMPLEX DATA INTO SMARTER DECISIONS."
  },
  {
    id: "genix",
    category: "MOBILITY / APP",
    name: "Genix Drive",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1400&q=80",
    tag: "DIGITAL PRODUCT",
    scope: "Growth Strategy · Mobile Experience · Campaign System · Activation",
    blurb: "A connected product ecosystem combining a consumer-facing mobile experience, growth strategy, creator activation and university-led awareness — designed to move adoption forward.",
    headline: "FROM A MOBILITY IDEA TO A CONNECTED DIGITAL EXPERIENCE."
  },
  {
    id: "rossais",
    category: "ENTERPRISE / SOFTWARE",
    name: "Al Rossais Group",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1400&q=80",
    tag: "OPERATIONS",
    scope: "Enterprise Application · UX/UI · Development · Workflow",
    blurb: "A business application experience designed around structured workflows, information architecture and operational clarity — turning a complex system into a more usable digital environment.",
    headline: "MAKING COMPLEX BUSINESS OPERATIONS FEEL SIMPLE."
  },
  {
    id: "flavours",
    category: "RETAIL / POS",
    name: "Flavours.sa",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1400&q=80",
    tag: "COMMERCE",
    scope: "POS · Product Design · Commerce · Operations",
    blurb: "A POS-focused digital solution for modern retail operations, designed to bring transactions, products and day-to-day business activity into one connected experience.",
    headline: "CONNECTING THE FRONT COUNTER TO THE BUSINESS BEHIND IT."
  },
  {
    id: "hinopak",
    category: "AUTOMOTIVE / BRAND",
    name: "Hinopak Motors",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1400&q=80",
    tag: "BRAND EXPERIENCE",
    scope: "Digital Marketing · Creative · Social · Brand Communication",
    blurb: "A digital marketing and brand communication engagement focused on stronger digital presence, creative consistency and audience connection.",
    headline: "BRINGING A RECOGNIZED AUTOMOTIVE BRAND INTO A STRONGER DIGITAL SPACE."
  },
  {
    id: "repair",
    category: "CONSUMER TECH / WEB",
    name: "Repair My Devices",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1400&q=80",
    tag: "CONVERSION",
    scope: "Web Experience · UX/UI · Conversion · Digital Presence",
    blurb: "A customer-facing digital experience built to make service discovery, trust and conversion feel clear — with a stronger digital foundation for a repair business.",
    headline: "MAKING DEVICE REPAIR FEEL AS EASY AS THE DEVICE ITSELF."
  },
  {
    id: "service-express",
    category: "HOME SERVICES / GROWTH",
    name: "Service Express",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1400&q=80",
    tag: "LEAD GENERATION",
    scope: "Google Ads · Lead Generation · Landing Experience · SEO",
    blurb: "A growth-focused digital presence for a Houston HVAC business, connecting positioning, performance marketing and conversion-oriented digital experiences.",
    headline: "TURNING LOCAL HVAC DEMAND INTO A DIGITAL GROWTH ENGINE."
  },
  {
    id: "pht",
    category: "SECURITY / LEAD GENERATION",
    name: "PHT Security Systems",
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1400&q=80",
    tag: "PERFORMANCE",
    scope: "Digital Marketing · Lead Generation · Web · Creative",
    blurb: "A performance-oriented digital presence designed to communicate capability, trust and service value while creating a clearer path from discovery to enquiry.",
    headline: "BUILDING DIGITAL TRUST IN A HIGH-CONSIDERATION CATEGORY."
  }
];

export const CASE_FILTERS = [
  { label: "All Work", value: "all" },
  { label: "AI & Fintech", value: "AI / FINTECH" },
  { label: "Apps", value: "MOBILITY / APP" },
  { label: "Enterprise", value: "ENTERPRISE / SOFTWARE" },
  { label: "Commerce", value: "RETAIL / POS" },
  { label: "Brand", value: "AUTOMOTIVE / BRAND" },
  { label: "Growth", value: "HOME SERVICES / GROWTH" },
];
