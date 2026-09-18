import { ArrowRight } from "lucide-react";
import { occasions, whatsappLink } from "@/data/site";
import { SectionHeading } from "./Ornament";

export function Occasions() {
  return (
    <section id="occasions" className="scroll-mt-20 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Step 1 · Discover"
          title="What Are You Celebrating?"
          subtitle="Tap your occasion to see designs made for it."
        />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-5">
          {occasions.map((o) => (
            <a
              key={o.name}
              href={whatsappLink(`Hi! I'm looking for a ${o.name} invitation.`)}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col overflow-hidden rounded-lg bg-card shadow-card ring-1 ring-gold/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-float"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={o.image}
                  alt={`${o.name} invitation design`}
                  width={768}
                  height={1024}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 grid size-9 place-items-center rounded-full bg-background/90 text-lg shadow-card">
                  {o.emoji}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-1.5 p-4">
                <h3 className="font-serif text-xl font-semibold leading-tight">{o.name}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground md:text-sm">{o.desc}</p>
                <span className="mt-auto inline-flex items-center gap-1 pt-2 text-[0.7rem] font-medium tracking-[0.18em] text-wine uppercase">
                  Explore Designs <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
