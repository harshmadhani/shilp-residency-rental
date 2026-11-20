# Shilp Residency — Rental Fit-out Pack

**Property:** Flat No. ____, C Block (3-Series), Shilp Residency, Near Olive Greens, Gota, SG Highway, Ahmedabad 382481 — 3 BHK, 2,360 sq ft built-up.

Working documents for fitting out the flat for **long-term furnished rental** (target: 2–3 years, extendable to 5–10+).

## Contents

| File | Purpose |
|---|---|
| `docs/spec-and-quotation.en.md` | Materials explained, what was negotiated, and the suggested quotation (English) |
| `docs/wardrobe-buying-guide.en.md` | What wardrobe to buy for each bedroom, sized from the unit plan |
| `docs/lights-fans-fixtures.en.md` | Fans, lights, geysers, pigeon net and bathroom fittings — live prices, Amazon/Flipkart ratings, costed buy list, and the bought-vs-pending status chart (§0) |
| `docs/vendor-confirmation.en.md` | Work confirmation / specification sheet, English reference version |
| `docs/quotation.hi.md` | Hindi quotation — source of the PDF handed to the contractor |
| `pdf/quotation.hi.pdf` | **Hindi quotation — the file to give the furniture contractor** |
| `docs/fitting-list.hi.md` | Hindi fitting list — source of the PDF handed to the electrician |
| `pdf/fitting-list.hi.pdf` | **Hindi fitting list — the file to give the electrician** |
| `assets/floor-plan-3bhk.webp` | Shilp 3 BHK unit plan (room dimensions used in the guides) |
| `build/md2html.js` | Renders the Hindi documents to print-ready HTML |
| `build/build-pdf.ps1` | Renders the HTML to PDF with headless Chrome |

English documents are kept as markdown for reference. Only the two documents that go to tradesmen — the quotation and the fitting list — are produced in Hindi as PDFs.

## Purchase status — updated 20 November 2026

| Bought | Qty | ₹ |
|---|---|---|
| **atomberg Renesa Prime Remote 1200 mm, Gloss White** | **5** | **19,245** |
| **Crompton 9 W bathroom lights** | **3** | 1,650 (budget price) |
| **16 W bulb + big-cup holder — foyer, balcony** | **2** | 350 (budget price) |

**Pending:** 1 ceiling fan (Bedroom 5), 1 kitchen fan (Bajaj Maxima 600), **12 LED battens, 3 night lamps**, 4 exhaust fans, 6 curtain rods, 3 bath accessory sets, 3 mirrors, 3 geysers and the pigeon net.

| | ₹ |
|---|---|
| Whole fit-out (furniture + fixtures + geysers + net) | 1,55,586 |
| Spent | 21,245 |
| Still to spend | 1,34,341 |

**Lights still to buy: 12 battens + 3 night lamps = ₹2,505.** Of the 17 wired light points, 5 are done (3 bathroom, foyer, balcony); 12 battens remain, plus 3 plug-in night lamps that need no wiring. The itemised chart is **§0** and the room-by-room list is **§1** of `docs/lights-fans-fixtures.en.md`.

The itemised bought/pending chart, with the order to buy the rest in, is **§0 of `docs/lights-fans-fixtures.en.md`**. The Hindi fitting list already reflects it: **5 fans to fit now, 1 bedroom fan and the kitchen fan deferred, with their points and hooks prepared now.**

## Rebuilding the PDFs

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
