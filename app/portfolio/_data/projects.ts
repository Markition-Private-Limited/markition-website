export type Project = {
  id: string;
  cats: string[];
  name: string;
  kind: string;
  blurb: string;
  image: string;
  alt: string;
  modalKind: string;
  modalImage: string;
  tags: string[];
};

export const PROJECTS: Project[] = [
  {
    id: "aigenix",
    cats: [
      "ai",
      "web"
    ],
    image: "https://images.pexels.com/photos/7567560/pexels-photo-7567560.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "AI and financial technology workspace",
    kind: "AI · Fintech",
    name: "AiGenix",
    blurb: "AI, financial intelligence and digital product experience.",
    modalKind: "AI · FINTECH",
    tags: [
      "AI",
      "Data",
      "Fintech"
    ],
    modalImage: "https://images.pexels.com/photos/7567560/pexels-photo-7567560.jpeg?auto=compress&cs=tinysrgb&w=1600"
  },
  {
    id: "genix",
    cats: [
      "app",
      "web"
    ],
    image: "https://images.pexels.com/photos/5053740/pexels-photo-5053740.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "Mobile application experience",
    kind: "Mobile · Mobility",
    name: "Genix Drive",
    blurb: "A connected mobility product built around the digital customer journey.",
    modalKind: "MOBILE · MOBILITY",
    tags: [
      "Mobile",
      "Product",
      "UX"
    ],
    modalImage: "https://images.pexels.com/photos/5053740/pexels-photo-5053740.jpeg?auto=compress&cs=tinysrgb&w=1600"
  },
  {
    id: "rossais",
    cats: [
      "web"
    ],
    image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "Enterprise software team",
    kind: "Enterprise · Software",
    name: "Al Rossais Group",
    blurb: "Enterprise workflow and business application experience.",
    modalKind: "ENTERPRISE · SOFTWARE",
    tags: [
      "Enterprise",
      "Oracle APEX"
    ],
    modalImage: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1600"
  },
  {
    id: "flavours",
    cats: [
      "web",
      "brand"
    ],
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "Commerce and technology workspace",
    kind: "Retail · POS",
    name: "Flavours.sa",
    blurb: "Commerce and POS-focused digital experience for retail operations.",
    modalKind: "RETAIL · POS",
    tags: [
      "POS",
      "Retail",
      "Commerce"
    ],
    modalImage: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1600"
  },
  {
    id: "hinopak",
    cats: [
      "brand",
      "marketing"
    ],
    image: "https://images.pexels.com/photos/4489732/pexels-photo-4489732.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "Commercial vehicle",
    kind: "Automotive · Brand",
    name: "Hinopak Motors",
    blurb: "Brand-facing digital communication for an established automotive business.",
    modalKind: "AUTOMOTIVE · BRAND",
    tags: [
      "Brand",
      "Marketing"
    ],
    modalImage: "https://images.pexels.com/photos/4489732/pexels-photo-4489732.jpeg?auto=compress&cs=tinysrgb&w=1600"
  },
  {
    id: "rmd",
    cats: [
      "web",
      "marketing"
    ],
    image: "https://images.pexels.com/photos/3184436/pexels-photo-3184436.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "Technology workspace",
    kind: "Consumer Tech · Web",
    name: "Repair My Devices",
    blurb: "A clearer digital journey for a consumer technology repair business.",
    modalKind: "CONSUMER TECH · WEB",
    tags: [
      "Web",
      "UX",
      "Conversion"
    ],
    modalImage: "https://images.pexels.com/photos/3184436/pexels-photo-3184436.jpeg?auto=compress&cs=tinysrgb&w=1600"
  },
  {
    id: "service",
    cats: [
      "web",
      "marketing"
    ],
    image: "https://images.pexels.com/photos/5691659/pexels-photo-5691659.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "HVAC technician",
    kind: "Growth · Home Services",
    name: "Service Express",
    blurb: "Search, digital presence and enquiry-focused marketing for HVAC.",
    modalKind: "GROWTH · HOME SERVICES",
    tags: [
      "SEO",
      "Paid Media",
      "Growth"
    ],
    modalImage: "https://images.pexels.com/photos/5691659/pexels-photo-5691659.jpeg?auto=compress&cs=tinysrgb&w=1600"
  },
  {
    id: "pht",
    cats: [
      "web",
      "marketing"
    ],
    image: "https://images.pexels.com/photos/5691583/pexels-photo-5691583.jpeg?auto=compress&cs=tinysrgb&w=1400",
    alt: "Security technology",
    kind: "Security · Lead Generation",
    name: "PHT Security Systems",
    blurb: "Digital presence and lead-generation work for a US security business.",
    modalKind: "SECURITY · LEAD GENERATION",
    tags: [
      "Marketing",
      "Leads",
      "Web"
    ],
    modalImage: "https://images.pexels.com/photos/5691583/pexels-photo-5691583.jpeg?auto=compress&cs=tinysrgb&w=1600"
  }
];

export const PROJECT_FILTERS = [
  { label: "All", value: "all" },
  { label: "Web", value: "web" },
  { label: "Apps", value: "app" },
  { label: "AI", value: "ai" },
  { label: "Brand", value: "brand" },
  { label: "Marketing", value: "marketing" },
];
