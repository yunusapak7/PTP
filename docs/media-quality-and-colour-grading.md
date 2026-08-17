# PTP media quality and colour grading audit

Audit date: 2026-08-15. Scope: active EN/TR site assets only. Unused starter graphics and superseded source versions are retained in the repository for traceability but are not counted as active visual inventory.

## Method and evidence boundary

- Recorded footage and representative imagery were processed through separate deterministic workflows.
- Recorded posters were selected after multi-time-point review. Only white balance, exposure/mid-tone control, mild contrast, bounded shadow lift, restrained saturation, source-appropriate sharpening, downscaling and crop/presentation framing were used.
- No generative editing, AI upscaling, object removal, droplet alteration, print reconstruction, synthetic device detail or performance enhancement was applied.
- AI-generated representative images were colour graded per asset. Geometry, people, hands, devices, screens, samples and depicted outcomes were not regenerated or changed.
- The six original filenames named in the brief were not present in the workspace or attachment store. The highest-quality verifiable published files in `public/media` were therefore used as poster sources. This limitation is retained below.

## Recorded video posters and thumbnails

All values are active WebP outputs. Desktop/modal media is 16:9. Portrait source frames are shown intact over a subdued, blurred crop of the same frame; the meaningful evidence frame is downscaled, not enlarged.

| Category | Active path | Page / section | Pixels | Size | Source video / time | Rendered bound and upscale risk | Colour / contrast action | Better alternate source |
|---|---|---|---:|---:|---|---|---|---|
| Recorded video poster | `assets/posters/dtpaper-workflow-poster-v2.webp` | EN/TR DTPaper · recorded demonstration | 1024×576 | 14.2 KB | `public/media/dtpaper-workflow.mp4` · ~16.8 s | ≤1024 px; intact 720×1280 frame downscaled; none | cooler-neutral WB, +mid-tones, mild contrast/sharpen | Named `Dtpaper_Video_1/2/3.mov` not found |
| Recorded video poster | `assets/posters/dtpaper-workflow-poster-mobile-v2.webp` | DTPaper · mobile poster | 720×900 | 19.9 KB | same · ~16.8 s | ≤720 px; no upscale | same; 4:5 presentation | same limitation |
| Recorded demonstration thumbnail | `assets/posters/dtpaper-workflow-poster-thumbnail-v2.webp` | DTPaper · compact/list poster | 480×270 | 5.0 KB | same · ~16.8 s | ≤480 px; no upscale | same | same limitation |
| Recorded video poster | `assets/posters/dtpaper-workflow-poster-modal-v2.webp` | DTPaper · modal pre-play | 1024×576 | 15.3 KB | same · ~16.8 s | ≤1024 px; evidence frame remains source-bounded | same | same limitation |
| Recorded video poster | `assets/posters/ceralith-ovenable-demo-poster-v2.webp` | EN/TR Ceralith · recorded demonstration | 1024×576 | 25.7 KB | `public/media/ceralith-ovenable-demo.mp4` · ~0.0 s | ≤1024 px; rotated 576×1024 frame downscaled; none | neutral WB, restrained warmth, mild contrast/sharpen | Named `ceralıth video 1.mp4` and `Video.mov` not found |
| Recorded video poster | `assets/posters/ceralith-ovenable-demo-poster-mobile-v2.webp` | Ceralith · mobile poster | 720×900 | 38.5 KB | same · ~0.0 s | ≤720 px; no upscale | same; food and liner retained | same limitation |
| Recorded demonstration thumbnail | `assets/posters/ceralith-ovenable-demo-poster-thumbnail-v2.webp` | Ceralith · compact/list poster | 480×270 | 7.8 KB | same · ~0.0 s | ≤480 px; no upscale | same | same limitation |
| Recorded video poster | `assets/posters/ceralith-ovenable-demo-poster-modal-v2.webp` | Ceralith · modal pre-play | 1024×576 | 27.0 KB | same · ~0.0 s | ≤1024 px; evidence frame remains source-bounded | same | same limitation |
| Recorded video poster | `assets/posters/bioma-oil-barrier-occ-poster-v2.webp` | EN/TR Bioma-ORX · recorded demonstration | 1280×720 | 24.9 KB | `public/media/bioma-oil-barrier-occ.mp4` · ~20.8 s | ≤1280 px; native dimensions; none | neutral WB, lifted mid-tones, mild contrast/sharpen | Named `Bioma_OIL BARRIER TEST_OCC.mp4` not found |
| Recorded video poster | `assets/posters/bioma-oil-barrier-occ-poster-mobile-v2.webp` | Bioma-ORX · mobile poster | 720×900 | 14.0 KB | same · ~20.8 s | ≤720 px; full comparison contained; none | same; both samples retained | same limitation |
| Recorded demonstration thumbnail | `assets/posters/bioma-oil-barrier-occ-poster-thumbnail-v2.webp` | Bioma-ORX · compact/list poster | 480×270 | 6.0 KB | same · ~20.8 s | ≤480 px; no upscale | same | same limitation |
| Recorded video poster | `assets/posters/bioma-oil-barrier-occ-poster-modal-v2.webp` | Bioma-ORX · modal pre-play | 1280×720 | 27.3 KB | same · ~20.8 s | ≤1280 px; native dimensions | same | same limitation |

