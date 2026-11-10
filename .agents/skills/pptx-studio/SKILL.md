---
name: pptx-studio
description: Create PowerPoint presentations, create PPTX slides, or build a slide deck in this PptxGenJS project; also use when revising or visually QA decks with its shared technical, executive, or sales profiles and layouts.
---

# Pptx Studio

Use this workflow when a user asks for a new deck, slide revisions, or a reusable presentation layout in this repository.

## Build the deck

1. Read the project `AGENTS.md` and the relevant brief under `briefs/`. Inspect any supplied references and existing output before choosing filenames or changing files.
2. Choose `technical`, `executive`, or `sales` based on the audience and purpose. Reuse the theme, palette, and layouts in `src/`; add a focused layout only when the brief needs one that does not exist.
3. Keep slides editable with native PowerPoint text, shapes, connectors, and charts. Use images only when they add information or are part of the requested brand/reference. Keep a clear grid, align related elements, and scale type to its role and available space; 13 pt is the default body size, not a fixed size.
4. Keep content concise and distinguish facts from planning assumptions. Label illustrative numbers as illustrative. Do not silently turn a reference deck's exact content into new project facts.
5. Create a deck-specific builder such as `src/build-<slug>.js` and write the result to a new file such as `output/<slug>.pptx`. Preserve the sample builder and supplied reference files. Check whether an output name already exists before replacing it.

## Build, validate, and inspect

Run the workflow from the project root. Prefer Docker Compose so Node.js, LibreOffice, Poppler, and fonts use the project container rather than host installations.

- The default `docker compose up --build --abort-on-container-exit` builds, validates, renders, and creates a contact sheet for the sample deck.
- For a custom builder, run `docker compose run --rm studio node src/build-<slug>.js`.
- Validate a custom deck with `docker compose run --rm studio node scripts/validate-pptx.js output/<slug>.pptx`.
- `scripts/render.js` and `scripts/contact-sheet.js` currently default to the sample deck. For custom-deck QA, extend them minimally with input/output path arguments while preserving their current defaults, then render to a deck-specific folder under `output/`.

Inspect the rendered contact sheet and each slide at readable size. Fix visible clipping, overlap, cramped labels, inconsistent alignment, or poor contrast; rebuild and render again until the deck is clean. If the agent cannot view images, report that visual inspection was unavailable and provide the contact sheet path.

If Docker access is denied in the agent shell, stop container retries, explain the socket restriction, and give the user the exact Compose command to run from the project directory. Do not install system packages on the host as a workaround.

## Finish

Leave the editable `.pptx` in `output/`; include a PDF and contact sheet when rendering succeeds. In the final response, link the deck and contact sheet and summarize validation and visual inspection. State any remaining limitation plainly.
