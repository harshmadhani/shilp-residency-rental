# Shilp Residency — Rental Fit-out Pack

**Property:** Flat No. ____, C Block (3-Series), Shilp Residency, Near Olive Greens, Gota, SG Highway, Ahmedabad 382481 — 3 BHK, 2,360 sq ft built-up.

Working documents for fitting out the flat for **long-term furnished rental** (target: 2–3 years, extendable to 5–10+).

## Contents

| File | Purpose |
|---|---|
| `docs/spec-and-quotation.en.md` | Materials explained, what was negotiated, and the suggested quotation (English) |
| `docs/wardrobe-buying-guide.en.md` | What wardrobe to buy for each bedroom, sized from the unit plan |
| `docs/vendor-confirmation.en.md` | Work confirmation / specification sheet, English reference version |
| `docs/quotation.hi.md` | Hindi quotation — source of the PDF handed to the contractor |
| `pdf/quotation.hi.pdf` | **Final Hindi quotation — the file to give the furniture contractor** |
| `assets/floor-plan-3bhk.webp` | Shilp 3 BHK unit plan (room dimensions used in the wardrobe guide) |
| `build/md2html.js` | Renders the Hindi quotation markdown to print-ready HTML |
| `build/build-pdf.ps1` | Renders the HTML to PDF with headless Chrome |

English documents are kept as markdown for reference. Only the final quotation is produced in Hindi as a PDF, because that is all the contractor needs.

## Rebuilding the PDF

```powershell
node build/md2html.js
powershell -ExecutionPolicy Bypass -File build/build-pdf.ps1
```

## Key decisions locked

- **Core material:** branded plywood (not MDF / particle board).
- **Kitchen ply:** `IS 710` (BWR/BWP — boiling-water-proof).
- **Wardrobe ply:** `IS 710` preferred, `IS 303` (MR) minimum.
- **Laminate:** 1 mm on both faces.
- **Edge banding:** 2 mm PVC, fully sealed on every edge.
- **Hardware:** branded (Ebco / Hettich). No local no-name.
- **Excluded:** granite counter (already installed), sink, hob, chimney, fans, lights, curtains, paint, AC pelmet, appliances, loose furniture.
