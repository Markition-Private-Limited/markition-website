import Image from "next/image";
import Link from "next/link";

const posts = [
  {
    href: "/blog/why-your-business-needs-a-website-in-2026",
    title: "Why Your Business Needs a Website in 2026",
    excerpt: "In a world driven by digital-first experiences, not having a website is like having a storefront with no sign. Here is why 2026 is the year to invest.",
    img: "/blog/website.png",
    tag: "Business",
    author: "Ranjit",
    authorInitial: "R",
    date: "28 Apr 2026",
    readTime: "6 min read",
    featured: true,
    overlay: false,
  },
  {
    href: "/blog/react-vs-nextjs-which-should-you-choose",
    title: "React vs Next.js — Which Should You Choose?",
    img: "/blog/react.png",
    tag: "Tech",
    author: "Ranjit",
    date: "21 Apr 2026",
    featured: false,
    overlay: true,
  },
  {
    href: "/blog/how-much-does-a-mobile-app-cost-in-india",
    title: "How Much Does a Mobile App Cost in India?",
    img: "/blog/mobileDark.png",
    tag: "Mobile",
    author: "Ranjit",
    date: "14 Apr 2026",
    featured: false,
    overlay: false,
  },
  {
    href: "/blog/5-signs-your-business-needs-custom-software",
    title: "5 Signs Your Business Needs Custom Software",
    img: "/blog/custom.png",
    tag: "Software",
    author: "Ranjit",
    date: "07 Apr 2026",
    featured: false,
    overlay: false,
  },
  {
    href: "/blog/what-is-seo-and-why-does-it-matter-for-smbs",
    title: "What is SEO and Why Does It Matter for SMBs?",
    img: "/blog/seo1.png",
    tag: "SEO",
    author: "Vinayak",
    date: "31 Mar 2026",
    featured: false,
    overlay: false,
  },
];

export function BlogSection() {
  const [featured, overlayCard, ...smallCards] = posts;

  return (
    <section className="bg-transparent px-4 py-20 sm:px-6 lg:px-8" style={{ backgroundImage: "linear-gradient(to right, #e4e4e4 1px, transparent 1px), linear-gradient(to bottom, #e4e4e4 1px, transparent 1px)", backgroundSize: "80px 80px" }}>
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-10 text-center text-3xl font-black tracking-tight text-[#080b3f] md:text-4xl">
          Our Blog
        </h2>

        {/* Top row: featured + overlay card */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Featured card - spans 2 cols */}
          <Link
            href={featured.href}
            className="group overflow-hidden rounded-2xl bg-white shadow-[0_20px_60px_rgba(18,24,31,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(18,24,31,0.14)] lg:col-span-2 lg:grid lg:grid-cols-2"
          >
            <div className="h-72 overflow-hidden lg:h-full">
              <Image
                src={featured.img}
                alt={featured.title}
                width={600}
                height={400}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-center p-7">
              <span className="mb-4 w-fit rounded-full bg-[#062283]/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#062283]">
                {featured.tag}
              </span>
              <h3 className="mb-4 text-2xl font-black leading-tight text-[#080b3f] transition-colors group-hover:text-[#062283] md:text-3xl">
                {featured.title}
              </h3>
              <p className="mb-6 line-clamp-3 text-sm leading-6 text-[#080b3f]/60">
                {featured.excerpt}
              </p>
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-[#080b3f] text-sm font-bold text-white">
                  {featured.authorInitial}
                </div>
                <div>
                  <p className="text-sm font-bold text-[#080b3f]">{featured.author}</p>
                  <p className="text-xs text-[#080b3f]/50">{featured.date} • {featured.readTime}</p>
                </div>
              </div>
            </div>
          </Link>

          {/* Overlay card */}
          <Link
            href={overlayCard.href}
            className="group relative block overflow-hidden rounded-2xl bg-white shadow-[0_20px_50px_rgba(18,24,31,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_70px_rgba(18,24,31,0.14)] h-full min-h-[280px]"
          >
            <div className="absolute inset-0 h-full overflow-hidden">
              <Image
                src={overlayCard.img}
                alt={overlayCard.title}
                fill
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[#080b3f]/95 via-[#080b3f]/65 to-transparent p-6">
              <h3 className="line-clamp-2 text-xl font-black leading-snug text-white">{overlayCard.title}</h3>
              <p className="mt-3 text-sm font-semibold text-white/90">{overlayCard.author} • {overlayCard.date}</p>
            </div>
          </Link>
        </div>

        {/* Bottom row: smaller cards */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {smallCards.map((post) => (
            <Link
              key={post.href}
              href={post.href}
              className="group relative block overflow-hidden rounded-2xl bg-white shadow-[0_20px_50px_rgba(18,24,31,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_70px_rgba(18,24,31,0.14)]"
            >
              <div className="h-56 overflow-hidden">
                <Image
                  src={post.img}
                  alt={post.title}
                  width={400}
                  height={224}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <span className="mb-3 inline-block rounded-full bg-[#062283]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-[#062283]">
                  {post.tag}
                </span>
                <h3 className="mb-2 line-clamp-2 text-base font-black leading-snug text-[#080b3f] transition-colors group-hover:text-[#062283]">
                  {post.title}
                </h3>
                <p className="text-xs font-medium text-[#080b3f]/50">{post.author} • {post.date}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
