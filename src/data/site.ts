import wedding from "@/assets/inv-wedding.jpg";
import engagement from "@/assets/inv-engagement.jpg";
import birthday from "@/assets/inv-birthday.jpg";
import babyshower from "@/assets/inv-babyshower.jpg";
import naming from "@/assets/inv-naming.jpg";
import pooja from "@/assets/inv-pooja.jpg";
import housewarming from "@/assets/inv-housewarming.jpg";
import anniversary from "@/assets/inv-anniversary.jpg";
import savethedate from "@/assets/inv-savethedate.jpg";
import other from "@/assets/inv-other.jpg";
import royal from "@/assets/inv-royal.jpg";
import minimal from "@/assets/inv-minimal.jpg";
import floral from "@/assets/inv-floral.jpg";
import gujarati from "@/assets/inv-gujarati.jpg";
import marathi from "@/assets/inv-marathi.jpg";
import heritage from "@/assets/inv-heritage.jpg";

export const images = {
  wedding,
  engagement,
  birthday,
  babyshower,
  naming,
  pooja,
  housewarming,
  anniversary,
  savethedate,
  other,
  royal,
  minimal,
  floral,
  gujarati,
  marathi,
  heritage,
};

// Replace with the real business number (country code, no + or spaces).
export const WHATSAPP_NUMBER = "919999999999";
export const whatsappLink = (text = "Hi KavyaVerse Digital! I'd like to order an invitation.") =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

