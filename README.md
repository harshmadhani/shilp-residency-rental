# Shilp Residency — Rental Fit-out Pack

**Property:** Flat No. ____, C Block (3-Series), Shilp Residency, Near Olive Greens, Gota, SG Highway, Ahmedabad 382481 — 3 BHK, 2,360 sq ft built-up.

This repo holds the working documents for fitting out the flat for **long-term furnished rental** (target: 2–3 years, extendable to 5–10+).

## Contents

| File | Purpose |
|---|---|
| `docs/vendor-confirmation.en.md` | Work confirmation + specification sheet to be signed with the vendor (English) |
| `docs/vendor-confirmation.hi.md` | Same, in Hindi |
| `docs/spec-and-quotation.en.md` | Materials explained + suggested quotation (English) |
| `docs/spec-and-quotation.hi.md` | Same, in Hindi |
| `pdf/` | Print-ready PDFs generated from the above |
| `build/md2html.js` | Converts the markdown files to styled, print-ready HTML |
| `build/build-pdf.ps1` | Converts the HTML to PDF using headless Chrome |

## Rebuilding the PDFs

```powershell
node build/md2html.js
powershell -ExecutionPolicy Bypass -File build/build-pdf.ps1
```

## Key decisions locked

- **Core material:** branded plywood (not MDF / particle board).
- **Kitchen ply:** `IS 710` (BWR/BWP — boiling-water-proof).
- **Wardrobe ply:** `IS 710` preferred, `IS 303` (MR) minimum.
- **Laminate:** 1 mm on both faces; **edge banding 2 mm PVC, fully sealed**.
- **Hardware:** branded (Ebco / Hettich). No local no-name.
- **Excluded from scope:** granite counter (already installed), sink, hob, chimney, fans, lights, curtains, paint, AC pelmet, appliances, loose furniture.
