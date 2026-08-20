---
name: Initial build lessons
description: Durable compatibility notes from the first AgriMarket build.
---

- Keep OpenAPI numeric counters as `number` in this workspace's current generated Zod setup; `integer` currently produces unsupported `zod.int()` output.
- Any generated React Query hook requires the frontend's `QueryClientProvider`; the starter wrapper can be removed by visual work and should be restored before runtime checks.

**Why:** These issues caused runtime/typecheck failures during the first integration pass.

**How to apply:** When extending this app's API contract or reorganizing the root component, preserve these compatibility requirements.