## AI-generated representative images

All active representative assets remain covered by their existing EN/TR disclosure system. Next/Image supplies responsive `srcset`/`sizes`; the hero is priority-loaded and other imagery is lazy-loaded.

| Active path | Page / section | Pixels | Size | Rendered bound / upscale | Colour issue resolved and direction | Alternate source |
|---|---|---:|---:|---|---|---|
| `public/home-visuals/home-hero-material-transition-v3.webp` | EN/TR home · hero | 1536×1024 | 130.2 KB | ≤690 px wide; none | stronger cold cyan → clean technical centre → warm fibre transition; brighter separation and fibre micro-contrast | v2 retained as source |
| `public/home-visuals/home-dtpaper-representative-v3.webp` | Home · DTPaper card | 1672×941 | 98.6 KB | ≤~750 px / mobile viewport; none | cleaner white paper, cyan, deeper navy textile, restrained green | v2 retained |
| `public/home-visuals/home-ceralith-representative-v3.webp` | Home · Ceralith card | 1672×941 | 93.6 KB | ≤~700 px; none | mineral gold, warm clay, fibre beige; lifted oven shadows without orange cast | v2 retained |
| `public/home-visuals/home-bioma-representative-v3.webp` | Home · Bioma card | 1672×941 | 106.9 KB | ≤~750 px; none | deeper organic green, richer kraft and warm-white paper; restrained food colour | v2 retained |
| `public/home-visuals/home-process-material-challenge-v3.webp` | Home · process 01 | 510×510 | 14.6 KB | 230–250 px; none | fibre white/kraft/film separation | v2 retained |
| `public/home-visuals/home-process-chemistry-substrate-v3.webp` | Home · process 02 | 508×510 | 15.6 KB | 230–250 px; none | clean lab white and controlled cyan | v2 retained |
| `public/home-visuals/home-process-coating-application-v3.webp` | Home · process 03 | 510×510 | 19.1 KB | 230–250 px; none | natural paper, controlled metal reflection, small green process lift | v2 retained |
| `public/home-visuals/home-process-validation-v3.webp` | Home · process 04 | 510×510 | 11.9 KB | 230–250 px; none | warm-neutral sample separation and natural gloves | v2 retained |
| `public/home-visuals/home-process-industrial-scale-v3.webp` | Home · process 05 | 508×510 | 27.1 KB | 230–250 px; none | deep green/cool metal with a warmer paper web and lifted depth | v2 retained |
| `public/home-visuals/home-integration-representative-v3.webp` | Home · integration | 1536×1024 | 95.3 KB | ≤~720 px; none | cleaner gloves/paper, subtle cyan depth, controlled glass/metal highlights | v2 retained |
| `public/story/dtpaper-step-textile-v2.webp` | DTPaper product hero + story final | 1200×800 | 57.8 KB | hero ≤~650 px / story ≤320 px; none | technical cyan, clean white, deeper textile blue | original retained |
| `public/story/ceralith-ovenable-tray-v2.webp` | Ceralith product hero + story + outcomes | 637×373 | 43.2 KB | hero may crop at ~530 px high; mild source limit, no artificial detail | mineral gold/warm clay/fibre edge separation | original retained |
| `public/story/ceralith-prepared-food-v2.webp` | Ceralith product story | 649×433 | 30.6 KB | story ≤320 px; none | natural food colour, richer kraft, neutral whites | original retained |
| `public/story/bioma-fast-food-wrap-v2.webp` | Bioma product hero + story + outcomes | 498×498 | 28.6 KB | hero crop can be slightly above native width; low risk | organic deep green, natural kraft, restrained food warmth | original retained |
| `public/story/bioma-fried-food-v2.webp` | Bioma product story | 498×498 | 24.6 KB | story ≤470 px; none | natural kraft/food separation; no stain removal | original retained |
| `public/story/bioma-bakery-bag-v2.webp` | Bioma product story | 498×498 | 41.0 KB | story ≤470 px; none | richer kraft, deeper green background | original retained |
| `public/story/bioma-snack-pack-v2.webp` | Bioma product story | 498×498 | 22.5 KB | story ≤470 px; none | warm-white popcorn and organic green separation | original retained |
| `public/story/bioma-butter-wrap-v2.webp` | Bioma product story + outcomes | 498×498 | 16.0 KB | story ≤470 px; none | clean warm white and natural butter tone | original retained |
| `public/story/bioma-fibre-takeaway-v2.webp` | Bioma product story | 498×498 | 41.4 KB | story ≤470 px; none | fibre beige/food/green separation | original retained |
| `public/story/platform-people-collaboration-v2.webp` | EN/TR platform · people | 1600×900 | 58.0 KB | ≤~850 px; none | natural skin, cleaner paper, deeper lab green/cyan without changing screen content | original retained |

