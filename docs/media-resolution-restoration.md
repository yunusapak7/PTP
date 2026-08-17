# Media resolution restoration — 2026-08-15

## Outcome

The active-site audit found 19 raster assets with a credible resolution risk at their rendered size or at 2× device pixel ratio. All 19 have been replaced in active EN/TR usage. Restoration stayed within a conservative 2× source-size ceiling; no generative detail, object removal, fabricated machinery or reconstructed technical evidence was introduced.

The existing responsive `*-poster-v2.webp` video poster families remain unchanged because their desktop, mobile, thumbnail and modal variants already meet their display budgets.

## Inventory and decision record

| Active area | Previous master | Previous size | Typical CSS display / 2× need | Source and risk | Restored active asset | New size | Classification / solution |
|---|---|---:|---:|---|---|---:|---|
| DTPaper · Print | `dtpaper-step-print.webp` | 320×267 · 10.8 KB | ≤320 px / 640 px | published DTP workflow video; severe Retina risk | `dtpaper-step-print-v2.webp` + mobile | 720×540 · 27.6 KB; 480×480 · 20.5 KB | recorded process; stage-specific re-extraction at 2.55 s |
| DTPaper · Powder | `dtpaper-step-powder.webp` | 307×256 · 8.5 KB | ≤320 px / 640 px | published DTP workflow video; severe risk and source letterboxing | `dtpaper-step-powder-v2.webp` + mobile | 720×540 · 16.2 KB; 480×480 · 9.5 KB | recorded process; stage-specific re-extraction at 11.20 s; source bars retained honestly |
| DTPaper · Curing | `dtpaper-step-cure.webp` | 320×267 · 5.2 KB | ≤320 px / 640 px | published DTP workflow video; severe compression / Retina risk | `dtpaper-step-cure-v2.webp` + mobile | 720×540 · 12.4 KB; 480×480 · 9.4 KB | recorded process; stage-specific re-extraction at 16.80 s |
| DTPaper · Transfer | `dtpaper-step-transfer.webp` | 320×568 · 12.6 KB | ≤320 px / 640 px | published DTP workflow video; narrow portrait source presentation | `dtpaper-step-transfer-v2.webp` + mobile | 720×540 · 16.2 KB; 480×480 · 12.2 KB | recorded process; stage-specific re-extraction at 23.60 s |
| Ceralith · Bakery handling | `ceralith-bakery-frame.webp` | 320×267 · 9.9 KB | ≤320 px / 640 px | published ovenable demo; severe Retina risk | `ceralith-bakery-frame-v2.webp` + mobile | 720×540 · 30.1 KB; 480×480 · 23.3 KB | recorded application; stage-specific re-extraction at 0.00 s |
| Ceralith · Exposure / liner | `ceralith-exposure-frame.webp` | 320×267 · 10.3 KB | ≤320 px / 640 px | published ovenable demo; severe Retina risk | `ceralith-exposure-frame-v2.webp` + mobile | 720×540 · 26.1 KB; 480×480 · 19.3 KB | recorded application; stage-specific re-extraction at 20.667 s |
| Bioma-ORX · four recorded observations | no previous stage-card family | — | ≤360 px / 720 px | published comparative demo; required recorded evidence sequence | four `bioma-*-frame-v2.webp` files + mobile | 720×540 · 11.3–26.6 KB; 480×480 · 7.4–21.8 KB | recorded comparison; semantic selections at 5.20 s, 18.20 s, 10.40 s and 49.40 s |
| Ceralith · Ovenable tray | `ceralith-ovenable-tray-v2.webp` | 637×373 · 43.2 KB | hero ≤637 px / 1274 px | representative source; Retina risk in hero | `ceralith-ovenable-tray-v3.webp` | 1274×746 · 106.6 KB | representative application; deterministic 2× restoration; hero capped at 637 px |
| Ceralith · Prepared food | `ceralith-prepared-food-v2.webp` | 649×433 · 30.6 KB | story ≤320 px / 640 px | representative source; edge-case Retina risk | `ceralith-prepared-food-v3.webp` | 1298×866 · 81.6 KB | representative application; deterministic 2× restoration |
| Bioma-ORX · six application formats | six `*-v2.webp` files | each 498×498 · 16–41 KB | story ≤470 px; hero ≤498 px / up to 996 px | representative sources; severe hero and near-limit story Retina risk | six `*-v3.webp` files | each 996×996 · 42.6–109.8 KB | representative application; deterministic 2× restoration; hero capped at 498 px |
| Home · five lab-to-scale stages | five `*-v3.webp` files | 508–510 px square · 11.9–27.1 KB | mobile about 346 px / 692 px; desktop about 20 vw | AI-generated representative masters; no evidence role, but Retina budget was insufficient | five `*-v4.webp` files | 1016–1020 px · 31.6–65.5 KB | AI-generated representative image, resolution-only deterministic 2× restoration; existing disclosure retained |

## Presentation and delivery changes

- DTPaper uses a compact four-stage desktop timeline and a vertical mobile timeline. It does not require horizontal swiping. The separate representative final-textile card is retained, and a “Watch full recorded workflow” / “Kaydedilmiş iş akışının tamamını izleyin” anchor leads to the full recorded demonstration.
- Bioma-ORX adds four small recorded comparison cards—Untreated OCC, Treated structure, Oil application and Comparative observation—before the six clearly labelled representative target-format cards.
- Recorded DTPaper and Ceralith cards use explicit desktop/mobile `<picture>` sources. Representative gallery and product-hero images use responsive Next Image delivery with explicit `sizes` and controlled quality.
- Ceralith and Bioma hero media are capped at the largest CSS width their restored source can support at 2×. If a future design enlarges these areas, a genuinely higher-resolution master will be required.
- EN and TR pages share the same approved assets and differ only in labels and alternative text.

## Source limitations

The named camera-original MOV files were not present in the repository. The published MP4 demonstrations are therefore the highest verifiable sources available for DTPaper and Ceralith. The process cards remain deliberately compact; their restored size improves delivery and crop control but does not claim detail that the published footage does not contain.
