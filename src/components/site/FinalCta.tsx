import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/data/site";
import { ButtonLink } from "@/components/ui/button";
import { Flourish, Ornament } from "./Ornament";

export function FinalCta() {
  return (
    <section id="order" className="scroll-mt-20 px-5 py-16 md:px-8 md:py-24">
      <div className="frame-gold relative mx-auto max-w-5xl overflow-hidden rounded-xl bg-wine-gradient px-6 py-16 text-center text-primary-foreground shadow-float md:px-16 md:py-24">
        <Flourish className="pointer-events-none absolute -top-4 -left-6 w-56 text-gold-light opacity-40 md:w-80" />
        <Flourish className="pointer-events-none absolute -right-6 -bottom-6 w-56 rotate-180 text-gold-light opacity-40 md:w-80" />
        <div className="relative">
          <span className="eyebrow text-gold-light">Ready When You Are</span>
          <h2 className="mx-auto mt-4 max-w-3xl font-serif text-4xl leading-[1.05] font-medium text-balance md:text-6xl">
            Your Celebration Deserves a Beautiful Beginning.
          </h2>
          <Ornament className="mx-auto my-6 text-gold-light" />
          <p className="mx-auto max-w-xl text-base text-primary-foreground/80 md:text-lg">
            Tell us what you're celebrating. We'll turn it into an invitation worth sharing.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href={whatsappLink()} target="_blank" rel="noreferrer" variant="gold" size="lg">
              Start My Invitation
            </ButtonLink>
            <ButtonLink href={whatsappLink()} target="_blank" rel="noreferrer" variant="whatsapp" size="lg">
              <MessageCircle /> Chat on WhatsApp
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
