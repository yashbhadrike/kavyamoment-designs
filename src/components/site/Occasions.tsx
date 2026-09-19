import { occasions, whatsappLink } from "@/data/site";
import { SectionHeading } from "./Ornament";

export function Occasions() {
  return (
    <section id="occasions" className="scroll-mt-20 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Step 1 · Discover"
          title="What Are You Celebrating?"
          subtitle="Choose a celebration to start browsing."
        />
        <div className="scrollbar-none -mx-5 flex gap-3 overflow-x-auto px-5 pb-3 md:mx-0 md:px-0">
          {occasions.slice(0, 9).map((o) => (
            <a
              key={o.name}
              href={whatsappLink(`Hi! I'm looking for a ${o.name} invitation.`)}
              target="_blank"
              rel="noreferrer"
              className="group flex min-h-32 w-36 shrink-0 flex-col items-center justify-center border border-gold/30 bg-card px-3 py-5 text-center shadow-card transition-all hover:-translate-y-1 hover:border-gold"
            >
              <span className="text-2xl">{o.emoji}</span>
              <h3 className="mt-3 font-serif text-lg font-semibold leading-tight">{o.name}</h3>
              <span className="mt-2 text-[0.62rem] font-medium tracking-[0.16em] text-wine uppercase">Browse</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
