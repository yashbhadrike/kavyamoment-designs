import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Occasions } from "@/components/site/Occasions";
import { Packages } from "@/components/site/Packages";
import { Pricing } from "@/components/site/Pricing";
import { Gallery } from "@/components/site/Gallery";
import { WhatYouGet } from "@/components/site/WhatYouGet";
import { HowItWorks } from "@/components/site/HowItWorks";
import { Moments } from "@/components/site/Moments";
import { WhyUs } from "@/components/site/WhyUs";
import { FinalCta } from "@/components/site/FinalCta";
import { Footer } from "@/components/site/Footer";
import { OccasionFilterProvider } from "@/components/site/occasion-filter";

const title = "KavyaVerse Digital — Digital Invitations for Every Occasion";
const description =
  "Premium digital invitation cards & video invites for weddings, birthdays, poojas, baby showers and more. WhatsApp-ready, starting ₹499.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <OccasionFilterProvider>
      <Navbar />
      <main>
        <Hero />
        <Occasions />
        <Packages />
        <Pricing />
        <Gallery />
        <WhatYouGet />
        <HowItWorks />
        <Moments />
        <WhyUs />
        <FinalCta />
      </main>
      <Footer />
    </OccasionFilterProvider>
    </>
  );
}
