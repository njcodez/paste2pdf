export function computeFitDimensions(
  imgWidth: number,
  imgHeight: number,
  pageWidth: number,
  pageHeight: number
) {
  const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);
  const width = imgWidth * ratio;
  const height = imgHeight * ratio;
  const x = (pageWidth - width) / 2;
  const y = (pageHeight - height) / 2;
  return { width, height, x, y };
}
