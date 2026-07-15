export const SUPPORTED_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
export const JPEG_QUALITY = 0.9;

export const PAGE_SIZES = {
  A3: { width: 841.89, height: 1190.55 },
  A4: { width: 595.28, height: 841.89 },
  A5: { width: 419.53, height: 595.28 },
  Letter: { width: 612, height: 792 },
  Legal: { width: 612, height: 1008 },
  Tabloid: { width: 792, height: 1224 },
  Executive: { width: 522, height: 756 },
} as const;

export type PageSizeKey = keyof typeof PAGE_SIZES;
export type FitMode = "fit" | "matchImage";
