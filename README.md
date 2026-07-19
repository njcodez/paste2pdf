# Paste2PDF

Turn screenshots and images into a PDF, entirely in your browser. No uploads, no servers, no accounts.

## Why

Everyone's done this: paste a screenshot into Word, resize it, paste the next one, repeat. Paste2PDF skips all that. Paste, arrange, download.

## Features

- Paste screenshots directly with Ctrl+V
- Add images from your device (PNG, JPG, WEBP)
- Drag to reorder pages
- Click a page to preview it full-size
- Choose page size (A3–A5, Letter, Legal, Tabloid, Executive) and fit mode
- Name your file before downloading
- Pages persist locally across reloads (IndexedDB)
- Fully responsive - works on desktop, tablet, and mobile

## Privacy

No image or PDF data ever leaves your device. There is no backend, no upload endpoint, and no analytics tied to your file content. Everything — clipboard reading, image scaling, and PDF generation — runs client-side using browser APIs (`Canvas`, `ClipboardEvent`, `pdf-lib`).

## Tech Stack

Next.js (App Router) · TypeScript · Tailwind CSS · Zustand · dnd-kit · pdf-lib · Framer Motion

## Getting Started

```bash
git clone https://github.com/njcodez/paste2pdf.git
cd paste2pdf
npm install
npm run dev
```

Open `http://localhost:3000`.

## Contributing

This is an MVP and there's plenty of room to grow — rotate/crop pages, multiple export formats, OCR, PWA offline support, dark mode polish, and more are all fair game. If the idea of a genuinely private, no-upload-required PDF tool interests you, contributions are welcome.

1. Fork the repo
2. Create a branch (`git checkout -b feature/your-idea`)
3. Commit your changes
4. Open a PR

No gatekeeping — just keep the core principle intact: **nothing leaves the browser.**

## License

MIT
