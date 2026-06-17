import { beybladeParts, type PartOption } from "./beybladeParts.generated";

export type { PartOption };

export type DeckSize = "3G" | "4G" | "5G" | "6G";
export const DECK_SIZES: DeckSize[] = ["3G", "4G", "5G", "6G"];

export type BuildType = "standard" | "cx";

const NONE_OPTION: PartOption = { id: "none", name: "None", image: "" };

function sortByName(options: PartOption[]): PartOption[] {
  return [...options].sort((a, b) => a.name.localeCompare(b.name));
}

// Ratchets and Bits are shared across build types (BX, UX, CX combined into one pool each).
export const ALL_RATCHETS: PartOption[] = sortByName([
  ...beybladeParts.bx.Ratchets,
  ...beybladeParts.ux.Ratchets,
  ...beybladeParts.cx.Ratchets,
]);
export const ALL_BITS: PartOption[] = sortByName([
  ...beybladeParts.bx.Bits,
  ...beybladeParts.ux.Bits,
  ...beybladeParts.cx.Bits,
]);

// Standard (UX & BX): Blade + Ratchet + Bit
export const STANDARD_BLADES: PartOption[] = sortByName([
  ...beybladeParts.bx.Blades,
  ...beybladeParts.ux.Blades,
]);
export const STANDARD_RATCHETS: PartOption[] = ALL_RATCHETS;
export const STANDARD_BITS: PartOption[] = ALL_BITS;

// Custom (CX): Lock Chip + Main Blade + Armor (Assist/Over/Metal Blade) + Ratchet + Bit
export const CX_LOCK_CHIPS: PartOption[] = sortByName(beybladeParts.cx.LockChips);
export const CX_MAIN_BLADES: PartOption[] = sortByName(beybladeParts.cx.MainBlades);
export const CX_ARMOR: PartOption[] = [
  NONE_OPTION,
  ...sortByName([
    ...beybladeParts.cx.AssistBlades,
    ...beybladeParts.cx.OverBlades,
    ...beybladeParts.cx.MetalBlades,
  ]),
];
export const CX_RATCHETS: PartOption[] = ALL_RATCHETS;
export const CX_BITS: PartOption[] = ALL_BITS;

export interface StandardBuild {
  type: "standard";
  bladeId: string;
  ratchetId: string;
  bitId: string;
}

export interface CxBuild {
  type: "cx";
  lockChipId: string;
  mainBladeId: string;
  armorId: string;
  ratchetId: string;
  bitId: string;
}

export type BeybladeBuild = StandardBuild | CxBuild;

export function findPart(options: PartOption[], id: string): PartOption | undefined {
  return options.find((option) => option.id === id);
}

function firstAvailable(options: PartOption[], excluded: Set<string>): PartOption {
  return options.find((option) => !excluded.has(option.id)) ?? options[0];
}

export interface UsedPartIds {
  blade: Set<string>;
  ratchet: Set<string>;
  bit: Set<string>;
  lockChip: Set<string>;
  mainBlade: Set<string>;
  armor: Set<string>;
}

// A deck can't repeat the same physical part across builds. Collects, per part
// category, the ids already claimed by other builds so pickers can hide them.
export function collectUsedPartIds(builds: BeybladeBuild[], excludeIndex?: number): UsedPartIds {
  const used: UsedPartIds = {
    blade: new Set(),
    ratchet: new Set(),
    bit: new Set(),
    lockChip: new Set(),
    mainBlade: new Set(),
    armor: new Set(),
  };

  builds.forEach((build, index) => {
    if (index === excludeIndex) return;
    used.bit.add(build.bitId);
    if (build.type === "standard") {
      used.blade.add(build.bladeId);
      const blade = findPart(STANDARD_BLADES, build.bladeId);
      // A blade with an integrated ratchet never exposes a ratchet picker, so
      // its placeholder ratchetId isn't really "in use" — don't block it.
      if (!blade?.integratedRatchet) used.ratchet.add(build.ratchetId);
    } else {
      used.lockChip.add(build.lockChipId);
      used.mainBlade.add(build.mainBladeId);
      used.ratchet.add(build.ratchetId);
      if (build.armorId !== NONE_OPTION.id) used.armor.add(build.armorId);
    }
  });

  return used;
}

// Hides ids already claimed elsewhere in the deck, while always keeping the
// currently selected option (and the "None" armor option) visible.
export function availableOptions(
  options: PartOption[],
  used: Set<string>,
  currentId?: string,
): PartOption[] {
  return options.filter(
    (option) => option.id === NONE_OPTION.id || option.id === currentId || !used.has(option.id),
  );
}

export function createStandardBuild(
  used?: Partial<Pick<UsedPartIds, "blade" | "ratchet" | "bit">>,
): StandardBuild {
  return {
    type: "standard",
    bladeId: firstAvailable(STANDARD_BLADES, used?.blade ?? new Set()).id,
    ratchetId: firstAvailable(STANDARD_RATCHETS, used?.ratchet ?? new Set()).id,
    bitId: firstAvailable(STANDARD_BITS, used?.bit ?? new Set()).id,
  };
}

export function createCxBuild(
  used?: Partial<Pick<UsedPartIds, "lockChip" | "mainBlade" | "armor" | "ratchet" | "bit">>,
): CxBuild {
  return {
    type: "cx",
    lockChipId: firstAvailable(CX_LOCK_CHIPS, used?.lockChip ?? new Set()).id,
    mainBladeId: firstAvailable(CX_MAIN_BLADES, used?.mainBlade ?? new Set()).id,
    armorId: CX_ARMOR[0].id,
    ratchetId: firstAvailable(CX_RATCHETS, used?.ratchet ?? new Set()).id,
    bitId: firstAvailable(CX_BITS, used?.bit ?? new Set()).id,
  };
}

// Grows or shrinks a deck's build list to `count`, picking defaults for any
// new build that avoid parts already claimed elsewhere in the deck.
export function withBuildCount(builds: BeybladeBuild[], count: number): BeybladeBuild[] {
  if (count <= builds.length) return builds.slice(0, count);
  const result = [...builds];
  while (result.length < count) {
    const used = collectUsedPartIds(result);
    result.push(createStandardBuild({ blade: used.blade, ratchet: used.ratchet, bit: used.bit }));
  }
  return result;
}
