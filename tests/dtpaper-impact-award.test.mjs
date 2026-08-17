import test from "node:test";
import assert from "node:assert/strict";
import { stat } from "node:fs/promises";

const workerUrl = new URL(`../dist/server/index.js?dtpaperImpact=${Date.now()}`, import.meta.url);
const { default: worker } = await import(workerUrl.href);
const env = { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } };
const ctx = { waitUntil() {}, passThroughOnException() {} };
const fetchRoute = path => worker.fetch(new Request(`http://localhost${path}`), env, ctx);

test("DTPaper impact section connects the plastic challenge with the WTiN recognition", async () => {
  for (const locale of ["en", "tr"]) {
    const html = await (await fetchRoute(`/${locale}/technologies/dtpaper`)).text();
    assert.match(html, /dtpaper-impact-award/);
    assert.match(html, /dtpaper-plastic-impact-visual\.webp/);
    assert.match(html, /canapa-award-certificate-2025\.webp/);
    assert.match(html, locale === "en" ? /Approximately 200 tonnes/ : /Yaklaşık 200 ton/);
    assert.match(html, locale === "en" ? /WTiN Winner of Sustainability/ : /WTiN Sürdürülebilirlik Kazananı/);
    assert.match(html, locale === "en" ? /company-stated, volume-dependent technology target/ : /Canapa tarafından belirtilen hacme bağlı teknoloji hedefidir/);
  }
  assert.ok((await stat(new URL("../public/story/dtpaper-plastic-impact-visual.webp", import.meta.url))).size > 4_000);
});
