"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main id="main-content" className="flex min-h-screen flex-col items-center justify-center bg-[#090909] px-5 py-16 text-center text-white">
      <p className="font-condensed text-sm font-black uppercase tracking-[0.2em] text-destructive">
        Something broke
      </p>
      <h1 className="mt-3 font-display text-5xl leading-none sm:text-6xl">
        Unexpected error
      </h1>
      <p className="mt-4 max-w-md text-sm leading-6 text-white/60">
        This page ran into a problem. Try again, or head back to the homepage. If it
        keeps happening, let us know through the contact page.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button onClick={() => reset()}>Try again</Button>
        <Button asChild variant="outline" className="border-white/20 bg-white/5">
          <a href="/">Go home</a>
        </Button>
        <Button asChild variant="outline" className="border-white/20 bg-white/5">
          <a href="/contact">Report this</a>
        </Button>
      </div>
    </main>
  );
}
