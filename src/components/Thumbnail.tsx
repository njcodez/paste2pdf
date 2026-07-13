export function Thumbnail({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      className="h-28 w-auto rounded-lg border border-neutral-200 object-contain shadow-sm dark:border-neutral-800"
    />
  );
}
