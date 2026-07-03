"use client";

import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { toJpeg } from "html-to-image";
import { ArrowLeft, ChevronDown, Disc3, Download, ImagePlus, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { extractPalette } from "@/lib/colorExtraction";
import {
  BeybladeBuild,
  BuildType,
  CX_ARMOR,
  CX_BITS,
  CX_LOCK_CHIPS,
  CX_MAIN_BLADES,
  CX_RATCHETS,
  DECK_SIZES,
  DeckSize,
  PartOption,
  STANDARD_BITS,
  STANDARD_BLADES,
  STANDARD_RATCHETS,
  availableOptions,
  collectUsedPartIds,
  createCxBuild,
  createStandardBuild,
  findPart,
  withBuildCount,
} from "@/lib/beybladeParts";

function PartSelect({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: PartOption[];
  value: string;
  onChange: (id: string) => void;
}) {
  const selected = findPart(options, value);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const filtered = options.filter((option) =>
    option.name.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <div className="flex items-center gap-3">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-md border border-white/10 bg-white/[0.04]">
        {selected?.image ? (
          <img
            src={selected.image}
            alt={selected.name}
            className="h-full w-full object-contain"
            draggable={false}
          />
        ) : (
          <Disc3 className="h-5 w-5 text-white/30" />
        )}
      </div>
      <div ref={containerRef} className="relative flex-1">
        <label className="block font-condensed text-[11px] font-black uppercase tracking-[0.16em] text-white/50">
          {label}
        </label>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="mt-1 flex w-full items-center justify-between gap-2 rounded-md border border-white/10 bg-[#0d0d0d] px-2 py-2 text-left text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="truncate">{selected?.name ?? "Select..."}</span>
          <ChevronDown className="h-4 w-4 shrink-0 text-white/40" />
        </button>

        {open && (
          <div className="absolute z-50 mt-1 w-full overflow-hidden rounded-md border border-white/10 bg-[#0d0d0d] shadow-xl">
            <div className="flex items-center gap-2 border-b border-white/10 px-2 py-2">
              <Search className="h-4 w-4 shrink-0 text-white/40" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Search ${label.toLowerCase()}...`}
                className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus-visible:outline-none"
              />
            </div>
            <div className="max-h-64 overflow-y-auto">
              {filtered.length === 0 && (
                <div className="px-3 py-2 text-sm text-white/40">No matches</div>
              )}
              {filtered.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => {
                    onChange(option.id);
                    setOpen(false);
                    setQuery("");
                  }}
                  className={cn(
                    "flex w-full items-center gap-2 px-2 py-2 text-left text-sm transition hover:bg-white/10",
                    option.id === value ? "bg-primary/10 text-primary" : "text-white",
                  )}
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded border border-white/10 bg-white/[0.04]">
                    {option.image ? (
                      <img
                        src={option.image}
                        alt={option.name}
                        className="h-full w-full object-contain"
                        draggable={false}
                      />
                    ) : (
                      <Disc3 className="h-4 w-4 text-white/30" />
                    )}
                  </div>
                  <span className="truncate">{option.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function BuildEditor({
  index,
  build,
  builds,
  onChange,
}: {
  index: number;
  build: BeybladeBuild;
  builds: BeybladeBuild[];
  onChange: (build: BeybladeBuild) => void;
}) {
  const used = collectUsedPartIds(builds, index);

  function setType(type: BuildType) {
    onChange(
      type === "standard"
        ? createStandardBuild({ blade: used.blade, ratchet: used.ratchet, bit: used.bit })
        : createCxBuild({
            lockChip: used.lockChip,
            mainBlade: used.mainBlade,
            armor: used.armor,
            ratchet: used.ratchet,
            bit: used.bit,
          }),
    );
  }

  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h3 className="font-condensed text-lg font-black uppercase tracking-[0.12em] text-white">
          Beyblade {index + 1}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => setType("standard")}
            className={cn(
              "rounded-md border px-3 py-1.5 font-condensed text-xs font-black uppercase tracking-[0.1em] transition",
              build.type === "standard"
                ? "border-primary bg-primary/10 text-primary"
                : "border-white/10 bg-white/[0.04] text-white/60",
            )}
          >
            UX & BX
          </button>
          <button
            onClick={() => setType("cx")}
            className={cn(
              "rounded-md border px-3 py-1.5 font-condensed text-xs font-black uppercase tracking-[0.1em] transition",
              build.type === "cx"
                ? "border-primary bg-primary/10 text-primary"
                : "border-white/10 bg-white/[0.04] text-white/60",
            )}
          >
            CX
          </button>
        </div>
      </div>

      {build.type === "standard" ? (
        <div className="grid gap-3">
          <PartSelect
            label="Blade"
            options={availableOptions(STANDARD_BLADES, used.blade, build.bladeId)}
            value={build.bladeId}
            onChange={(id) => onChange({ ...build, bladeId: id })}
          />
          {findPart(STANDARD_BLADES, build.bladeId)?.integratedRatchet ? (
            <p className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 font-condensed text-[11px] font-black uppercase tracking-[0.16em] text-white/50">
              Ratchet integrated into blade
            </p>
          ) : (
            <PartSelect
              label="Ratchet"
              options={availableOptions(STANDARD_RATCHETS, used.ratchet, build.ratchetId)}
              value={build.ratchetId}
              onChange={(id) => onChange({ ...build, ratchetId: id })}
            />
          )}
          <PartSelect
            label="Bit"
            options={availableOptions(STANDARD_BITS, used.bit, build.bitId)}
            value={build.bitId}
            onChange={(id) => onChange({ ...build, bitId: id })}
          />
        </div>
      ) : (
        <div className="grid gap-3">
          <PartSelect
            label="Lock Chip"
            options={availableOptions(CX_LOCK_CHIPS, used.lockChip, build.lockChipId)}
            value={build.lockChipId}
            onChange={(id) => onChange({ ...build, lockChipId: id })}
          />
          <PartSelect
            label="Main Blade"
            options={availableOptions(CX_MAIN_BLADES, used.mainBlade, build.mainBladeId)}
            value={build.mainBladeId}
            onChange={(id) => onChange({ ...build, mainBladeId: id })}
          />
          <PartSelect
            label="Assist / Over / Metal Blade"
            options={availableOptions(CX_ARMOR, used.armor, build.armorId)}
            value={build.armorId}
            onChange={(id) => onChange({ ...build, armorId: id })}
          />
          <PartSelect
            label="Ratchet"
            options={availableOptions(CX_RATCHETS, used.ratchet, build.ratchetId)}
            value={build.ratchetId}
            onChange={(id) => onChange({ ...build, ratchetId: id })}
          />
          <PartSelect
            label="Bit"
            options={availableOptions(CX_BITS, used.bit, build.bitId)}
            value={build.bitId}
            onChange={(id) => onChange({ ...build, bitId: id })}
          />
        </div>
      )}
    </div>
  );
}

function PartTile({ part }: { part?: PartOption }) {
  if (!part || !part.image) return null;
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-md border border-white/15 bg-white/10 backdrop-blur-md sm:h-24 sm:w-24">
        <img
          src={part.image}
          alt={part.name}
          className="h-full w-full object-contain"
          draggable={false}
          crossOrigin="anonymous"
        />
      </div>
      <span className="max-w-[6rem] text-center font-condensed text-[11px] font-bold uppercase leading-tight tracking-[0.06em] text-white drop-shadow">
        {part.name}
      </span>
    </div>
  );
}

function BuildPreview({ index, build }: { index: number; build: BeybladeBuild }) {
  const parts: PartOption[] =
    build.type === "standard"
      ? (() => {
          const blade = findPart(STANDARD_BLADES, build.bladeId);
          return [
            blade,
            blade?.integratedRatchet ? undefined : findPart(STANDARD_RATCHETS, build.ratchetId),
            findPart(STANDARD_BITS, build.bitId),
          ];
        })().filter((p): p is PartOption => !!p)
      : [
          findPart(CX_LOCK_CHIPS, build.lockChipId),
          findPart(CX_MAIN_BLADES, build.mainBladeId),
          findPart(CX_ARMOR, build.armorId),
          findPart(CX_RATCHETS, build.ratchetId),
          findPart(CX_BITS, build.bitId),
        ].filter((p): p is PartOption => !!p && !!p.image);

  return (
    <div className="rounded-lg border border-white/15 bg-white/10 p-4 shadow-lg backdrop-blur-md">
      <div className="mb-3 flex items-center justify-between">
        <span className="font-condensed text-sm font-black uppercase tracking-[0.16em] text-white drop-shadow">
          Beyblade {index + 1}
        </span>
        <span className="rounded-full border border-primary/30 bg-primary/15 px-2.5 py-1 font-condensed text-[10px] font-black uppercase tracking-[0.16em] text-primary backdrop-blur-md">
          {build.type === "standard" ? "UX & BX" : "CX"}
        </span>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        {parts.map((part) => (
          <PartTile key={part.id} part={part} />
        ))}
      </div>
    </div>
  );
}

export default function DeckBuilderPage() {
  const [deckSize, setDeckSize] = useState<DeckSize>("3G");
  const [deckName, setDeckName] = useState("");
  const [builds, setBuilds] = useState<BeybladeBuild[]>(() => withBuildCount([], 3));
  const [exporting, setExporting] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [logoColors, setLogoColors] = useState<string[]>([]);
  const cardRef = useRef<HTMLDivElement>(null);

  function updateBuild(i: number, build: BeybladeBuild) {
    setBuilds((prev) => prev.map((b, idx) => (idx === i ? build : b)));
  }

  function handleDeckSizeChange(size: DeckSize) {
    setDeckSize(size);
    setBuilds((prev) => withBuildCount(prev, parseInt(size, 10)));
  }

  function handleLogoUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      const url = String(reader.result || "");
      setLogoUrl(url);
      setLogoColors(await extractPalette(url));
    };
    reader.readAsDataURL(file);
    event.currentTarget.value = "";
  }

  function clearLogo() {
    setLogoUrl(null);
    setLogoColors([]);
  }

  const cardBackground = useMemo(() => {
    if (logoColors.length === 0) return undefined;
    if (logoColors.length === 1) {
      return `linear-gradient(135deg, rgba(${logoColors[0]}, 0.45) 0%, #070707 80%)`;
    }
    return `linear-gradient(135deg, rgba(${logoColors[0]}, 0.5) 0%, rgba(${logoColors[1]}, 0.35) 55%, #070707 100%)`;
  }, [logoColors]);

  async function downloadDeck() {
    if (!cardRef.current) return;
    setExporting(true);
    try {
      const dataUrl = await toJpeg(cardRef.current, {
        pixelRatio: 2,
        cacheBust: true,
        backgroundColor: "#090909",
        quality: 0.95,
      });
      const a = document.createElement("a");
      const name = deckName || `${deckSize}_deck`;
      a.download = name.replace(/\W+/g, "_").toLowerCase() + ".jpg";
      a.href = dataUrl;
      a.click();
    } finally {
      setExporting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#090909] text-foreground">
      <nav className="sticky top-0 z-40 border-b border-white/10 bg-[#090909]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-10">
          <a href="/" className="flex items-center gap-3">
            <img src="/icon.png" alt="Leandro's Tournament Card Generator" className="h-10 w-10" draggable={false} />
            <span className="font-condensed text-sm font-black uppercase tracking-[0.18em] text-white">
              Leandro's Tool
            </span>
          </a>
          <a
            href="/"
            className="inline-flex items-center gap-1 px-3 py-2 font-condensed text-xs font-black uppercase tracking-[0.18em] text-white/60 transition hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Home
          </a>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
        <div className="mb-8">
          <h1 className="font-display text-4xl leading-none text-white sm:text-5xl">
            Beyblade Deck Builder
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/60">
            Build your own 3G/4G/5G/6G deck. Pick a build type for each Beyblade —
            UX & BX use Blade + Ratchet + Bit, while CX uses Lock Chip + Main Blade +
            Assist/Over/Metal Blade + Ratchet + Bit.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
          {/* Controls */}
          <div className="grid gap-6">
            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block font-condensed text-[11px] font-black uppercase tracking-[0.16em] text-white/50">
                    Deck Size
                  </label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {DECK_SIZES.map((gen) => (
                      <button
                        key={gen}
                        onClick={() => handleDeckSizeChange(gen)}
                        className={cn(
                          "rounded-md border px-4 py-2 font-condensed text-sm font-black uppercase tracking-[0.1em] transition",
                          deckSize === gen
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-white/10 bg-white/[0.04] text-white/60",
                        )}
                      >
                        {gen}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block font-condensed text-[11px] font-black uppercase tracking-[0.16em] text-white/50">
                    Deck Name (optional)
                  </label>
                  <Input
                    value={deckName}
                    onChange={(e) => setDeckName(e.target.value)}
                    placeholder="My Deck"
                    className="mt-2 bg-[#0d0d0d]"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block font-condensed text-[11px] font-black uppercase tracking-[0.16em] text-white/50">
                  Hobby Shop Logo (background)
                </label>
                <div className="mt-2 flex items-center gap-3">
                  <label className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-md border border-white/10 bg-[#0d0d0d] px-3 font-condensed text-xs font-black uppercase tracking-[0.12em] text-white/70 transition hover:border-primary/40 hover:text-primary">
                    <ImagePlus className="h-4 w-4" />
                    {logoUrl ? "Change Logo" : "Upload Logo"}
                    <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                  </label>
                  {logoUrl && (
                    <>
                      <img
                        src={logoUrl}
                        alt="Hobby shop logo"
                        className="h-10 w-10 rounded-md border border-white/10 bg-white/[0.04] object-contain"
                        draggable={false}
                      />
                      <Button type="button" variant="outline" size="icon" aria-label="Remove logo" onClick={clearLogo}>
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
                <p className="mt-2 text-xs leading-5 text-white/50">
                  Upload your hobby shop&apos;s logo to use it as a watermark — the deck
                  background gradient will adopt its colors automatically.
                </p>
              </div>
            </div>

            {builds.map((build, i) => (
              <BuildEditor
                key={i}
                index={i}
                build={build}
                builds={builds}
                onChange={(b) => updateBuild(i, b)}
              />
            ))}
          </div>

          {/* Preview */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div
              ref={cardRef}
              className={cn("relative overflow-hidden rounded-lg border border-white/10 p-5", !cardBackground && "bg-[#070707]")}
              style={cardBackground ? { background: cardBackground } : undefined}
            >
              {logoUrl && (
                <img
                  src={logoUrl}
                  alt=""
                  className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-35"
                  draggable={false}
                  crossOrigin="anonymous"
                />
              )}
              <div className="relative">
                <div className="mb-4 flex flex-col items-center gap-3 rounded-lg border border-white/15 bg-white/10 p-4 text-center shadow-lg backdrop-blur-md">
                  {logoUrl && (
                    <img
                      src={logoUrl}
                      alt="Hobby shop logo"
                      className="h-12 w-12 rounded-md border border-white/20 bg-white/10 object-contain p-1"
                      draggable={false}
                      crossOrigin="anonymous"
                    />
                  )}
                  <div>
                    <div className="font-condensed text-xs font-black uppercase tracking-[0.24em] text-primary">
                      {deckSize} Deck
                    </div>
                    <div className="mt-1 font-display text-3xl leading-none text-white drop-shadow">
                      {deckName || "My Beyblade Deck"}
                    </div>
                  </div>
                </div>
                <div className="grid gap-3">
                  {builds.map((build, i) => (
                    <BuildPreview key={i} index={i} build={build} />
                  ))}
                </div>
              </div>
            </div>

            <Button
              onClick={downloadDeck}
              disabled={exporting}
              className="mt-4 h-12 w-full font-condensed text-base font-black uppercase"
            >
              <Download className="h-4 w-4" />
              {exporting ? "Exporting..." : "Download Deck"}
            </Button>
          </div>
        </div>
      </div>

      <section className="border-t border-white/10 bg-white/[0.025]">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8">
          <p className="font-condensed text-xs font-black uppercase tracking-[0.18em] text-primary">
            Deck builder guide
          </p>
          <h2 className="mt-3 font-display text-4xl leading-none text-white">
            How to build a Beyblade X deck
          </h2>
          <div className="mt-8 grid gap-8 text-sm leading-7 text-white/65 md:grid-cols-3">
            <article>
              <h3 className="font-condensed text-lg font-black uppercase text-white">
                Choose a deck size
              </h3>
              <p className="mt-2">
                Pick 3G, 4G, 5G, or 6G depending on how many Beyblades your event
                or format allows, then build each combo one at a time.
              </p>
            </article>
            <article>
              <h3 className="font-condensed text-lg font-black uppercase text-white">
                Pick standard or CX
              </h3>
              <p className="mt-2">
                Standard UX and BX combos use Blade + Ratchet + Bit. Full CX builds
                add a Lock Chip and swap in an Assist, Over, or Metal Blade for
                deeper customization.
              </p>
            </article>
            <article>
              <h3 className="font-condensed text-lg font-black uppercase text-white">
                Preview and export
              </h3>
              <p className="mt-2">
                Search each part list by name, watch the deck card update live,
                add a deck name and logo, then download the finished graphic to
                share.
              </p>
            </article>
          </div>

          <div className="mt-14 grid gap-10 md:grid-cols-2">
            <article>
              <h2 className="font-display text-3xl leading-none text-white">
                Where the part images come from
              </h2>
              <p className="mt-5 text-sm leading-7 text-white/65">
                Part options and images are drawn from a reference set of released
                Beyblade X parts so you can visually match a combo before you build
                it in real life or on a bracket sheet.
              </p>
            </article>
            <article>
              <h2 className="font-display text-3xl leading-none text-white">
                Independent fan project
              </h2>
              <p className="mt-5 text-sm leading-7 text-white/65">
                This deck builder is an independent, non-commercial fan tool. It is
                not affiliated with or endorsed by Takara Tomy or Hasbro. Part
                names and imagery belong to their respective owners.
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
