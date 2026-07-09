import { nanoid } from "nanoid";
import type { Page } from "@/types/page";
import { createThumbnail } from "./canvas";

export async function fileToPage(file: File): Promise<Page> {
  const bitmap = await createImageBitmap(file);
  const thumbnail = await createThumbnail(bitmap);

  return {
    id: nanoid(),
    file,
    imageBitmap: bitmap,
    width: bitmap.width,
    height: bitmap.height,
    thumbnail,
  };
}
