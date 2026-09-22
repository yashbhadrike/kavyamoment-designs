import { useQuery } from "@tanstack/react-query";
import { ImageIcon } from "lucide-react";
import { formatPrice, formatsQuery } from "@/lib/cms";
import { SectionHeading } from "./Ornament";

export function Packages() {
  const { data: formats = [] } = useQuery(formatsQuery);

  return (
    <section id="packages" className="scroll-mt-20 bg-ivory-deep/60 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Step 2 · Choose"
          title="Choose Your Invitation"
          subtitle="Pick the format that fits your celebration."
        />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {formats.map((f) => (
            <article
              key={f.id}
              className="group flex flex-col overflow-hidden rounded-md border border-gold/30 bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-float"
            >
              <div className="aspect-[3/4] overflow-hidden bg-ivory-deep">
                {f.image_url ? (
                  <img
                    src={f.image_url}
                    alt={f.name}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center border-b border-gold/20">
                    <ImageIcon className="size-7 text-gold/50" strokeWidth={1.2} />
                  </div>
                )}
              </div>
              <div className="px-3.5 py-3 md:px-4 md:py-3.5">
                <h3 className="font-serif text-lg leading-tight font-semibold md:text-xl">{f.name}</h3>
                {f.starting_price !== null && (
                  <p className="mt-1 font-sans text-sm text-wine">
                    {f.price_prefix ? `${f.price_prefix} ` : ""}
                    <span className="font-semibold">{formatPrice(f.starting_price)}</span>
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
