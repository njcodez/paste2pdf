import "@/styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Paste2PDF — Screenshots to PDF, instantly",
  description: "Paste screenshots, arrange pages, download a PDF. 100% client-side, nothing uploaded.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
