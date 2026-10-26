# Pptx Studio

A small Node.js toolkit for producing editable 16:9 PowerPoint decks with PptxGenJS. The shared system uses white slides, navy text, Aptos typography with a 13 pt default body size, and blue, green, and purple accents. Layouts scale text to their available space and hierarchy. Technical, executive, and sales profiles use blue, green, and purple as their primary accents; technical diagrams can use all three colors to distinguish system groups.

## Design reference

The manager-approved sample uses a white widescreen canvas, dark navy typography, pale blue/green/purple semantic panels, a system-context diagram, and a three-column decision-record composition. The framework carries those visual cues into the shared summary and architecture layouts. The enlarged summary panels use 20 pt headings and 16 pt copy; architecture nodes use 15 pt headings and 12.5 pt details. Inspection of the PPTX theme shows Calibri (not Aptos), with body text at 13 pt alongside smaller labels and larger headings; the framework follows the requested Aptos standard.

## Requirements

- WSL2 Ubuntu
- Node.js 20 or later and npm
- LibreOffice Impress for PPTX-to-PDF rendering
- Poppler utilities (`pdftoppm`) for slide images

The project was created in WSL2 Ubuntu 20.04 with Node.js 24 and npm 11. LibreOffice and Poppler were absent in that environment at initial inspection. Docker Compose is the recommended way to run the full workflow because the image includes Node.js, LibreOffice, and Poppler.

## Docker workflow

With Docker Engine available to your WSL user:

```bash
docker compose up --build
```

This builds the deck, checks the PPTX package, renders a PDF and slide PNGs, and creates the contact sheet. Source and generated output stay in the project directory. The Compose service also accepts one-off commands, for example `docker compose run --rm studio npm run build:sample`.

If Docker reports `permission denied` for `/var/run/docker.sock`, ensure Docker Desktop integration is enabled for this WSL distribution or that the Docker daemon is running and accessible to your user.

## Setup

For a host-only build without Docker, from the project directory:

```bash
npm install
```

On Ubuntu, install the rendering tools with:

```bash
sudo apt update
sudo apt install libreoffice-impress poppler-utils fonts-liberation
```

The deck requests Aptos fonts. If Aptos is unavailable on Linux, LibreOffice will substitute a font; install the same font used by your PowerPoint environment when matching typography is important.

## Generate and inspect the sample

```bash
npm run build:sample
npm run validate
npm run render
npm run contact-sheet
```

The sample deck contains a cover, executive summary, editable AWS architecture diagram, roadmap, editable native PowerPoint chart, and recommendation slide. Review `output/contact-sheet.png` and the individual images in `output/slides/`. If you find clipping, overlap, or poor spacing, update the corresponding layout in `src/layouts/`, then rebuild, render, and inspect again.

`npm run render` creates `output/sample-modernization.pdf` and PNGs in `output/slides/`. `npm run contact-sheet` creates a two-column contact sheet. `npm run validate` checks PPTX ZIP integrity, required Open XML parts, slide count, text, shapes, and chart presence. It does not replace visual inspection in PowerPoint or LibreOffice.

## Reuse the system

Use `createPresentation(profiles.technical)` to start a deck, then add shared slide layouts or build profile-specific content using the design tokens. Profile keys are `technical`, `executive`, and `sales`. Keep spacing on the 16:9 canvas, use the shared margin, and prefer native PowerPoint objects so recipients can edit the result.

The sample is built in `src/build-sample.js`; its fictional targets and architecture are documented in `briefs/sample-modernization.md`.

## Troubleshooting

- **`libreoffice` not found:** install `libreoffice-impress`, then check `command -v libreoffice`.
- **`pdftoppm` not found:** install `poppler-utils`.
- **Fonts differ after rendering:** install the intended font in WSL, run `fc-cache -f`, then render again.
- **PowerPoint reports a damaged file:** regenerate with `npm run build:sample` and run `npm run validate`; keep PptxGenJS and Node.js versions recorded with generated deliverables when diagnosing compatibility.
- **Contact sheet reports no slide images:** run `npm run render` successfully first.
