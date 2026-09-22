import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type OccasionRow = {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  image_url: string | null;
  sort_order: number;
  is_active: boolean;
};

export type FormatRow = {
  id: string;
  name: string;
  slug: string;
  starting_price: number | null;
  price_prefix: string | null;
  image_url: string | null;
  sort_order: number;
  is_active: boolean;
};

export const occasionsQuery = queryOptions({
  queryKey: ["cms", "occasions"],
  queryFn: async (): Promise<OccasionRow[]> => {
    const { data, error } = await supabase
      .from("occasions")
      .select("id,name,slug,icon,image_url,sort_order,is_active")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return (data ?? []) as OccasionRow[];
  },
});

export const formatsQuery = queryOptions({
  queryKey: ["cms", "formats"],
  queryFn: async (): Promise<FormatRow[]> => {
    const { data, error } = await supabase
      .from("formats")
      .select("id,name,slug,starting_price,price_prefix,image_url,sort_order,is_active")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return (data ?? []) as FormatRow[];
  },
});

export function formatPrice(value: number | null | undefined, currency = "₹") {
  if (value === null || value === undefined) return "";
  return `${currency}${Number(value).toLocaleString("en-IN")}`;
}
