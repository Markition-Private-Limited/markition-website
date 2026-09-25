import {
  Archive,
  ArrowUpRight,
  Briefcase,
  Building2,
  CheckCircle,
  Clock,
  Code2,
  Eye,
  EyeOff,
  Gauge,
  Globe,
  GitMerge,
  Headphones,
  Heart,
  LayoutDashboard,
  Map,
  MinusCircle,
  Monitor,
  Palette,
  Plug,
  Rocket,
  Search,
  Server,
  Settings,
  Smartphone,
  ShoppingCart,
  Target,
  TrendingUp,
  Unlink,
  UserCheck,
  Users,
  Users2,
  Wrench,
  Zap
} from "lucide-react";

export const stats = [
  { value: "Custom-Built", label: "for every client" },
  { value: "End-to-End", label: "strategy to deployment" },
  { value: "Long-Term", label: "support & scale" }
];

export const featuredMetrics = [
  {
    label: "Business Systems",
    value: "CRM, ERP, Platforms",
    icon: Building2
  },
  {
    label: "Full Delivery",
    value: "Design, Build, Support",
    icon: ArrowUpRight
  }
];

export const problems = [
  {
    title: "Manual Processes",
    description:
      "Too much time spent on repetitive tasks, data entry, approvals, and follow-ups.",
    icon: Clock
  },
  {
    title: "Disconnected Software",
    description:
      "Your CRM, ERP, website, accounting tools, and internal systems operate independently.",
    icon: Unlink
  },
  {
    title: "Outdated Systems",
    description:
      "Legacy software slows your team down and makes it harder to adapt.",
    icon: Archive
  },
  {
    title: "Too Many Spreadsheets",
    description:
      "Critical business information is scattered across files, departments, and people.",
    icon: Plug
  },
  {
    title: "Limited Visibility",
    description:
      "Decision-makers don't have a clear, real-time view of operations and performance.",
    icon: EyeOff
  },
  {
    title: "Systems That Don't Communicate",
    description:
      "Your technology stack creates silos instead of one connected business ecosystem.",
    icon: GitMerge
  }
];

export const services = [
  {
    title: "CRM Development",
    description:
      "Custom customer relationship management systems that centralize leads, customers, sales activities, communication, and business intelligence.",
    icon: Users
  },
  {
    title: "ERP Solutions",
    description:
      "Connect finance, operations, inventory, HR, sales, purchasing, and other core business functions through integrated ERP solutions.",
    icon: Building2
  },
  {
    title: "Custom Software Development",
    description:
      "Purpose-built software designed to solve specific business problems that standard platforms can't handle.",
    icon: Code2
  },
  {
    title: "Web Development",
    description:
      "High-performance websites and web platforms built for business growth, usability, scalability, and long-term performance.",
    icon: Globe
  },
  {
    title: "Web Applications",
    description:
      "Interactive web applications that turn complex processes into streamlined digital experiences.",
    icon: Monitor
  },
  {
    title: "Mobile App Development",
    description:
      "iOS and Android applications designed around your users and connected to the systems behind your business.",
    icon: Smartphone
  },
  {
    title: "E-commerce Development",
    description:
      "Scalable e-commerce platforms that connect products, customers, payments, inventory, orders, and business operations.",
    icon: ShoppingCart
  },
  {
    title: "Portals & Dashboards",
    description:
      "Centralized portals and intelligent dashboards that give teams and customers access to the information they need.",
    icon: LayoutDashboard
  },
  {
    title: "APIs & Integrations",
    description:
      "Connect your existing technology stack and make your systems communicate seamlessly.",
    icon: GitMerge
  },
  {
    title: "Industry-Specific Solutions",
    description:
      "Technology designed around the workflows, regulations, challenges, and opportunities of specific industries.",
    icon: Briefcase
  }
];

export const solutions = [
  {
    title: "CRM Solutions",
    description:
      "Centralize customer data, automate sales processes, manage leads, and give your teams a complete view of every customer interaction.",
    icon: Users
  },
  {
    title: "ERP Solutions",
    description:
      "Bring your core business operations together with integrated ERP solutions that improve visibility, control, and efficiency.",
    icon: Building2
  },
  {
    title: "Business Management Systems",
    description:
      "Replace fragmented tools and manual workflows with centralized systems built around your operational requirements.",
    icon: Settings
  },
  {
    title: "Customer Portals",
    description:
      "Give customers secure, convenient access to services, documents, orders, account information, support, and more.",
    icon: UserCheck
  },
  {
    title: "Internal Platforms",
    description:
      "Build digital environments that help employees manage workflows, collaborate, access information, and complete tasks faster.",
    icon: Server
  },
  {
    title: "Industry Solutions",
    description:
      "Deploy technology designed around the specific needs of your industry — rather than adapting your business to generic software.",
    icon: Briefcase
  },
  {
    title: "Automation & Integrations",
    description:
      "Connect your systems, automate repetitive processes, and create smoother data flows across your organization.",
    icon: Zap
  }
];

