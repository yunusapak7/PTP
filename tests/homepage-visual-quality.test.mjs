import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

async function fetchHome(locale) {
  const workerUrl = new URL(`../dist/server/index.js?visuals=${process.pid}-${Date.now()}-${locale}`, import.meta.url);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost/${locale}`, { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}

function visualNames(html) {
  return [...new Set([...html.matchAll(/home-(?:hero|dtpaper|ceralith|bioma|integration|process)-[a-z-]+-v[34]\.webp/g)].map(match => match[0]))].sort();
}

test("homepage uses one coherent high-resolution visual system in English and Turkish", async () => {
  const [en, tr] = await Promise.all([(await fetchHome("en")).text(), (await fetchHome("tr")).text()]);
  assert.deepEqual(visualNames(en), visualNames(tr));
  assert.equal(visualNames(en).length, 2);
  assert.equal((en.match(/AI-generated representative image/g) || []).length, 1);
  for (const image of ["home-material-challenge-analysis.webp","home-chemistry-substrate-samples.webp","home-coating-application-pilot.webp","home-substrate-paper-roll.webp","home-validation-otr.webp"]) assert.match(en, new RegExp(image.replaceAll(".", "\\.")));
  assert.equal((tr.match(/Yapay zekâyla oluşturulmuş temsili görsel/g) || []).length, 1);
  assert.match(en, /home-hero-plastic-crisis-v4\.webp/);
  assert.match(en, /canapa-innovation-center\.webp/);
  assert.match(tr, /home-hero-plastic-crisis-v4\.webp/);
  assert.equal((en.match(/class="home-hero-visual"/g) || []).length, 1);
  assert.doesNotMatch(en, /hero-collage/);
});

test("recorded frames and source-uncertain application shots are absent outside the video area", async () => {
  const html = await (await fetchHome("en")).text();
  for (const removed of [
    "dtpaper-step-powder.webp",
    "dtpaper-step-print.webp",
    "dtpaper-step-cure.webp",
    "dtpaper-step-transfer.webp",
    "dtpaper-step-textile.webp",
    "ceralith-bakery-frame.webp",
    "ceralith-exposure-frame.webp",
    "ceralith-prepared-food.webp",
    "ceralith-ovenable-tray.webp",
    "bioma-bakery-bag.webp",
    "bioma-butter-wrap.webp",
    "bioma-fast-food-wrap.webp",
  ]) assert.doesNotMatch(html, new RegExp(removed.replaceAll(".", "\\.")), removed);
  for (const poster of ["dtpaper-workflow-poster", "ceralith-ovenable-demo-poster", "bioma-oil-barrier-occ-poster"]) assert.doesNotMatch(html, new RegExp(poster));
  assert.equal((html.match(/aria-label="Watch Demonstration:/g) || []).length, 0);
  assert.doesNotMatch(html, /<video|technology-motion|media-modal/);
});

test("inventory records purpose, provenance, licence, evidence role, crop, dimensions, and usage", async () => {
  const source = await readFile(new URL("../content/home-visuals.ts", import.meta.url), "utf8");
  for (const field of ["sourceClass", "licenceStatus", "requiresExternalLicenceVerification", "evidenceRole", "purpose", "crop", "usage", "width", "height"]) assert.match(source, new RegExp(field));
  for (const label of ["Recorded process", "Recorded demonstration", "Representative application", "Supplied R&D photography", "Licensed photography", "AI-generated representative image"]) assert.match(source, new RegExp(label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  for (const file of [
    "home-hero-plastic-crisis-v4.webp",
    "home-dtpaper-representative-v3.webp",
    "home-ceralith-representative-v3.webp",
    "home-bioma-representative-v3.webp",
    "home-integration-representative-v3.webp",
    "home-process-material-challenge-v4.webp",
    "home-process-chemistry-substrate-v4.webp",
    "home-process-coating-application-v4.webp",
    "home-process-validation-v4.webp",
    "home-process-industrial-scale-v4.webp",
  ]) assert.ok((await stat(new URL(`../public/home-visuals/${file}`, import.meta.url))).size > 10_000, file);
});

test("homepage links to three recorded demonstrations and retains one primary certificate", async () => {
  const html = await (await fetchHome("en")).text();
  for (const slug of ["dtpaper", "ceralith", "bioma-orx"]) assert.match(html, new RegExp(`/en/technologies/${slug}#recorded-demonstration`));
  assert.match(html, /Real processes\. Recorded application context\./);
  assert.equal((html.match(/canapa-award-certificate-2025\.webp/g) || []).length, 1);
  assert.equal((html.match(/Verified primary record/g) || []).length, 1);
  assert.doesNotMatch(html, /<video/);
});

test("media shells reserve layout space and provide neutral loading and error states", async () => {
  const components = await readFile(new URL("../app/components.tsx", import.meta.url), "utf8");
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(components, /placeholder="blur"/);
  assert.match(components, /onError=\{\(\)=>setFailed\(true\)\}/);
  assert.match(components, /home-image-fallback/);
  assert.match(css, /\.home-image-fallback\{[^}]*#E7ECE9/);
  assert.match(css, /home-recognition-image\{[^}]*aspect-ratio/);
  assert.match(css, /home-tech-card\{[^}]*min-height:320px/);
  assert.match(css, /home-demonstrations\{[^}]*min-height:238px/);
});
