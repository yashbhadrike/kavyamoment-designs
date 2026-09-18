import { whyUs } from "@/data/site";
import { Flourish, SectionHeading } from "./Ornament";

export function WhyUs() {
  return (
    <section className="relative overflow-hidden bg-ivory-deep/60 py-16 md:py-24">
      <Flourish className="pointer-events-none absolute -right-16 -top-8 w-72 opacity-40" />
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading eyebrow="Why KavyaVerse Digital" title="More Than Just an Invitation." />
        <div className="grid gap-px overflow-hidden rounded-lg bg-gold/30 ring-1 ring-gold/30 sm:grid-cols-2 lg:grid-cols-4">
          {whyUs.map((w, i) => (
            <div key={w.title} className="flex flex-col gap-3 bg-card p-7 md:p-8">
              <span className="font-serif text-4xl font-medium text-gold">0{i + 1}</span>
              <h3 className="text-xs font-semibold tracking-[0.22em] text-wine uppercase">{w.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{w.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
