"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export function UserNav() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="h-9 w-9 animate-pulse rounded-full bg-white/10" />
    );
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-3">
        {session.user.image ? (
          <img
            src={session.user.image}
            alt={session.user.name ?? "User"}
            className="h-8 w-8 shrink-0 rounded-full border border-white/20"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 bg-primary/20 font-condensed text-xs font-black uppercase text-primary">
            {session.user.name?.[0] ?? "U"}
          </div>
        )}
        <button
          onClick={() => signOut()}
          className="hidden items-center gap-1.5 font-condensed text-xs font-black uppercase tracking-[0.18em] text-white/60 transition hover:text-primary sm:inline-flex"
          title="Sign out"
        >
          <LogOut className="h-3 w-3" />
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => signIn("google")}
      className="border-white/20 bg-white/5 font-condensed text-xs font-black uppercase tracking-[0.12em]"
    >
      <LogIn className="h-3 w-3" />
      Sign In
    </Button>
  );
}
