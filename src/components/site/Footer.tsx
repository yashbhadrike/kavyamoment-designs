import { MessageCircle } from "lucide-react";
import logo from "@/assets/kavyaverse-logo.png.asset.json";
import { nav, whatsappLink } from "@/data/site";
import { ButtonLink } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="border-t border-gold/30 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-5 text-center md:flex-row md:justify-between md:text-left md:px-8">
        <div className="flex flex-col items-center gap-3 md:items-start">
          <img src={logo.url} alt="KavyaVerse Digital" width={1200} height={896} className="h-14 w-auto" />
          <p className="font-serif text-lg text-brown italic">Every Design, Every Occasion.</p>
        </div>
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2" aria-label="Footer">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="text-xs tracking-[0.18em] text-foreground/70 uppercase hover:text-wine">
              {n.label}
            </a>
          ))}
        </nav>
        <ButtonLink href={whatsappLink()} target="_blank" rel="noreferrer" variant="outline" size="sm">
          <MessageCircle /> WhatsApp Us
        </ButtonLink>
      </div>
      <p className="mt-10 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} KavyaVerse Digital. All designs are personalised for you.
      </p>

      {/* Floating WhatsApp button for mobile-first ordering */}
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed right-4 bottom-4 z-50 grid size-14 place-items-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-float transition-transform hover:scale-105"
      >
        <MessageCircle className="size-7" />
      </a>
    </footer>
  );
}