export const industries = [
  "Healthcare",
  "Real Estate",
  "Education",
  "Retail",
  "Manufacturing",
  "Logistics",
  "Finance",
  "Hospitality",
  "Other Industries"
];

export const processSteps = [
  {
    title: "Discover",
    description:
      "We understand your business, users, processes, challenges, goals, and technology requirements.",
    icon: Search
  },
  {
    title: "Plan",
    description:
      "We define the scope, architecture, technology approach, priorities, and roadmap for your solution.",
    icon: Map
  },
  {
    title: "Design",
    description:
      "We create intuitive user experiences and interfaces that make complex technology simple to use.",
    icon: Palette
  },
  {
    title: "Develop",
    description:
      "Our engineering team builds the solution using scalable architecture and technologies suited to your requirements.",
    icon: Code2
  },
  {
    title: "Test",
    description:
      "We test functionality, usability, performance, integrations, security, and reliability before launch.",
    icon: CheckCircle
  },
  {
    title: "Launch",
    description:
      "We deploy your technology and make sure everything is ready for real-world use.",
    icon: Rocket
  },
  {
    title: "Support & Scale",
    description:
      "We continue to improve, maintain, optimize, and scale your technology as your business evolves.",
    icon: TrendingUp
  }
];

export const techCategories = [
  "Frontend",
  "Backend",
  "Mobile",
  "Cloud",
  "Databases",
  "APIs",
  "Infrastructure",
  "Development Technologies"
];

export const projects = [
  {
    name: "AimScholar",
    category: "Education platform",
    image: "/tech/aimscholar-CvJCjHHq.png",
    href: "https://www.aimscholar.in/"
  },
  {
    name: "Arka Homes",
    category: "Real estate experience",
    image: "/tech/arkahomes-BW72MAUe.png",
    href: "#"
  },
  {
    name: "Aura",
    category: "Brand and web system",
    image: "/tech/aura-EBD47GL-.png",
    href: "#"
  }
];

export const projectOutcomes = [
  { label: "Faster Processes", icon: Gauge },
  { label: "Reduced Manual Work", icon: MinusCircle },
  { label: "Connected Systems", icon: GitMerge },
  { label: "Improved Visibility", icon: Eye },
  { label: "Better Customer Experience", icon: Heart },
  { label: "Scalable Operations", icon: TrendingUp }
];

export const whyReasons = [
  {
    title: "Business-First Development",
    description:
      "We start with your business objectives, workflows, users, and challenges — not just technical requirements.",
    icon: Target
  },
  {
    title: "Custom-Built Solutions",
    description:
      "Your business is unique. Your technology should be designed around your actual processes instead of forcing you into generic workflows.",
    icon: Wrench
  },
  {
    title: "Scalable Architecture",
    description:
      "We build with the future in mind, so your technology can evolve as your users, data, operations, and business grow.",
    icon: TrendingUp
  },
  {
    title: "One Team From Strategy to Deployment",
    description:
      "From discovery and planning to design, development, deployment, and support — your project stays connected under one team.",
    icon: Users2
  },
  {
    title: "Long-Term Support",
    description:
      "Technology doesn't end at launch. We help maintain, optimize, improve, and scale your systems over time.",
    icon: Headphones
  }
];

export const connectedNodes = [
  "CRM",
  "ERP",
  "WEBSITE",
  "MOBILE",
  "APIs",
  "DATA",
  "AUTOMATION"
];

export const connectedBenefits = [
  "One Connected Ecosystem",
  "Better Data Flow",
  "Greater Visibility",
  "Smarter Automation",
  "Ready to Scale"
];

export const outcomes = [
  { label: "More Efficient Operations", icon: Zap },
  { label: "Better Visibility", icon: Eye },
  { label: "Lower Operational Complexity", icon: MinusCircle },
  { label: "Faster Workflows", icon: Gauge },
  { label: "Better Customer Experiences", icon: Heart },
  { label: "Scalable Growth", icon: TrendingUp }
];

export const footerServices = [
  "Software Development",
  "CRM Development",
  "ERP Solutions",
  "Business Management Systems",
  "Web Applications",
  "Mobile Applications",
  "SaaS Platforms",
  "E-commerce Development",
  "Portals & Dashboards",
  "APIs & Integrations",
  "Industry Solutions",
  "Business Automation"
];

export const footerIndustries = [
  "Healthcare",
  "Real Estate",
  "Education",
  "Retail",
  "Manufacturing",
  "Logistics",
  "Finance",
  "Hospitality"
];
