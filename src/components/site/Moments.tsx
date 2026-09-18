import { moments } from "@/data/site";
import { Ornament } from "./Ornament";

export function Moments() {
  return (
    <section className="overflow-hidden py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-10 flex flex-col items-center text-center md:mb-14">
          <span className="eyebrow mb-4">Made for Every Occasion</span>
          <h2 className="font-serif text-4xl leading-[1.05] font-medium md:text-6xl">
            One Design. <span className="text-gold-gradient italic">One Moment.</span>
            <br />A Memory Forever.
          </h2>
          <Ornament className="mt-5" />
        </div>
      </div>

      <div className="scrollbar-none flex gap-4 overflow-x-auto px-5 pb-4 md:gap-6 md:px-8">
        {moments.map((m, i) => (
          <figure
            key={m.name}
            className="w-40 shrink-0 md:w-52"
            style={{ marginTop: i % 2 ? "1.5rem" : 0 }}
          >
            <img
              src={m.image}
              alt={`${m.name} invitation`}
              width={768}
              height={1024}
              loading="lazy"
              className="aspect-[3/4] w-full rounded-sm object-cover shadow-card ring-1 ring-gold/35"
            />
            <figcaption className="mt-3 text-center font-serif text-lg font-semibold">{m.name}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
