import { Check, Clock } from "lucide-react";
import { formatINR, pricing, whatsappLink } from "@/data/site";
import { ButtonLink } from "@/components/ui/button";
import { Ornament, SectionHeading } from "./Ornament";
import { cn } from "@/lib/utils";

export function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-20 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Step 3 · See Price"
          title="Simple Pricing. No Confusion."
          subtitle="One-time price. No hidden charges. Pay after you approve the preview."
        />
        <div className="grid items-stretch gap-6 md:grid-cols-3 md:gap-5 lg:gap-8">
          {pricing.map((t) => (
            <article
              key={t.name}
              className={cn(
                "frame-gold relative flex flex-col rounded-lg p-7 text-center md:p-8",
                t.popular
                  ? "bg-wine-gradient text-primary-foreground shadow-float md:-my-4 md:py-12"
                  : "bg-card shadow-card",
              )}
            >
              {t.popular && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-gradient px-4 py-1 text-[0.65rem] font-semibold tracking-[0.22em] text-accent-foreground uppercase shadow-gold">
                  Most Chosen
                </span>
              )}
              <span className={cn("eyebrow", t.popular && "text-gold-light")}>{t.name}</span>
              <p className="mt-3 font-serif text-5xl font-semibold md:text-6xl">{formatINR(t.price)}</p>
              <p className={cn("mt-2 text-sm", t.popular ? "text-primary-foreground/75" : "text-muted-foreground")}>
                {t.blurb}
              </p>
              <Ornament className={cn("mx-auto my-5", t.popular && "text-gold-light")} />
              <ul className="flex flex-col gap-2.5 text-left text-sm">
                {t.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5">
                    <Check className={cn("size-4 shrink-0", t.popular ? "text-gold-light" : "text-gold-dark")} />
                    {f}
                  </li>
                ))}
              </ul>
              <p
                className={cn(
                  "mt-5 flex items-center justify-center gap-1.5 text-xs tracking-wide",
                  t.popular ? "text-primary-foreground/75" : "text-muted-foreground",
                )}
              >
                <Clock className="size-3.5" /> {t.delivery}
              </p>
              <div className="mt-6">
                <ButtonLink
                  href={whatsappLink(`Hi! I'd like to order the ${t.name} plan (${formatINR(t.price)}).`)}
                  target="_blank"
                  rel="noreferrer"
                  variant={t.popular ? "gold" : "outline"}
                  className="w-full"
                >
                  Choose {t.name}
                </ButtonLink>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
