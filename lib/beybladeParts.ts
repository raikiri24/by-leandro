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

export function createStandardBuild(): StandardBuild {
  return {
    type: "standard",
    bladeId: STANDARD_BLADES[0].id,
    ratchetId: STANDARD_RATCHETS[0].id,
    bitId: STANDARD_BITS[0].id,
  };
}

export function createCxBuild(): CxBuild {
  return {
    type: "cx",
    lockChipId: CX_LOCK_CHIPS[0].id,
    mainBladeId: CX_MAIN_BLADES[0].id,
    armorId: CX_ARMOR[0].id,
    ratchetId: CX_RATCHETS[0].id,
    bitId: CX_BITS[0].id,
  };
}
