"use client";

import Image from "next/image";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ananya Sharma",
    role: "CTO, Vaultify Inc.",
    quote:
      "Markition turned our fintech vision into a production-ready dashboard that honestly blew us away. Their team understood our requirements from day one and delivered without a single back-and-forth delay.",
    img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=80&h=80&fit=crop&crop=face",
  },
  {
    name: "Arjun Mehta",
    role: "Founder, PulseRun Health",
    quote:
      "The app Markition built feels incredibly polished. Our users kept saying it feels better than apps from much bigger companies. Retention jumped 40% in the first month — numbers don't lie.",
    img: "https://images.unsplash.com/photo-1618641986557-1ecd230959aa?w=80&h=80&fit=crop&crop=face",
  },
  {
    name: "Rahul Desai",
    role: "CEO, GreenRoute Logistics",
    quote:
      "Our AWS bills dropped by 60% after Markition rearchitected our infrastructure, and we're now handling 3x the traffic. That combination is almost unheard of. Genuinely one of the best decisions we made.",
    img: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=80&h=80&fit=crop&crop=face",
  },
  {
    name: "Pooja Iyer",
    role: "Head of Design, LearnForge Education",
    quote:
      "The design system Markition created is something our in-house team now builds on every single day. Accessible, consistent, and genuinely beautiful — it saved us months of foundational work.",
    img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=80&h=80&fit=crop&crop=face",
  },
  {
    name: "Vikram Joshi",
    role: "CTO, MedSync Health",
    quote:
      "HIPAA compliance, clean UI, delivered ahead of schedule — Markition checked every box we had and a few we hadn't even thought of. Every health-tech startup needs an engineering partner like this.",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
  },
  {
    name: "Kavya Nair",
    role: "VP of Product, Stackboard Labs",
    quote:
      "From kickoff call to go-live in 12 weeks — Markition shipped a full SaaS platform that handles thousands of concurrent users without flinching. I've worked with many agencies; these people are different.",
    img: "https://images.unsplash.com/photo-1614644147798-f8c0fc9da7f6?w=80&h=80&fit=crop&crop=face",
  },
  {
    name: "Snehal Patil",
    role: "Co-founder, FlatOrbit",
    quote:
      "FlatOrbit's design system and search experience were completely revamped by Markition. The attention to detail in every micro-interaction is exactly what a property platform needs to convert users.",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face",
  },
  {
    name: "Omkar Kulkarni",
    role: "Founder, PulseRun Health",
    quote:
      "Aamchi mobile app ekdum native feel deto. Pehilya mahingsat user retention 40% vadhle. FlatOrbit chi team saglyat best aahe, share sangte!",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
  },
  {
    name: "Vaishali Rane",
    role: "VP of Product, Stackboard Labs",
    quote:
      "12 athvadyaat aamacha poorna SaaS platform ready kelis. Hazaro concurrent users handle karto ani kutheyahi problem nahi. FlatOrbit che kaam apratim aahe!",
    img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=80&h=80&fit=crop&crop=face",
  },
];

// Split into 3 columns for desktop
const col1 = [testimonials[0], testimonials[3], testimonials[6]];
const col2 = [testimonials[1], testimonials[4], testimonials[7]];
const col3 = [testimonials[2], testimonials[5], testimonials[8]];

function TestimonialCard({ t }: { t: (typeof testimonials)[0] }) {
  return (
    <div className="group relative rounded-2xl bg-[#f2f2f2] p-6 shadow-[0_18px_55px_rgba(0,0,0,0.05)]">
      <Quote
        size={32}
        className="absolute right-5 top-5 fill-[#080b3f]/40 text-transparent transition-colors duration-300 group-hover:fill-[#062283]/80"
      />
      <div className="mb-5 flex items-center gap-3">
        <Image
          src={t.img}
          alt={t.name}
          width={44}
          height={44}
          className="size-11 rounded-full object-cover grayscale transition duration-500 group-hover:grayscale-0"
        />
        <div className="pr-10">
          <h3 className="text-sm font-black leading-tight text-black">{t.name}</h3>
          <p className="mt-0.5 text-xs leading-snug text-black/45">{t.role}</p>
        </div>
      </div>
      <p className="text-[14px] leading-6 text-black/65">{t.quote}</p>
    </div>
  );
}

function InfiniteColumn({
  items,
  duration,
  reverse = false,
}: {
  items: (typeof testimonials)[number][];
  duration: number;
  reverse?: boolean;
}) {
  // Duplicate so the loop is seamless (translate -50% = one full set)
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden" style={{ height: 580 }}>
      {/* Fade masks top/bottom */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-white to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-t from-white to-transparent" />

      <div
        className="flex flex-col gap-5"
        style={{
          animation: `testimonialScroll ${duration}s linear infinite ${reverse ? "reverse" : ""}`,
          willChange: "transform",
        }}
      >
        {doubled.map((t, i) => (
          <TestimonialCard key={`${t.name}-${i}`} t={t} />
        ))}
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section
      className="relative overflow-hidden bg-[#121212] px-4 py-10 md:py-14"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }}
    >
      <style>{`
        @keyframes testimonialScroll {
          0%   { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
      `}</style>

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "4px 4px",
        }}
      />

      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-2xl bg-white px-5 py-14 shadow-[0_40px_120px_rgba(0,0,0,0.35)] sm:px-8 md:px-14 md:py-20">
        {/* Heading */}
        <div className="mb-12 text-center">
          <p className="mx-auto mb-4 w-fit rounded-full bg-[#f4f4f4] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-black/45">
            Testimonial
          </p>
          <h2 className="text-4xl font-black tracking-tight text-black md:text-6xl">
            What They&apos;re Saying
          </h2>
        </div>

        {/* Desktop: 3-column infinite scrollers */}
        <div className="hidden gap-5 md:grid md:grid-cols-3 md:gap-6">
          <InfiniteColumn items={col1} duration={22} />
          <InfiniteColumn items={col2} duration={28} reverse />
          <InfiniteColumn items={col3} duration={25} />
        </div>

        {/* Mobile: single-column infinite scroller */}
        <div className="md:hidden">
          <InfiniteColumn items={testimonials} duration={40} />
        </div>
      </div>
    </section>
  );
}
