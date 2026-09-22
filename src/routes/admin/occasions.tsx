import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { getOccasionIcon, occasionIconNames } from "@/lib/occasion-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/occasions")({ component: AdminOccasions });

type Row = {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  image_url: string | null;
  sort_order: number;
  is_active: boolean;
};

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function AdminOccasions() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const { data, error } = await supabase
      .from("occasions")
      .select("id,name,slug,icon,image_url,sort_order,is_active")
      .order("sort_order", { ascending: true });
    if (error) toast.error(error.message);
    setRows((data ?? []) as Row[]);
    setLoading(false);
  };

  useEffect(() => {
    void load();
  }, []);

  const patch = (id: string, values: Partial<Row>) =>
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...values } : r)));

  const save = async (row: Row) => {
    const { error } = await supabase
      .from("occasions")
      .update({
        name: row.name,
        slug: row.slug || slugify(row.name),
        icon: row.icon,
        image_url: row.image_url,
        sort_order: row.sort_order,
        is_active: row.is_active,
      })
      .eq("id", row.id);
    if (error) { toast.error(error.message); return; }
    toast.success("Saved");
    void load();
  };

  const addRow = async () => {
    const { error } = await supabase.from("occasions").insert({
      name: "New occasion",
      slug: `new-occasion-${Date.now()}`,
      icon: "Star",
      sort_order: rows.length + 1,
      is_active: false,
    });
    if (error) { toast.error(error.message); return; }
    void load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this occasion?")) { return; }
    const { error } = await supabase.from("occasions").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    void load();
  };

  if (loading) return <p className="text-muted-foreground">Loading…</p>;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-serif text-3xl font-semibold">Occasions</h1>
        <Button size="sm" onClick={addRow}>Add occasion</Button>
      </div>
      <div className="grid gap-4">
        {rows.map((row) => {
          const Icon = getOccasionIcon(row.icon);
          return (
            <div key={row.id} className="rounded-md border border-gold/30 bg-card p-4 shadow-card">
              <div className="grid gap-3 md:grid-cols-[auto_1fr_1fr_10rem_6rem_auto] md:items-end">
                <div className="flex size-11 items-center justify-center rounded-md border border-gold/40">
                  <Icon className="size-5 text-gold-dark" strokeWidth={1.4} />
                </div>
                <label className="grid gap-1 text-xs">
                  Name
                  <Input value={row.name} onChange={(e) => patch(row.id, { name: e.target.value })} />
                </label>
                <label className="grid gap-1 text-xs">
                  Slug
                  <Input value={row.slug} onChange={(e) => patch(row.id, { slug: e.target.value })} />
                </label>
                <label className="grid gap-1 text-xs">
                  Icon
                  <select
                    value={row.icon ?? "Star"}
                    onChange={(e) => patch(row.id, { icon: e.target.value })}
                    className="h-10 rounded-md border border-gold/40 bg-background px-2 text-sm"
                  >
                    {occasionIconNames.map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-1 text-xs">
                  Order
                  <Input
                    type="number"
                    value={row.sort_order}
                    onChange={(e) => patch(row.id, { sort_order: Number(e.target.value) })}
                  />
                </label>
                <div className="flex items-center gap-3">
                  <Switch
                    checked={row.is_active}
                    onCheckedChange={(v) => patch(row.id, { is_active: v })}
                    aria-label="Active"
                  />
                  <Button size="sm" onClick={() => save(row)}>Save</Button>
                  <Button size="sm" variant="ghost" onClick={() => remove(row.id)}>Delete</Button>
                </div>
              </div>
              <label className="mt-3 grid gap-1 text-xs md:max-w-md">
                Image URL (optional)
                <Input
                  value={row.image_url ?? ""}
                  onChange={(e) => patch(row.id, { image_url: e.target.value })}
                />
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
