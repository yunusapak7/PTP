import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

async function fetchHome(locale) {
  const path = `/${locale}`;
  const workerUrl = new URL(`../dist/server/index.js?home=${process.pid}-${Date.now()}-${locale}`, import.meta.url);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("English homepage follows the requested eight-part narrative", async () => {
  const response = await fetchHome("en");
  assert.equal(response.status, 200);
  const html = await response.text();
  const sequence = [
    'class="hero ',
    "home-technologies",
    "home-demonstrations",
    "home-lab-scale",
    "home-integration",
    "home-global",
    "home-recognition",
    "home-final-cta",
  ];
  let previous = -1;
  for (const marker of sequence) {
    const current = html.indexOf(marker);
    assert.ok(current > previous, marker);
    previous = current;
  }
  assert.match(html, /From Plastic Dependence/);
  assert.match(html, /to Scalable Paper Technologies/);
  assert.match(html, /PLASTIC.*CHEMISTRY.*PAPER.*COATING.*VALIDATION.*SCALE/s);
  assert.match(html, /Bring Us a Challenge/);
});

test("Turkish homepage mirrors the English structure and calls to action", async () => {
  const response = await fetchHome("tr");
  assert.equal(response.status, 200);
  const html = await response.text();
  for (const copy of [
    "Plastik Bağımlılığından",
    "Ölçeklenebilir Kâğıt Teknolojilerine",
    "Teknolojileri İncele",
    "Malzeme Probleminizi Getirin",
    "Laboratuvar kimyasından endüstriyel gerçekliğe",
    "Gerçek prosesler. Kaydedilmiş uygulama bağlamı",
    "Teknoloji, entegrasyonun kendisidir",
    "Proje Başlat",
  ]) assert.match(html, new RegExp(copy));
  assert.match(html, /PLASTİK.*KİMYA.*KÂĞIT.*KAPLAMA.*VALİDASYON.*ÖLÇEK/s);
  assert.match(html, /href="\/tr"[^>]+hreflang="tr"/i);
});

test("homepage media remains traceable without embedding demonstrations", async () => {
  const html = await (await fetchHome("en")).text();
  assert.match(html, /data-media-slot="home-hero-visual"/);
  assert.doesNotMatch(html, /<video/);
  assert.doesNotMatch(html, /Watch Demonstration|Evidence context|Technology in Motion/);
  assert.equal((html.match(/Development stage/g) || []).length, 3);
  assert.equal((html.match(/AI-generated representative image/g) || []).length, 1);
  assert.match(html, /home-hero-plastic-crisis-v4\.webp/);
  assert.match(html, /canapa-innovation-center\.webp/);
  assert.ok(html.includes("DTPaper and Bioma-ORX use authentic application/test photographs supplied by Canapa"));
  for (const href of [
    "/en/technologies/dtpaper#recorded-demonstration",
    "/en/technologies/ceralith#recorded-demonstration",
    "/en/technologies/bioma-orx#recorded-demonstration",
  ]) assert.match(html, new RegExp(href));
  for (const poster of ["dtpaper-workflow-poster", "ceralith-ovenable-demo-poster", "bioma-oil-barrier-occ-poster"]) assert.doesNotMatch(html, new RegExp(poster));
  assert.match(html, /not a direct PTP award/);
  for (const fact of ["WTiN Innovate Textile Awards", "Winner of Sustainability", "5 December 2025"]) assert.match(html, new RegExp(fact));
});

test("homepage removes the former repeated presentation sections", async () => {
  const html = await (await fetchHome("en")).text();
  for (const removed of ["Why PTP exists", "The Missing Link Is Manufacturing Integration", "Platform ecosystem", "Targeted innovation areas", "Three transitions. Three industrial pathways"]) assert.doesNotMatch(html, new RegExp(removed));
  assert.equal((html.match(/Developed and industrialised in Türkiye/g) || []).length, 1);
  assert.equal((html.match(/Integration is the technology/g) || []).length, 1);
});

test("homepage palette, responsive rules and generated preview asset are present", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  for (const colour of ["#F7F8F4", "#FFFFFF", "#EEF4EF", "#E9EEEC", "#0B372F", "#062A24", "#82E64D", "#45C7C2", "#D8AD59", "#15231F", "#52605B"]) assert.match(css, new RegExp(colour, "i"));
  assert.match(css, /@media\(max-width:1050px\)/);
  assert.match(css, /@media\(max-width:700px\)/);
  assert.match(css, /prefers-reduced-motion:reduce/);
  const preview = await stat(new URL("../public/og-home-v2.png", import.meta.url));
  assert.ok(preview.size > 1_000_000);
  const layout = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");
  assert.match(layout, /og-home-v2\.png/);
});
