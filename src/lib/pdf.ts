import { PDFDocument } from "pdf-lib";
import type { Page } from "@/types/page";
import { A4_WIDTH_PT, A4_HEIGHT_PT, JPEG_QUALITY } from "@/utils/constants";
import { computeFitDimensions } from "@/utils/scaleImage";

async function pageImageToJpegBytes(page: Page): Promise<Uint8Array> {
  const bitmap = page.imageBitmap!;
  const canvas = document.createElement("canvas");
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas context unavailable");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bitmap, 0, 0);

  const blob: Blob = await new Promise((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("toBlob failed"))),
      "image/jpeg",
      JPEG_QUALITY
    );
  });

  return new Uint8Array(await blob.arrayBuffer());
}

export async function generatePdf(pages: Page[]): Promise<Blob> {
  const pdfDoc = await PDFDocument.create();

  for (const page of pages) {
    const jpegBytes = await pageImageToJpegBytes(page);
    const jpegImage = await pdfDoc.embedJpg(jpegBytes);

    const pdfPage = pdfDoc.addPage([A4_WIDTH_PT, A4_HEIGHT_PT]);
    const { width, height, x, y } = computeFitDimensions(
      page.width,
      page.height,
      A4_WIDTH_PT,
      A4_HEIGHT_PT
    );

    pdfPage.drawImage(jpegImage, { x, y, width, height });
  }

const bytes = await pdfDoc.save();

return new Blob([new Uint8Array(bytes)], {
  type: "application/pdf",
});
}
