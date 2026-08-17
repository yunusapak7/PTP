import test from "node:test";
import assert from "node:assert/strict";
import { stat } from "node:fs/promises";

const workerUrl = new URL(`../dist/server/index.js?platformMaterial=${Date.now()}`, import.meta.url);
const { default: worker } = await import(workerUrl.href);
const env = { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } };
const ctx = { waitUntil() {}, passThroughOnException() {} };

test("platform coated-paper material sample uses the supplied popcorn-packaging image", async () => {
  for (const locale of ["en", "tr"]) {
    const html = await (await worker.fetch(new Request(`http://localhost/${locale}/platform`), env, ctx)).text();
    assert.match(html, /bioma-butter-coated-paper-sample\.webp/);
    assert.match(html, locale === "en" ? /Coated paper application/ : /Kaplanmış kâğıt uygulaması/);
    assert.match(html, locale === "en" ? /Material sample/ : /Malzeme numunesi/);
  }
  assert.ok((await stat(new URL("../public/story/bioma-butter-coated-paper-sample.webp", import.meta.url))).size > 4_000);
});
