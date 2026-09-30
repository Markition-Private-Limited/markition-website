import Image from "next/image";
import { Quote, Play } from "lucide-react";

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
      "The app Markition built for us feels incredibly polished. Our users kept saying it feels better than apps from much bigger companies. Retention jumped 40% in the first month — numbers don't lie.",
    img: "https://images.unsplash.com/photo-1618641986557-1ecd230959aa?w=80&h=80&fit=crop&crop=face",
  },
  {
    name: "Rahul Desai",
    role: "CEO, GreenRoute Logistics",
    quote:
      "Our AWS bills dropped by 60% after Markition rearchitected our infrastructure, and we are now handling 3x the traffic. That combination is almost unheard of. Genuinely one of the best decisions we made.",
    img: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=80&h=80&fit=crop&crop=face",
  },
  {
    name: "Pooja Iyer",
    role: "Head of Design, LearnForge Education",
    quote:
      "The design system Markition created is something our in-house team now builds on top of every single day. Accessible, consistent, and genuinely beautiful. It saved us months of foundational work.",
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
      "From kickoff call to go-live in 12 weeks — Markition shipped a full SaaS platform that handles thousands of concurrent users without flinching. I have worked with many agencies, these people are different.",
    img: "https://images.unsplash.com/photo-1614644147798-f8c0fc9da7f6?w=80&h=80&fit=crop&crop=face",
  },
];

const col1 = [testimonials[0], testimonials[3]];
const col2 = [testimonials[1], testimonials[4]];
const col3 = [testimonials[2], testimonials[5]];

function TestimonialCard({ t }: { t: (typeof testimonials)[0] }) {
  return (
    <div className="group relative min-h-[230px] rounded-[24px] bg-[#f2f2f2] p-6 shadow-[0_18px_55px_rgba(0,0,0,0.05)]">
      <Quote
        size={36}
        className="absolute right-5 top-5 fill-[#080b3f]/50 group-hover:fill-[#062283]/90 text-black/10 transition-colors duration-300"
      />
      <div className="mb-7 flex items-center gap-3">
        <Image
          src={t.img}
          alt={t.name}
          width={48}
          height={48}
          className="size-12 rounded-full object-cover grayscale transition duration-500 group-hover:grayscale-0"
        />
        <div className="pr-10">
          <h3 className="text-md font-black leading-tight text-black">
            {t.name}
          </h3>
          <p className="mt-1 text-sm leading-snug text-black/45">{t.role}</p>
        </div>
      </div>
      <p className="text-[15px] font-medium leading-6 text-black/70">
        {t.quote}
      </p>
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden bg-[#121212] px-4 py-16 md:py-24" style={{ backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)", backgroundSize: "80px 80px" }}>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "4px 4px",
        }}
      />

      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-lg bg-white px-5 py-16 shadow-[0_40px_120px_rgba(0,0,0,0.35)] sm:px-8 md:rounded-lg md:px-14 md:py-24">
        <div className="mb-14 text-center md:mb-20">
          <p className="mx-auto mb-4 w-fit rounded-full bg-[#f4f4f4] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-black/45">
            Testimonial
          </p>
          <h2 className="text-4xl font-black tracking-tight text-black md:text-6xl">
            What They&apos;re Saying
          </h2>
        </div>

        {/* Featured video testimonial */}
        <div className="relative mb-8 min-h-[280px] overflow-hidden rounded-xl bg-black shadow-2xl group">
          <Image
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=400&fit=crop&crop=face"
            alt="Priya"
            fill
            className="object-cover grayscale transition duration-700 group-hover:scale-110 group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
          <div className="absolute left-5 top-5 flex size-10 items-center justify-center rounded-lg bg-white/80 backdrop-blur-md transition group-hover:bg-white">
            <Play size={16} className="fill-black text-black" />
          </div>
          <div className="absolute bottom-5 left-5 right-5">
            <p className="mb-3 text-xs font-bold text-white/80">Markition</p>
            <h3 className="max-w-[260px] text-2xl font-black leading-[1.05] tracking-tight text-white">
              How Priya Improved Business Growth
            </h3>
          </div>
        </div>

        {/* Testimonial cards grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          <div className="flex flex-col gap-5 md:gap-6">
            {col1.map((t) => (
              <TestimonialCard key={t.name} t={t} />
            ))}
          </div>
          <div className="flex flex-col gap-5 md:gap-6">
            {col2.map((t) => (
              <TestimonialCard key={t.name} t={t} />
            ))}
          </div>
          <div className="flex flex-col gap-5 md:gap-6">
            {col3.map((t) => (
              <TestimonialCard key={t.name} t={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
