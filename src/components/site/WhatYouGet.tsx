import {
  Clock,
  FileText,
  Image as ImageIcon,
  MessageCircle,
  PenLine,
  RefreshCcw,
  Sparkles,
  Video,
} from "lucide-react";
import { deliverables } from "@/data/site";
import { SectionHeading } from "./Ornament";

const icons = [Sparkles, ImageIcon, MessageCircle, FileText, Video, PenLine, RefreshCcw, Clock];

export function WhatYouGet() {
  return (
    <section id="what-you-get" className="scroll-mt-20 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Step 4 · Understand"
          title="Everything You Need to Share Your Celebration."
        />
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 md:gap-8">
          {deliverables.map((d, i) => {
            const Icon = icons[i];
            return (
              <div key={d.title} className="flex flex-col items-center text-center">
                <span className="mb-4 grid size-14 place-items-center rounded-full border border-gold/50 bg-card text-gold-dark shadow-card">
                  <Icon className="size-6" strokeWidth={1.5} />
                </span>
                <h3 className="font-serif text-xl font-semibold leading-tight">{d.title}</h3>
                <p className="mt-1.5 max-w-[16rem] text-xs leading-relaxed text-muted-foreground md:text-sm">{d.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
