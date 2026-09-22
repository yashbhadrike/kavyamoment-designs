import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/")({
  component: AdminHome,
});

function AdminHome() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Link
        to="/admin/occasions"
        className="rounded-md border border-gold/30 bg-card p-6 shadow-card transition-all hover:-translate-y-1"
      >
        <h2 className="font-serif text-2xl font-semibold">Occasions</h2>
        <p className="mt-1 text-sm text-muted-foreground">Name, slug, icon, order, active state.</p>
      </Link>
      <Link
        to="/admin/formats"
        className="rounded-md border border-gold/30 bg-card p-6 shadow-card transition-all hover:-translate-y-1"
      >
        <h2 className="font-serif text-2xl font-semibold">Invitation Formats</h2>
        <p className="mt-1 text-sm text-muted-foreground">Title, price, image, order, active state.</p>
      </Link>
    </div>
  );
}
