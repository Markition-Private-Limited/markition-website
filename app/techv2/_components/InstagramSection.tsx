import Image from "next/image";
import { ExternalLink } from "lucide-react";

const posts = [
  { src: "/instagram/scale-beyond.png", alt: "Scale Beyond Websites" },
  { src: "/instagram/get-back-online.png", alt: "Get Back Online" },
  { src: "/instagram/existing-isnt-growing.png", alt: "Existing Isn't Growing" },
  { src: "/instagram/business-up.png", alt: "Business Up" },
  { src: "/instagram/while-others-blur.png", alt: "While Others Blur" },
  { src: "/instagram/check-it-out.png", alt: "Check It Out" },
  { src: "/instagram/easy-to-ignore.png", alt: "Easy To Ignore" },
];

export function InstagramSection() {
  return (
    <section
      className="relative overflow-hidden py-20 md:py-24"
      style={{
        backgroundImage:
          "linear-gradient(to right, #e4e4e4 1px, transparent 1px), linear-gradient(to bottom, #e4e4e4 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#062283]">
              Social Proof
            </p>
            <h2 className="text-3xl font-black tracking-tight text-[#080b3f] md:text-4xl">
              Latest From Instagram
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Selected Markition posts, campaigns and creative updates.
            </p>
          </div>
          <a
            href="https://www.instagram.com/markition/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-lg bg-[#080b3f] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#062283]"
          >
            View on Instagram
            <ExternalLink size={16} />
          </a>
        </div>

        {/* Horizontal carousel — touch-scrollable on mobile, drag-scrollable on desktop */}
        <div
          className="flex gap-4 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden"
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
          }}
        >
          {posts.map((post) => (
            <a
              key={post.src}
              href="https://www.instagram.com/markition/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square w-[75vw] shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:w-[42vw] md:w-[30vw] lg:w-64"
              style={{ scrollSnapAlign: "start" }}
            >
              <Image
                src={post.src}
                alt={post.alt}
                fill
                sizes="(max-width: 640px) 75vw, (max-width: 768px) 42vw, (max-width: 1024px) 30vw, 256px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
