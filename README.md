# PTP — Plastic-to-Paper Technology Platform

A production-oriented global website for PTP, built around technically precise claims, a structured technology portfolio and multiple industrial collaboration paths.

## Stack

- Vinext / Next.js-compatible App Router and React 19
- TypeScript and Tailwind CSS v4
- Cloudflare Worker-compatible output through Sites
- Local typed content with no CMS lock-in

## Structure

- `app/` — layouts, pages, route handlers and UI components
- `content/site.ts` — navigation, technologies, processes and insights
- `content/tr.ts` — reviewed Turkish page and long-form article content
- `content/contact.ts` — CMS-ready corporate email fields, hidden while empty
- `content/leadership.ts` — publication-approved leadership profile records
- `content/claims.ts` — typed claim approval registry
- `docs/source-notes.md` — source provenance, exclusions and verification needs
- `tests/` — rendered-route and form validation smoke tests

## Development

Use the package scripts supplied in `package.json`: `dev`, `build`, `lint` and `test`. The project is designed for the bundled Sites runtime.

## Environment

Copy `.env.example` to `.env.local`. Set `NEXT_PUBLIC_SITE_URL` to the production origin. Contact delivery uses the Resend API and requires `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` and `CONTACT_TO_EMAIL`. If they are absent, the API validates the enquiry but returns an honest configuration error and does not claim delivery.

Analytics is disabled by default. `NEXT_PUBLIC_ANALYTICS_PROVIDER` reserves a future privacy-conscious adapter; do not enable tracking without implementing the required consent mechanism.

## Editing content

Edit technologies, evidence, galleries, industrial parameters and English insight articles in `content/site.ts`; update the reviewed Turkish equivalents in `content/tr.ts`. Add a technology object and a corresponding route-specific page treatment before publishing. Insight articles use a reusable long-form editorial structure; future MDX can replace the local arrays without changing navigation.

Validation records should include application, technology, development stage, structure, demonstration context, method, result, validation status, date, source and publication approval. Gallery records require descriptive alt text and source metadata. Never publish a result or image without its context and approval.

## Claims approval

Every hard claim belongs in `content/claims.ts`. Only records with `publicApproved: true` may appear as facts. Keep internal estimates, confidential commercial discussions, future targets, development-stage performance and unverified awards out of public copy. Update `docs/source-notes.md` whenever new source material is approved.

## Internationalisation

English and Turkish content are mirrored under `/en` and `/tr` with locale-aware canonical and hreflang metadata. Update both locales together and keep brand spelling standardised as DTPaper®, Ceralith™ and Bioma-ORX®.

## Deployment

The repository includes `.openai/hosting.json` for deployment through Sites. Configure environment values in the hosting environment rather than committing secrets.
