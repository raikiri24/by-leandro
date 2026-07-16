import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main id="main-content" className="flex min-h-screen flex-col items-center justify-center bg-[#090909] px-5 py-16 text-center text-white">
      <p className="font-condensed text-sm font-black uppercase tracking-[0.2em] text-primary">
        404
      </p>
      <h1 className="mt-3 font-display text-5xl leading-none sm:text-6xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-sm leading-6 text-white/60">
        The page you&apos;re looking for doesn&apos;t exist, moved, or the link is
        broken. Try one of these instead.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild>
          <Link href="/">Go home</Link>
        </Button>
        <Button asChild variant="outline" className="border-white/20 bg-white/5">
          <Link href="/tool">Open the tool</Link>
        </Button>
        <Button asChild variant="outline" className="border-white/20 bg-white/5">
          <Link href="/contact">Contact us</Link>
        </Button>
      </div>
    </main>
  );
}
