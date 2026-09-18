import { Check } from "lucide-react";
import { formatINR, packages, whatsappLink } from "@/data/site";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "./Ornament";
import { cn } from "@/lib/utils";

export function Packages() {
  return (
    <section id="packages" className="scroll-mt-20 bg-ivory-deep/60 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Step 2 · Choose"
          title="Choose Your Invitation"
          subtitle="Four simple choices. Pick the one that fits your celebration."
        />
        <div className="grid gap-5 md:grid-cols-2">
          {packages.map((p) => (
            <article
              key={p.name}
              className={cn(
                "frame-gold flex gap-5 rounded-lg bg-card p-4 shadow-card md:gap-7 md:p-6",
                p.highlight && "ring-2 ring-gold/60",
              )}
            >
              <div className="w-28 shrink-0 self-start md:w-36">
                <img
                  src={p.image}
                  alt={`${p.name} example`}
                  width={768}
                  height={1024}
                  loading="lazy"
                  className="aspect-[3/4] w-full rounded-sm object-cover shadow-card ring-1 ring-gold/30"
                />
              </div>
              <div className="flex flex-1 flex-col">
                <span className="eyebrow">{p.name}</span>
                <h3 className="mt-1 font-serif text-2xl font-semibold leading-tight md:text-3xl">{p.tagline}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Starting from{" "}
                  <span className="font-serif text-2xl font-semibold text-wine md:text-3xl">{formatINR(p.price)}</span>
                </p>
                <ul className="mt-3 grid gap-1.5 text-sm">
                  {p.includes.map((i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="size-3.5 shrink-0 text-gold-dark" /> {i}
                    </li>
                  ))}
                </ul>
                <div className="mt-4">
                  <ButtonLink
                    href={whatsappLink(`Hi! I'd like to know more about the ${p.name} package.`)}
                    target="_blank"
                    rel="noreferrer"
                    variant={p.highlight ? "gold" : "outline"}
                    size="sm"
                  >
                    View Options
                  </ButtonLink>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
