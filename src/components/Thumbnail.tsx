import Image from "next/image";

export function Thumbnail({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative h-28 w-28">
      <Image
        src={src}
        alt={alt}
        fill
        unoptimized
        className="rounded-lg border border-neutral-200 object-contain shadow-sm dark:border-neutral-800"
      />
    </div>
  );
}
