import { cn } from "@/lib/utils";

/** Thin gold divider with a diamond and curls, used under headings. */
export function Ornament({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 16"
      className={cn("h-4 w-40 text-gold", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden
    >
      <path d="M0 8h58" />
      <path d="M102 8h58" />
      <path d="M80 2l6 6-6 6-6-6z" fill="currentColor" stroke="none" />
      <path d="M62 8c4-4 8-4 12 0M86 8c4 4 8 4 12 0" />
      <circle cx="60" cy="8" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="100" cy="8" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Large decorative corner flourish inspired by the logo's curls. */
export function Flourish({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 120"
      className={cn("text-gold", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M2 118c40-4 70-30 82-70 6-20 24-30 42-24 16 6 18 28 4 36-10 6-22-2-18-12 3-7 12-6 12 1" />
      <path d="M84 48c22-18 56-16 76 4 12 12 20 26 38 30" />
      <path d="M120 24c8-10 22-14 34-8" />
      <path d="M150 60c6-8 16-10 26-6" />
      <circle cx="152" cy="20" r="2.2" fill="currentColor" stroke="none" className="text-wine" />
      <circle cx="176" cy="54" r="2" fill="currentColor" stroke="none" className="text-wine" />
    </svg>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-10 flex flex-col gap-4 md:mb-14",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="font-serif text-4xl leading-[1.05] font-medium text-balance text-foreground md:text-5xl lg:text-6xl">
        {title}
      </h2>
      <Ornament />
      {subtitle && <p className="max-w-xl text-base text-muted-foreground md:text-lg">{subtitle}</p>}
    </div>
  );
}
