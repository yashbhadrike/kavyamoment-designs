import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/kavyaverse-logo.png.asset.json";
import { nav, whatsappLink } from "@/data/site";
import { Button, ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-gold/25 bg-background/85 backdrop-blur-md">
      <div className="mx-auto grid h-18 max-w-7xl grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-2 px-4 md:px-8 lg:flex lg:justify-between">
        <a href="#top" className="flex items-center gap-3" aria-label="KavyaVerse Digital home">
          <img src={logo.url} alt="KavyaVerse Digital" width={1200} height={896} className="h-10 w-auto md:h-14" />
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-[0.78rem] font-medium tracking-[0.2em] text-foreground/80 uppercase transition-colors hover:text-wine"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <ButtonLink href={whatsappLink()} target="_blank" rel="noreferrer" variant="wine" size="sm">
            Start Your Invitation
          </ButtonLink>
        </div>

        <ButtonLink href={whatsappLink()} target="_blank" rel="noreferrer" variant="wine" size="sm" className="px-3 text-[0.62rem] lg:hidden">
          Start
        </ButtonLink>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>

      <div
        className={cn(
          "overflow-hidden border-gold/25 bg-background transition-all duration-300 lg:hidden",
          open ? "max-h-96 border-t" : "max-h-0",
        )}
      >
        <nav className="flex flex-col gap-1 px-5 py-4" aria-label="Mobile">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="py-3 text-sm font-medium tracking-[0.18em] text-foreground uppercase"
            >
              {n.label}
            </a>
          ))}
          <ButtonLink href={whatsappLink()} target="_blank" rel="noreferrer" variant="wine" className="mt-3">
            Start Your Invitation
          </ButtonLink>
        </nav>
      </div>
    </header>
  );
}