export const nav = [
  { label: "Home", href: "#top" },
  { label: "Invitations", href: "#gallery" },
  { label: "Occasions", href: "#occasions" },
  { label: "Pricing", href: "#pricing" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Contact", href: "#order" },
];

export const occasions = [
  { emoji: "💍", name: "Wedding", desc: "Grand, traditional or modern shaadi cards.", image: wedding },
  { emoji: "❤️", name: "Engagement", desc: "Ring ceremony & roka invitations.", image: engagement },
  { emoji: "🎂", name: "Birthday", desc: "First birthdays to milestone parties.", image: birthday },
  { emoji: "👶", name: "Baby Shower", desc: "Godh bharai & seemantham cards.", image: babyshower },
  { emoji: "🌸", name: "Naming Ceremony", desc: "Namkaran & cradle ceremony invites.", image: naming },
  { emoji: "🪔", name: "Pooja & Religious", desc: "Satyanarayan, Ganesh, havan & more.", image: pooja },
  { emoji: "🏠", name: "Housewarming", desc: "Griha pravesh & vastu shanti.", image: housewarming },
  { emoji: "🎉", name: "Anniversary", desc: "Silver, golden & every year between.", image: anniversary },
  { emoji: "📅", name: "Save the Date", desc: "A beautiful first announcement.", image: savethedate },
  { emoji: "✨", name: "Other Occasions", desc: "Retirement, festivals, corporate & more.", image: other },
];

export const packages = [
  {
    name: "Static Invitation",
    tagline: "Elegant digital invitation",
    price: 499,
    includes: ["1 HD image card", "Your names & details", "WhatsApp-ready size", "1 revision"],
    image: minimal,
  },
  {
    name: "Video Invitation",
    tagline: "Animated invitation for WhatsApp",
    price: 1499,
    includes: ["20–40 sec HD video", "Music & animation", "Names, dates & venue", "2 revisions"],
    image: royal,
    highlight: true,
  },
  {
    name: "Premium Invitation",
    tagline: "Custom-designed invitation",
    price: 1999,
    includes: ["Designed from scratch", "Multiple pages / events", "HD image + PDF", "Unlimited tweaks"],
    image: heritage,
  },
];

export const pricing = [
  {
    name: "Basic",
    price: 499,
    blurb: "Perfect for simple celebrations",
    features: ["Custom details", "HD digital card", "WhatsApp-ready", "1 revision"],
    delivery: "Delivered in 24 hours",
  },
  {
    name: "Popular",
    price: 999,
    blurb: "For a complete invitation experience",
    features: ["Custom design", "Multiple pages", "HD export", "WhatsApp-ready", "PDF version", "2 revisions"],
    delivery: "Delivered in 1–2 days",
    popular: true,
  },
  {
    name: "Premium",
    price: 1999,
    blurb: "For special celebrations",
    features: [
      "Premium custom design",
      "Multiple pages",
      "Animated elements",
      "HD video",
      "PDF version",
      "Multiple revisions",
    ],
    delivery: "Delivered in 2–3 days",
  },
];

export const galleryFilters = [
  "All",
  "Wedding",
  "Birthday",
  "Baby Shower",
  "Engagement",
  "Traditional",
  "Minimal",
  "Floral",
  "Royal",
  "Modern",
  "Gujarati",
  "Marathi",
  "Indian Heritage",
] as const;

export type GalleryFilter = (typeof galleryFilters)[number];

export const designs: {
  name: string;
  occasion: string;
  price: number;
  image: string;
  tags: GalleryFilter[];
}[] = [
  { name: "Mandala Rose", occasion: "Wedding", price: 999, image: wedding, tags: ["Wedding", "Traditional", "Floral"] },
  { name: "Maharani", occasion: "Wedding", price: 1499, image: royal, tags: ["Wedding", "Royal", "Traditional"] },
  { name: "Ganesh Bandhani", occasion: "Wedding", price: 1199, image: gujarati, tags: ["Wedding", "Gujarati", "Traditional"] },
  { name: "Paithani Morpankh", occasion: "Wedding", price: 1199, image: marathi, tags: ["Wedding", "Marathi", "Traditional"] },
  { name: "Mughal Jharokha", occasion: "Wedding", price: 1499, image: heritage, tags: ["Wedding", "Indian Heritage", "Royal"] },
  { name: "Olive Line", occasion: "Any Occasion", price: 499, image: minimal, tags: ["Minimal", "Modern", "Engagement"] },
  { name: "Marigold Bloom", occasion: "Wedding", price: 899, image: floral, tags: ["Floral", "Wedding", "Traditional"] },
  { name: "Golden Bands", occasion: "Engagement", price: 699, image: engagement, tags: ["Engagement", "Floral", "Modern"] },
  { name: "Confetti Gold", occasion: "Birthday", price: 599, image: birthday, tags: ["Birthday", "Modern"] },
  { name: "Palna Garland", occasion: "Baby Shower", price: 699, image: babyshower, tags: ["Baby Shower", "Floral", "Traditional"] },
  { name: "Kamal Namkaran", occasion: "Naming Ceremony", price: 699, image: naming, tags: ["Baby Shower", "Traditional", "Floral"] },
  { name: "Kalash Aarti", occasion: "Pooja", price: 599, image: pooja, tags: ["Traditional", "Indian Heritage"] },
];

export const deliverables = [
  { title: "Custom Design", desc: "Styled around your celebration." },
  { title: "HD Quality", desc: "Crisp on every screen." },
  { title: "WhatsApp Ready", desc: "Perfect size for sharing with family & friends." },
  { title: "PDF Version", desc: "Ready for email or print." },
  { title: "Personalised Details", desc: "Names, dates, venue and RSVP." },
  { title: "Revision Support", desc: "Thoughtful changes before delivery." },
  { title: "Fast Delivery", desc: "Ready within 24–48 hours." },
  { title: "Video Option", desc: "Add motion and music." },
];

export const steps = [
  { n: "01", title: "Choose", desc: "Choose your design." },
  { n: "02", title: "Share", desc: "Send your event details." },
  { n: "03", title: "Design", desc: "We personalise your invitation." },
  { n: "04", title: "Deliver", desc: "Receive your final digital invitation." },
];

export const moments = [
  { name: "Wedding", image: wedding },
  { name: "Engagement", image: engagement },
  { name: "Birthday", image: birthday },
  { name: "Baby Shower", image: babyshower },
  { name: "Pooja", image: pooja },
  { name: "Naming Ceremony", image: naming },
  { name: "Anniversary", image: anniversary },
  { name: "Housewarming", image: housewarming },
  { name: "Corporate Events", image: minimal },
  { name: "Festivals", image: other },
];

export const whyUs = [
  { title: "Personalised", desc: "Your details become part of the design." },
  { title: "Elegant", desc: "Designed with attention to typography and detail." },
  { title: "Easy to Share", desc: "Made for WhatsApp and digital sharing." },
  { title: "Made for You", desc: "Every celebration gets its own visual personality." },
];

export const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;
