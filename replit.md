# SafeLy

An AI-powered scam awareness platform that trains users to identify and avoid online scams through keyword analysis, simulations, and progress tracking.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port from `$PORT`)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- Required env: `PORT` — assigned automatically by the workflow

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5 + pino logger
- Validation: Zod (`zod/v4`)
- Build: esbuild (ESM bundle)
- No database yet — mock data in `src/data/mockData.ts`

## Where things live

- `artifacts/api-server/src/routes/` — route handlers (health, analyze, chat, dashboard)
- `artifacts/api-server/src/utils/scamDetector.ts` — keyword-based scam analysis engine
- `artifacts/api-server/src/data/mockData.ts` — mock user progress data
- `lib/api-spec/openapi.yaml` — OpenAPI contract (source of truth for codegen)

## Architecture decisions

- All routes mounted under `/api` prefix; the shared reverse proxy forwards `/api` traffic to this service
- Scam detector uses a weighted keyword system — each keyword has a risk weight, total weight determines risk level
- Mock data in a dedicated `data/` folder so it's easy to swap in a real DB later
- No auth yet — all endpoints are public for hackathon demo stability
- TypeScript `.js` extensions used in imports (required for ESM + esbuild)

## Product

- `GET /api/healthz` — server health check
- `POST /api/analyze` — evaluate a user's choice during a phishing simulation (`click` / `ignore` / `report`)
- `POST /api/chat` — analyze any suspicious message text for scam keywords
- `GET /api/dashboard` — return mock user learning progress, badges, and scores

## Gotchas

- Use `localhost:80/api/...` for curl testing (shared proxy), never the raw service port
- Import paths inside `src/` must use `.js` extensions even though files are `.ts` (ESM + esbuild requirement)
- Run `pnpm --filter @workspace/api-spec run codegen` after any OpenAPI spec change before using new types

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
