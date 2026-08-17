import assert from "node:assert/strict";
import { stat } from "node:fs/promises";
import test from "node:test";

async function fetchRoute(path) {
  const workerUrl = new URL(`../dist/server/index.js?platform=${process.pid}-${Date.now()}-${encodeURIComponent(path)}`, import.meta.url);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("platform pages present the integrated bilingual pathway without unsupported claims", async () => {
  const en = await (await fetchRoute("/en/platform")).text();
  const tr = await (await fetchRoute("/tr/platform")).text();

  for (const discipline of ["Chemistry", "Paper science", "Coating", "Converting", "Validation", "Commercial requirements"])
    assert.match(en, new RegExp(`>${discipline}<`));
  for (const phase of ["DISCOVER", "DEVELOP", "SCALE"])
    assert.match(en, new RegExp(`>${phase}<`));
  for (const phase of ["KEŞFET", "GELİŞTİR", "ÖLÇEKLENDİR"])
    assert.match(tr, new RegExp(`>${phase}<`));

  for (const copy of [
    "Built by connected disciplines.",
    "No equipment capability or test result is implied beyond what is visibly documented.",
    "AI-generated; not evidence of a specific PTP project, test, facility or result.",
    "Bring the material challenge. Build the complete system.",
  ]) assert.ok(en.includes(copy), copy);

  for (const copy of [
    "Birbirine bağlı disiplinlerle geliştiriliyor.",
    "Görsel olarak belgelenmeyen cihaz kabiliyeti veya test sonucu ima edilmemektedir.",
    "Proje Başlat",
    "Teknolojileri İncele",
  ]) assert.ok(tr.includes(copy), copy);

  const order = ["platform-hero", "platform-fragmentation", "platform-system", "platform-story", "platform-people", "governance-editorial", "platform-phases", "material-outcomes", "platform-final-cta"];
  let previous = -1;
  for (const marker of order) {
    const current = en.indexOf(marker);
    assert.ok(current > previous, marker);
    previous = current;
  }

  assert.match(en, /aria-expanded="true"/);
  assert.match(en, /aria-controls="governance-en-panel-0"/);
  assert.match(en, /tabindex="0"/);
  assert.doesNotMatch(en, /autoplay/);
  assert.ok((await stat(new URL("../public/story/platform-people-collaboration-v2.webp", import.meta.url))).size > 40_000);
});
