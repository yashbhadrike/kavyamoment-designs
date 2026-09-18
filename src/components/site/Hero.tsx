import logo from "@/assets/kavyaverse-logo.png.asset.json";
import { images } from "@/data/site";
import { ButtonLink } from "@/components/ui/button";
import { Flourish, Ornament } from "./Ornament";

const cards = [
  { src: images.wedding, alt: "Wedding invitation", className: "left-[4%] top-[8%] w-[38%] md:w-[34%]", tilt: "-7deg", delay: "0s" },
  { src: images.royal, alt: "Royal wedding invitation", className: "left-[31%] top-[0%] w-[42%] md:w-[38%] z-10", tilt: "0deg", delay: "1.2s" },
  { src: images.birthday, alt: "Birthday invitation", className: "right-[4%] top-[14%] w-[38%] md:w-[34%]", tilt: "7deg", delay: "2.4s" },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <Flourish className="pointer-events-none absolute -top-6 -left-10 w-64 opacity-60 md:w-96" />
      <Flourish className="pointer-events-none absolute -right-10 -bottom-10 w-64 rotate-180 opacity-50 md:w-96" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pt-12 pb-16 md:px-8 md:pt-20 md:pb-24 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
        <div className="animate-rise flex flex-col items-center text-center lg:items-start lg:text-left">
          <img
            src={logo.url}
            alt="KavyaVerse Digital — Every Design, Every Occasion."
            width={1200}
            height={896}
            className="mb-8 w-56 md:w-72"
          />
          <span className="eyebrow mb-4">Digital Invitation Studio</span>
          <h1 className="font-serif text-5xl leading-[0.98] font-medium text-balance md:text-6xl lg:text-7xl">
            Beautiful Invitations,
            <br />
            <span className="text-gold-gradient italic">Made for Your Moments.</span>
          </h1>
          <Ornament className="my-6" />
          <p className="max-w-lg text-base text-muted-foreground md:text-lg">
            Digital invitations designed for weddings, birthdays, ceremonies, celebrations and every special
            occasion.
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

        <div className="relative mx-auto aspect-[5/4] w-full max-w-xl">
          <div className="absolute inset-x-[10%] top-[20%] bottom-[0%] rounded-full bg-gold/15 blur-3xl" />
          {cards.map((c, i) => (
            <div
              key={c.alt}
              className={`absolute animate-float ${c.className}`}
              style={{ "--tilt": c.tilt, animationDelay: c.delay } as React.CSSProperties}
            >
              <img
                src={c.src}
                alt={c.alt}
                width={768}
                height={1024}
                loading={i === 1 ? "eager" : "lazy"}
                className="card-shine w-full rounded-sm shadow-float ring-1 ring-gold/40"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
