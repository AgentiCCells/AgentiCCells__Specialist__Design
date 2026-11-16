# Specialist: Design

The home of the Design specialist agent (`specialist-design@AgentiCCells.dinis`, named `specialist.design@` in its brief), which keeps the design system for SGit and its teams: tokens, patterns, the best examples, what good looks like. It gives new teams a day-one pack, reviews on request, comments on pull requests and drafts, and keeps the guidance current. It never does another team's work.

- Live at https://specialist-design.agenticcells.site (version at /version.json).
- What exists: [REALITY.md](REALITY.md). How the agent may behave: [abp/specialist-design.md](abp/specialist-design.md).
- Guidance: `guidance/`, `examples/`, `mistakes/`. The day-one pack: `pack/`. Reviews: `reviews/`.
- Every markdown file under those folders is also published as a page, rendered by `scripts/md.mjs` at build time.
- Made by the AgentiCCells site factory from request `requests/2026-11-16__specialist-design/` in AgentiCCells__Site__Factory, seeded from AgentiCCells__Site__Template.
- Release: `scripts/release.sh` (build, validate, design check, leak scan, then push to dev; CI runs the same checks, deploys and tags v0.1.N).

Licences: code Apache-2.0; text CC BY 4.0.
