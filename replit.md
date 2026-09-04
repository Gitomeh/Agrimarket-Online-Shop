# AgriMarket

AgriMarket connects buyers with local farmers for fresh produce, transparent market context, and direct farm-to-buyer workflows.

## Run & Operate

- `npm run dev --workspace=api-server` — run the API server (port 5000)
- `npm run typecheck` — full typecheck across all packages
- `npm run build` — typecheck + build all packages
- `npm run codegen --workspace=api-spec` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `npm run push --workspace=db` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- npm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/agri-market/src/App.tsx` — routed frontend and shared marketplace/dashboard surfaces
- `artifacts/agri-market/src/index.css` — AgriMarket theme tokens and typography
- `artifacts/api-server/src/routes/marketplace.ts` — typed demo marketplace API responses
- `lib/api-spec/openapi.yaml` — source-of-truth API contract
- `lib/api-client-react/src/generated/` — generated React Query client

## Architecture decisions

- The first release uses typed API-backed demo data with graceful client fallbacks so the product remains previewable before persistence/auth providers are connected.
- Cart state is intentionally client-local for the first release and is structured for later replacement by a server-backed cart service.
- Market price content is explicitly presented as sample/demo intelligence rather than live market data.

## Product

The app includes public marketplace discovery, product and farmer detail pages, market price intelligence, buyer cart/checkout/order flows, farmer dashboard/listing/analytics/messaging/assistant surfaces, and an admin overview.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the npm workspaces documentation for workspace structure, TypeScript setup, and package details
