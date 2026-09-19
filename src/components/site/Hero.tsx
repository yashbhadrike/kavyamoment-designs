import { ButtonLink } from "@/components/ui/button";
import { Flourish, Ornament } from "./Ornament";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <Flourish className="pointer-events-none absolute -top-6 -left-10 w-64 opacity-60 md:w-96" />
      <Flourish className="pointer-events-none absolute -right-10 -bottom-10 w-64 rotate-180 opacity-50 md:w-96" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pt-14 pb-16 md:px-8 md:pt-20 md:pb-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div className="animate-rise flex flex-col items-start text-left">
          <span className="eyebrow mb-5">Digital Invitations • Designs • Celebrations</span>
          <h1 className="font-serif text-5xl leading-[0.98] font-medium text-balance md:text-6xl lg:text-7xl">
            Your Occasion.<br />Your Story.<br /><span className="text-wine italic">Beautifully Designed.</span>
          </h1>
          <Ornament className="my-6" />
          <p className="max-w-lg text-base text-muted-foreground md:text-lg">
            Beautiful digital invitations for weddings, birthdays, ceremonies and every moment worth celebrating.
          </p>
          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <ButtonLink href="#occasions" variant="gold" size="lg">
              Explore Invitations
            </ButtonLink>
            <ButtonLink href="#pricing" variant="outline" size="lg">
              View Pricing
            </ButtonLink>
          </div>
          <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-gold/30 pt-6 text-left">
            {[
              ["₹499", "Starting price"],
              ["24 hrs", "Fast delivery"],
              ["WhatsApp", "Ready to share"],
            ].map(([v, l]) => (
              <div key={l}>
                <dt className="font-serif text-2xl font-semibold text-wine md:text-3xl">{v}</dt>
                <dd className="text-[0.7rem] tracking-[0.18em] text-muted-foreground uppercase">{l}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto aspect-[5/4] w-full max-w-xl" aria-label="Invitation format preview">
          <div className="absolute left-[4%] top-[14%] w-[38%] -rotate-6 border border-gold/40 bg-card p-3 shadow-card">
            <div className="aspect-[3/4] border border-gold/25 bg-ivory-deep p-4 text-center">
              <span className="text-[0.55rem] tracking-[0.25em] text-gold-dark uppercase">Wedding</span>
              <div className="mx-auto mt-8 size-8 rotate-45 border border-gold" />
              <p className="mt-8 font-serif text-2xl text-wine">Aarav<br />&amp;<br />Meera</p>
              <div className="mx-auto mt-6 h-px w-16 bg-gold/60" />
            </div>
          </div>
          <div className="absolute left-[31%] top-0 z-10 w-[42%] border border-gold/50 bg-card p-3 shadow-float">
            <div className="frame-gold flex aspect-[3/4] flex-col items-center justify-center bg-background p-5 text-center">
              <span className="text-[0.55rem] tracking-[0.28em] text-gold-dark uppercase">You are invited</span>
              <Ornament className="my-5 w-24" />
              <p className="font-serif text-3xl leading-none text-wine">A Beautiful<br />Beginning</p>
              <p className="mt-5 text-[0.58rem] tracking-[0.18em] uppercase">18 • 12 • 2026</p>
            </div>
          </div>
          <div className="absolute right-[4%] top-[16%] w-[38%] rotate-6 border border-gold/40 bg-wine p-3 shadow-card">
            <div className="flex aspect-[3/4] flex-col items-center justify-center border border-gold/50 p-4 text-center text-primary-foreground">
              <span className="text-[0.55rem] tracking-[0.25em] text-gold-light uppercase">Celebrate</span>
              <p className="mt-7 font-serif text-3xl italic">An Evening<br />Together</p>
              <div className="my-6 h-px w-16 bg-gold-light/60" />
              <span className="text-[0.55rem] tracking-[0.2em] uppercase">Save the date</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
