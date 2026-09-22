import {
  Baby,
  Cake,
  CalendarHeart,
  Crown,
  Flame,
  Flower2,
  Gem,
  Gift,
  Heart,
  HeartHandshake,
  House,
  PartyPopper,
  Sparkles,
  Star,
  Sun,
  Users,
  type LucideIcon,
} from "lucide-react";

/** Centralised Lucide icon set available to occasions (admin + frontend). */
export const occasionIcons: Record<string, LucideIcon> = {
  HeartHandshake,
  Heart,
  Cake,
  Baby,
  Sparkles,
  Flame,
  House,
  Gem,
  PartyPopper,
  Star,
  Flower2,
  Gift,
  Crown,
  CalendarHeart,
  Sun,
  Users,
};

export const occasionIconNames = Object.keys(occasionIcons);

export function getOccasionIcon(name?: string | null): LucideIcon {
  return (name && occasionIcons[name]) || Star;
}
