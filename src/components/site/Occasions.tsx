import { useQuery } from "@tanstack/react-query";
import { occasionsQuery } from "@/lib/cms";
import { getOccasionIcon } from "@/lib/occasion-icons";
import { useOccasionFilter } from "./occasion-filter";
import { SectionHeading } from "./Ornament";
import { cn } from "@/lib/utils";

export function Occasions() {
  const { data: occasions = [] } = useQuery(occasionsQuery);
  const { occasion, setOccasion } = useOccasionFilter();

  const handleSelect = (name: string) => {
    setOccasion(occasion === name ? null : name);
    document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="occasions" className="scroll-mt-20 py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Step 1 · Discover"
          title="What Are You Celebrating?"
          subtitle="Choose an occasion to explore designs."
        />
        <div className="scrollbar-none -mx-5 flex gap-3 overflow-x-auto px-5 pb-2 md:mx-0 md:flex-wrap md:justify-center md:px-0">
          {occasions.map((o) => {
            const Icon = getOccasionIcon(o.icon);
            const selected = occasion === o.name;
            return (
              <button
                key={o.id}
                type="button"
                onClick={() => handleSelect(o.name)}
                aria-pressed={selected}
                className={cn(
                  "group flex w-24 shrink-0 flex-col items-center justify-center gap-2.5 rounded-md border px-3 py-4 text-center transition-all duration-200 md:w-28",
                  selected
                    ? "border-wine bg-wine text-primary-foreground shadow-float"
                    : "border-gold/35 bg-card text-foreground shadow-card hover:border-wine hover:bg-wine hover:text-primary-foreground",
                )}
              >
                <Icon
                  className={cn(
                    "size-6 transition-colors",
                    selected ? "text-gold" : "text-gold-dark group-hover:text-gold",
                  )}
                  strokeWidth={1.4}
                />
                <span className="font-sans text-[0.72rem] leading-tight font-medium">{o.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
