import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ImageIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/formats")({ component: AdminFormats });

type Row = {
  id: string;
  name: string;
  slug: string;
  starting_price: number | null;
  price_prefix: string | null;
  image_url: string | null;
  sort_order: number;
  is_active: boolean;
};

const TEN_YEARS = 60 * 60 * 24 * 365 * 10;

function AdminFormats() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState<string | null>(null);
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const load = async () => {
    const { data, error } = await supabase
      .from("formats")
      .select("id,name,slug,starting_price,price_prefix,image_url,sort_order,is_active")
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
      .from("formats")
      .update({
        name: row.name,
        starting_price: row.starting_price,
        price_prefix: row.price_prefix,
        image_url: row.image_url,
        sort_order: row.sort_order,
        is_active: row.is_active,
      })
      .eq("id", row.id);
    if (error) { toast.error(error.message); return; }
    toast.success("Saved");
    void load();
  };

  const upload = async (row: Row, file: File) => {
    setUploading(row.id);
    const path = `formats/${row.id}-${Date.now()}-${file.name.replace(/[^\w.-]/g, "_")}`;
    const { error } = await supabase.storage.from("media").upload(path, file, { upsert: true });
    if (error) {
      setUploading(null);
      toast.error(error.message);
      return;
    }
    const { data: signed } = await supabase.storage.from("media").createSignedUrl(path, TEN_YEARS);
    const url = signed?.signedUrl ?? null;
    await supabase.from("media_library").insert({
      url: url ?? path,
      storage_path: path,
      filename: file.name,
      media_type: file.type.startsWith("video") ? "video" : "image",
      mime_type: file.type,
      size_bytes: file.size,
    });
    await supabase.from("formats").update({ image_url: url }).eq("id", row.id);
    setUploading(null);
    toast.success("Image uploaded");
    void load();
  };

  const removeImage = async (row: Row) => {
    const { error } = await supabase.from("formats").update({ image_url: null }).eq("id", row.id);
    if (error) { toast.error(error.message); return; }
    void load();
  };

  const addRow = async () => {
    const { error } = await supabase.from("formats").insert({
      name: "New format",
      slug: `new-format-${Date.now()}`,
      price_prefix: "Starting from",
      sort_order: rows.length + 1,
      is_active: false,
    });
    if (error) { toast.error(error.message); return; }
    void load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this format?")) { return; }
    const { error } = await supabase.from("formats").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    void load();
  };

  if (loading) return <p className="text-muted-foreground">Loading…</p>;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-serif text-3xl font-semibold">Invitation Formats</h1>
        <Button size="sm" onClick={addRow}>Add format</Button>
      </div>
      <div className="grid gap-4">
        {rows.map((row) => (
          <div key={row.id} className="rounded-md border border-gold/30 bg-card p-4 shadow-card">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="w-32 shrink-0">
                <div className="flex aspect-[3/4] items-center justify-center overflow-hidden rounded-md border border-gold/30 bg-ivory-deep">
                  {row.image_url ? (
                    <img src={row.image_url} alt={row.name} className="size-full object-cover" />
                  ) : (
                    <ImageIcon className="size-6 text-gold/50" strokeWidth={1.2} />
                  )}
                </div>
                <input
                  ref={(el) => {
                    fileRefs.current[row.id] = el;
                  }}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) void upload(row, f);
                    e.target.value = "";
                  }}
                />
                <div className="mt-2 flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={uploading === row.id}
                    onClick={() => fileRefs.current[row.id]?.click()}
                  >
                    {uploading === row.id ? "…" : row.image_url ? "Replace" : "Upload"}
                  </Button>
                  {row.image_url && (
                    <Button size="sm" variant="ghost" onClick={() => removeImage(row)}>Remove</Button>
                  )}
                </div>
              </div>
              <div className="grid flex-1 gap-3 md:grid-cols-2">
                <label className="grid gap-1 text-xs">
                  Title
                  <Input value={row.name} onChange={(e) => patch(row.id, { name: e.target.value })} />
                </label>
                <label className="grid gap-1 text-xs">
                  Price
                  <Input
                    type="number"
                    value={row.starting_price ?? ""}
                    onChange={(e) =>
                      patch(row.id, { starting_price: e.target.value === "" ? null : Number(e.target.value) })
                    }
                  />
                </label>
                <label className="grid gap-1 text-xs">
                  Price prefix (optional)
                  <Input
                    value={row.price_prefix ?? ""}
                    placeholder="Starting from"
                    onChange={(e) => patch(row.id, { price_prefix: e.target.value })}
                  />
                </label>
                <label className="grid gap-1 text-xs">
                  Display order
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
                  <span className="text-xs text-muted-foreground">Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" onClick={() => save(row)}>Save</Button>
                  <Button size="sm" variant="ghost" onClick={() => remove(row.id)}>Delete</Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
