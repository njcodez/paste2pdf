import { PDFDocument } from "pdf-lib";
import type { Page } from "@/types/page";
import { PAGE_SIZES, JPEG_QUALITY, type PageSizeKey, type FitMode } from "@/utils/constants";
import { computeFitDimensions } from "@/utils/scaleImage";

interface GenerateOptions {
  pageSize: PageSizeKey;
  fitMode: FitMode;
}

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

export async function generatePdf(pages: Page[], options: GenerateOptions): Promise<Blob> {
  const pdfDoc = await PDFDocument.create();

  for (const page of pages) {
    const jpegBytes = await pageImageToJpegBytes(page);
    const jpegImage = await pdfDoc.embedJpg(jpegBytes);

    if (options.fitMode === "matchImage") {
      // page size = image size, no border
      const pdfPage = pdfDoc.addPage([page.width, page.height]);
      pdfPage.drawImage(jpegImage, { x: 0, y: 0, width: page.width, height: page.height });
    } else {
      const { width: pw, height: ph } = PAGE_SIZES[options.pageSize];
      const pdfPage = pdfDoc.addPage([pw, ph]);
      const { width, height, x, y } = computeFitDimensions(page.width, page.height, pw, ph);
      pdfPage.drawImage(jpegImage, { x, y, width, height });
    }
  }

  const bytes = await pdfDoc.save();
  return new Blob([bytes], { type: "application/pdf" });
}