## Supplied original photography

These documentary assets were not colour-graded because doing so was not required to solve the identified representative-image issue; evidence context and visible content remain unchanged.

| Active path | Page / section | Pixels | Size | Display / upscale | Colour issue | Video / alternate source |
|---|---|---:|---:|---|---|---|
| `public/story/canapa-innovation-center.webp` | EN/TR industrial scale · photo story | 1536×1024 | 121.9 KB | ≤~1024 px; none | balanced documentary colour; unchanged | no video; no better supplied alternate |
| `public/story/platform-application-lab.webp` | EN/TR platform · collage | 1350×900 | 95.0 KB | ≤~650 px; none | acceptable; unchanged | no video; no alternate |
| `public/story/platform-material-test.webp` | EN/TR platform · collage | 1200×800 | 51.9 KB | ≤~650 px; none | acceptable; unchanged | no video; no alternate |
| `public/story/platform-data-review.webp` | EN/TR platform · collage | 833×1250 | 60.7 KB | ≤~650 px; none | acceptable; unchanged | no video; no alternate |

## Recorded demonstration thumbnails already in product stories

| Active path | Page / section | Pixels | Size | Source / display | Upscale and colour status | Alternate source |
|---|---|---:|---:|---|---|---|
| `public/story/dtpaper-step-print.webp` | DTPaper story 01 + outcomes | 320×267 | 10.8 KB | supplied process footage · card now ≤320 px | no longer upscaled; source colour retained | named MOV originals absent |
| `public/story/dtpaper-step-powder.webp` | DTPaper story 02 | 307×256 | 8.5 KB | supplied process footage · card now ≤320 px | possible 4% width interpolation at cap; source-limited, no AI detail | named MOV originals absent |
| `public/story/dtpaper-step-cure.webp` | DTPaper story 03 + outcomes | 320×267 | 5.2 KB | supplied process footage · card now ≤320 px | no longer materially upscaled; compression remains | named MOV originals absent |
| `public/story/dtpaper-step-transfer.webp` | DTPaper story 04 | 320×568 | 12.6 KB | supplied process footage · card now ≤320 px | no width upscale | named MOV originals absent |
| `public/story/ceralith-bakery-frame.webp` | Ceralith story 02 + outcomes | 320×267 | 9.9 KB | supplied demo footage · card now ≤320 px | no longer upscaled; source colour retained | named originals absent |
| `public/story/ceralith-exposure-frame.webp` | Ceralith story 04 | 320×267 | 10.3 KB | supplied demo footage · card now ≤320 px | no longer upscaled; source colour retained | named originals absent |

## Certificate, award and decorative graphics

| Category | Active path | Page / section | Pixels | Size | Display / upscale | Colour status / alternate |
|---|---|---|---:|---:|---|---|
| Certificate / award image | `public/story/canapa-award-certificate-2025.webp` | Home recognition + partners recognition | 1500×1061 | 81.7 KB | ≤~700 px; none | primary record; no grading/crop; supplied source retained |
| Certificate / award image | `public/story/canapa-award-square-2025.webp` | Partners · supporting award visual | 600×600 | 45.9 KB | 180 px; none | supporting record; unchanged |
| Decorative texture or graphic | `public/og-home-v2.png` | OpenGraph/Twitter preview only | 1536×1024 | 2.27 MB | social metadata; not page-rendered | existing preview; future standalone optimisation candidate |
| Decorative texture or graphic | `public/favicon.svg` | Browser tab / bookmark | vector | 0.7 KB | 16–32 px | vector; no upscale issue |

## Implementation verification

- Responsive posters use HTML `<picture>`, `srcset`, `sizes`, explicit width/height, a 16:9 desktop shell and 4:5 mobile shell.
- The poster overlay includes a non-colour-only technology accent, technology name, record type, concise title, keyboard-accessible high-contrast play control and an evidence-context anchor.
- Source-limited DTPaper/Ceralith product-story cards are capped at 320 px. Poster canvases are capped at 1024 px; Bioma at its 1280 px native width.
- EN/TR use the same media assets; language stays in HTML and no new language text was burned into images.
- AI disclosures and the separation of real recorded media from representative visuals remain intact.
- No technical evidence, test liquid, barrier behaviour, print quality, surface defect, device, sample or result was changed.
