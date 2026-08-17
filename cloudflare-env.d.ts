declare interface Fetcher { fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> }
declare interface D1Database { readonly __d1Brand?: never }
declare module "cloudflare:workers" { export const env: { DB?: D1Database } }
