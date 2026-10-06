const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "30+", label: "Happy Clients" },
  { value: "3+", label: "Years Active" },
  { value: "98%", label: "Clients Satisfaction" },
];

export function StatsSection() {
  return (
    <section className="py-10 max-w-7xl mx-auto bg-[#080b3f] rounded-xl my-4" style={{ backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.07) 1px, transparent 1px)", backgroundSize: "80px 80px" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="group cursor-pointer text-center">
                <div className="text-4xl md:text-5xl text-white tabular-nums transition-transform duration-200 group-hover:scale-105 font-black">
                  {stat.value}
                </div>
                <p className="mt-2 text-sm font-medium text-white transition-colors group-hover:text-[#062283]">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
