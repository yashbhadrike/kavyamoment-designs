import { useEffect, useState } from "react";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin · KavyaVerse Digital" },
      { name: "description", content: "Manage occasions and invitation formats for KavyaVerse Digital." },
      { property: "og:title", content: "Admin · KavyaVerse Digital" },
      { property: "og:description", content: "Manage occasions and invitation formats." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminLayout,
});

function AdminLayout() {
  const [ready, setReady] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const refresh = async () => {
    const { data } = await supabase.auth.getSession();
    const uid = data.session?.user.id ?? null;
    setUserId(uid);
    if (uid) {
      const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", uid);
      setIsAdmin((roles ?? []).some((r) => r.role === "admin"));
    } else {
      setIsAdmin(false);
    }
    setReady(true);
  };

  useEffect(() => {
    void refresh();
    const { data: sub } = supabase.auth.onAuthStateChange(() => void refresh());
    return () => sub.subscription.unsubscribe();
  }, []);

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) toast.error(error.message);
  };

  const signUp = async () => {
    setBusy(true);
    const { error } = await supabase.auth.signUp({ email, password });
    setBusy(false);
    if (error) toast.error(error.message);
    else toast.success("Account created. You can sign in now.");
  };

  const claimAdmin = async () => {
    const { data, error } = await supabase.rpc("claim_admin");
    if (error) {
      toast.error(error.message);
      return;
    }
    if (data) {
      toast.success("You are now the admin.");
      void refresh();
    } else {
      toast.error("An admin already exists.");
    }
  };

  if (!ready) return <div className="p-10 text-center text-muted-foreground">Loading…</div>;

  if (!userId) {
    return (
      <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-5">
        <h1 className="font-serif text-3xl font-semibold">Admin sign in</h1>
        <form onSubmit={signIn} className="mt-6 grid gap-4">
          <div className="grid gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" disabled={busy}>Sign in</Button>
          <Button type="button" variant="outline" disabled={busy} onClick={signUp}>
            Create account
          </Button>
        </form>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center gap-4 px-5 text-center">
        <h1 className="font-serif text-3xl font-semibold">No admin access</h1>
        <p className="text-muted-foreground">If you are the first user, claim the admin role.</p>
        <Button onClick={claimAdmin}>Claim admin</Button>
        <Button variant="ghost" onClick={() => supabase.auth.signOut()}>Sign out</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory-deep/40">
      <header className="border-b border-gold/30 bg-card">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-5 py-4">
          <span className="font-serif text-xl font-semibold">KavyaVerse Admin</span>
          <nav className="flex gap-4 text-sm">
            <Link to="/admin/occasions" className="hover:text-wine [&.active]:text-wine">Occasions</Link>
            <Link to="/admin/formats" className="hover:text-wine [&.active]:text-wine">Invitation Formats</Link>
            <Link to="/" className="hover:text-wine">View site</Link>
          </nav>
          <Button size="sm" variant="ghost" className="ml-auto" onClick={() => supabase.auth.signOut()}>
            Sign out
          </Button>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-8">
        <Outlet />
      </main>
    </div>
  );
}
