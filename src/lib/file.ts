import { SUPPORTED_TYPES } from "@/utils/constants";

export function isSupportedImage(file: File): boolean {
  return SUPPORTED_TYPES.includes(file.type);
}

export function filesFromFileList(list: FileList): File[] {
  return Array.from(list).filter(isSupportedImage);
}
