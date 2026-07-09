export async function createThumbnail(bitmap: ImageBitmap, maxSize = 200): Promise<string> {
  const ratio = Math.min(maxSize / bitmap.width, maxSize / bitmap.height);
  const w = Math.round(bitmap.width * ratio);
  const h = Math.round(bitmap.height * ratio);

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas context unavailable");
  ctx.drawImage(bitmap, 0, 0, w, h);

  return canvas.toDataURL("image/jpeg", 0.8);
}
