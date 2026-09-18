import { steps } from "@/data/site";
import { SectionHeading } from "./Ornament";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20 bg-ivory-deep/60 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading eyebrow="Step 5 · Order" title="From Idea to Invitation in 4 Simple Steps." />

        <ol className="relative grid gap-10 md:grid-cols-4 md:gap-6">
          {/* horizontal line (desktop) */}
          <span className="absolute top-7 right-[12%] left-[12%] hidden h-px bg-gold/50 md:block" aria-hidden />
          {/* vertical line (mobile) */}
          <span className="absolute top-2 bottom-2 left-7 w-px bg-gold/50 md:hidden" aria-hidden />

          {steps.map((s) => (
            <li key={s.n} className="relative flex gap-5 md:flex-col md:items-center md:text-center">
              <span className="relative z-10 grid size-14 shrink-0 place-items-center rounded-full bg-wine-gradient font-serif text-xl font-semibold text-primary-foreground shadow-card ring-4 ring-background">
                {s.n}
              </span>
              <div className="pt-2 md:pt-4">
                <h3 className="text-sm font-semibold tracking-[0.2em] text-wine uppercase">{s.title}</h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
