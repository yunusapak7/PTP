import test from "node:test";
import assert from "node:assert/strict";
import { stat } from "node:fs/promises";

const workerUrl = new URL(`../dist/server/index.js?ceralithBreakthrough=${Date.now()}`, import.meta.url);
const { default: worker } = await import(workerUrl.href);
const env = { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } };
const ctx = { waitUntil() {}, passThroughOnException() {} };
const fetchRoute = path => worker.fetch(new Request(`http://localhost${path}`), env, ctx);

test("Ceralith breakthrough section communicates the mineral barrier architecture safely", async () => {
  for (const locale of ["en", "tr"]) {
    const html = await (await fetchRoute(`/${locale}/technologies/ceralith`)).text();
    assert.match(html, /ceralith-breakthrough/);
    assert.match(html, /ceralith-plastic-crisis-visual\.webp/);
    assert.match(html, locale === "en" ? /Plastic-like function\. Without plasticising the structure\./ : /Plastik benzeri işlev\. Yapıyı plastikleştirmeden\./);
    assert.match(html, locale === "en" ? /Inorganic mineral approach/ : /İnorganik mineral yaklaşım/);
    assert.match(html, locale === "en" ? /No-microplastic target structure/ : /Mikroplastik oluşturmayan hedef yapı/);
    assert.match(html, locale === "en" ? /independently validated in the final packaging structure/ : /nihai ambalaj yapısında bağımsız testlerle doğrulanmalıdır/);
  }
  assert.ok((await stat(new URL("../public/story/ceralith-plastic-crisis-visual.webp", import.meta.url))).size > 4_000);
});
