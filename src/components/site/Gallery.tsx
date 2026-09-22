import { useEffect, useState } from "react";
import { designs, formatINR, galleryFilters, whatsappLink, type GalleryFilter } from "@/data/site";
import { SectionHeading } from "./Ornament";
import { useOccasionFilter } from "./occasion-filter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Gallery() {
  const [active, setActive] = useState<GalleryFilter>("All");
  const { occasion } = useOccasionFilter();

  useEffect(() => {
    if (!occasion) return;
    const match = galleryFilters.find((f) => f.toLowerCase() === occasion.toLowerCase());
    setActive((match ?? "All") as GalleryFilter);
  }, [occasion]);
  const list = active === "All" ? designs : designs.filter((d) => d.tags.includes(active));

  return (
    <section id="gallery" className="scroll-mt-20 bg-ivory-deep/60 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Pick a Style"
          title="Find a Design You Love."
          subtitle="Every design shows its format, inclusions and price upfront."
        />

        <div className="scrollbar-none -mx-5 mb-8 flex gap-2 overflow-x-auto px-5 pb-2 md:mx-0 md:flex-wrap md:justify-center md:px-0">
          {galleryFilters.map((f) => (
            <Button
              key={f}
              variant="ghost"
              size="sm"
              onClick={() => setActive(f)}
              className={cn(
                "h-9 shrink-0 border px-4 text-xs",
                active === f
                  ? "border-wine bg-wine text-primary-foreground shadow-card"
                  : "border-gold/40 bg-card text-foreground/75 hover:border-gold hover:text-wine",
              )}
              aria-pressed={active === f}
            >
              {f}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {list.map((d) => (
            <a
              key={d.name}
              href={whatsappLink(`Hi! I love the "${d.name}" design. I'd like to order it.`)}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col overflow-hidden border border-gold/30 bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-float"
            >
              <div className="relative flex aspect-[3/4] items-center justify-center overflow-hidden bg-ivory-deep p-4">
                <div className="flex size-full flex-col items-center justify-center border border-gold/45 bg-background p-3 text-center transition-transform duration-500 group-hover:scale-[1.02]">
                  <span className="text-[0.5rem] tracking-[0.22em] text-gold-dark uppercase">{d.occasion}</span>
                  <div className="my-4 h-px w-12 bg-gold/60" />
                  <span className="font-serif text-xl leading-tight text-wine md:text-2xl">{d.name}</span>
                  <span className="mt-4 text-[0.5rem] tracking-[0.18em] text-muted-foreground uppercase">Personalised for you</span>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-3.5 md:p-4">
                <div className="min-w-0">
                  <h3 className="font-serif text-lg font-semibold leading-tight md:text-xl">{d.name}</h3>
                  <p className="text-[0.7rem] tracking-[0.15em] text-muted-foreground uppercase">{d.occasion}</p>
                  <p className="mt-2 text-xs text-muted-foreground">HD card · personalised details</p>
                </div>
                <div className="mt-3">
                  <p className="text-[0.6rem] tracking-[0.15em] text-muted-foreground uppercase">from</p>
                  <p className="font-sans text-xl font-semibold text-wine">{formatINR(d.price)}</p>
                </div>
              </div>
              <span className="flex items-center justify-between border-t border-gold/25 px-4 py-2.5 text-[0.68rem] font-medium tracking-[0.18em] text-wine uppercase transition-colors group-hover:bg-gold/10">
                View Design <ArrowRight className="size-3.5" />
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
