import { useState } from "react";
import { designs, formatINR, galleryFilters, whatsappLink, type GalleryFilter } from "@/data/site";
import { SectionHeading } from "./Ornament";
import { cn } from "@/lib/utils";

export function Gallery() {
  const [active, setActive] = useState<GalleryFilter>("All");
  const list = active === "All" ? designs : designs.filter((d) => d.tags.includes(active));

  return (
    <section id="gallery" className="scroll-mt-20 bg-ivory-deep/60 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Pick a Style"
          title="Pick a Style You Love."
          subtitle="Choose a design first — we personalise it with your details."
        />

        <div className="scrollbar-none -mx-5 mb-8 flex gap-2 overflow-x-auto px-5 pb-2 md:mx-0 md:flex-wrap md:justify-center md:px-0">
          {galleryFilters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-1.5 text-xs font-medium tracking-[0.12em] uppercase transition-all",
                active === f
                  ? "border-wine bg-wine text-primary-foreground shadow-card"
                  : "border-gold/40 bg-card text-foreground/75 hover:border-gold hover:text-wine",
              )}
              aria-pressed={active === f}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {list.map((d) => (
            <a
              key={d.name}
              href={whatsappLink(`Hi! I love the "${d.name}" design. I'd like to order it.`)}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col overflow-hidden rounded-lg bg-card shadow-card ring-1 ring-gold/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-float"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={d.image}
                  alt={`${d.name} — ${d.occasion} invitation`}
                  width={768}
                  height={1024}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex items-end justify-between gap-2 p-3.5 md:p-4">
                <div>
                  <h3 className="font-serif text-lg font-semibold leading-tight md:text-xl">{d.name}</h3>
                  <p className="text-[0.7rem] tracking-[0.15em] text-muted-foreground uppercase">{d.occasion}</p>
                </div>
                <div className="text-right">
                  <p className="text-[0.6rem] tracking-[0.15em] text-muted-foreground uppercase">from</p>
                  <p className="font-serif text-lg font-semibold text-wine">{formatINR(d.price)}</p>
                </div>
              </div>
              <span className="border-t border-gold/25 px-4 py-2.5 text-center text-[0.68rem] font-medium tracking-[0.2em] text-wine uppercase transition-colors group-hover:bg-gold/10">
                View Design
              </span>
            </a>
          ))}
        </div>
        {list.length === 0 && (
          <p className="py-10 text-center text-muted-foreground">New designs in this style are coming soon.</p>
        )}
      </div>
    </section>
  );
}
