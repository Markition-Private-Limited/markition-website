import type { Service } from "./types";

export const NAV_LINKS = [
  { label: "Home" },
  { label: "About" },
  { label: "Services", dropdown: true },
  { label: "Solutions" },
  { label: "Industries", dropdown: true },
  { label: "Case Studies" },
  { label: "Portfolio" },
  { label: "Contact" },
] as const;

export const STATS = [
  {
    value: 90,
    suffix: "%",
    line1: "Customer satisfaction",
    line2: "and strategical success",
  },
  {
    value: 80,
    suffix: "+",
    line1: "Projects completed in",
    line2: "24 countries",
  },
  {
    value: 52,
    suffix: "+",
    line1: "Best Business",
    line2: "Awards",
  },
] as const;

export const TICKER_LOGOS = [
  { src: "/logos/clients/takeme.png", alt: "TakeMe", width: 1227, height: 1160 },
  { src: "/logos/clients/outdoor-cinema.png", alt: "Outdoor Cinema", width: 1326, height: 1049 },
  { src: "/logos/clients/rmd.png", alt: "Repair My Devices", width: 1689, height: 902 },
  { src: "/logos/clients/fast-access.png", alt: "Fast Access Logistic Services", width: 1324, height: 985 },
  { src: "/logos/clients/white-line.png", alt: "White Line", width: 2103, height: 572 },
  { src: "/logos/clients/high-voltage.png", alt: "High Voltage Specialists", width: 1594, height: 889 },
  { src: "/logos/clients/z-crest.png", alt: "Z", width: 1251, height: 1216 },
  { src: "/logos/clients/journey-joy.png", alt: "Journey Joy", width: 1470, height: 1036 },
] as const;

export const SERVICES: Service[] = [
  {
    id: "ai-agents",
    number: "01",
    label: "AI Agents",
    icon: "🤖",
    iconSrc: "/ai-agent.svg",
    description:
      "Custom multi-agent workflows engineered to research leads, synthesise operational reports, triage incoming tickets, and automate cross-platform decisions with high precision.",
    features: [
      "Multi-step decision logic trees",
      "API & Database tool integrations",
      "Self-correcting error handling",
      "Human-in-the-loop review guardrails",
    ],
    cta: "Deploy AI Agents",
  },
  {
    id: "ai-chatbots",
    number: "02",
    label: "AI Chatbots",
    icon: "💬",
    description:
      "Trained using custom RAG (Retrieval-Augmented Generation) pipelines to accurately answer complex customer queries, schedule appointments, and process instant sales transactions.",
    features: [
      "RAG Vector database search",
      "Multi-lingual natural dialogue",
      "Live human agent handoff",
      "Omnichannel deployment (Web, WhatsApp, Slack)",
    ],
    cta: "Deploy AI Chatbots",
  },
  {
    id: "workflow-automation",
    number: "03",
    label: "Workflow Automation",
    icon: "⚡",
    description:
      "Seamlessly link your marketing CRM, payment gateways, ERPs, and customer support channels with high-throughput serverless event pipelines.",
    features: [
      "Custom webhook triggers",
      "Sub-second data synchronization",
      "Audit logs & retry queues",
      "Zero-latency database updates",
    ],
    cta: "Automate Workflows",
  },
  {
    id: "voice-ai",
    number: "04",
    label: "Voice AI",
    icon: "🎙️",
    description:
      "Human-like AI voice agents that handle inbound calls, qualify prospects, book appointments, and follow up with leads — freeing your team for high-value conversations.",
    features: [
      "Real-time speech recognition",
      "Dynamic conversation scripting",
      "Calendar & CRM integration",
      "Sentiment analysis & routing",
    ],
    cta: "Deploy Voice AI",
  },
  {
    id: "crm-automation",
    number: "05",
    label: "CRM Automation",
    icon: "📊",
    description:
      "Intelligent CRM workflows that score leads, automate follow-ups, update records in real time, and surface actionable insights so your team closes deals faster.",
    features: [
      "AI-powered lead scoring",
      "Automated follow-up sequences",
      "Real-time record enrichment",
      "Pipeline stage triggers",
    ],
    cta: "Automate Your CRM",
  },
  {
    id: "whatsapp-agent",
    number: "06",
    label: "WhatsApp Agent",
    icon: "💬",
    description:
      "AI-powered WhatsApp agents that qualify leads, handle inbound conversations, book calls, and close deals directly inside WhatsApp — 24/7, at scale.",
    features: [
      "Inbound call & chat handling",
      "Lead qualification & scoring",
      "Calendar booking integration",
      "Twilio & Meta API powered",
    ],
    cta: "Deploy WhatsApp Agent",
  },
];

export const INITIAL_CHAT_MESSAGES = [
  {
    sender: "bot" as const,
    text: "Hello! I am Markition Growth Assistant. How can I assist with your AI & marketing strategy today?",
  },
  {
    sender: "user" as const,
    text: "Can you show me how AI agents automate lead qualification?",
  },
];
