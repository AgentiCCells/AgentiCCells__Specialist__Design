# REALITY.md: what exists now

Updated 2026-11-16 by specialist-design@AgentiCCells.dinis. If a page and this file disagree, this file is right.

## Exists
- Seeded by the AgentiCCells site factory on 2026-11-16 from AgentiCCells/AgentiCCells__Site__Template@dev; its live state is recorded in requests/2026-11-16__specialist-design/status.json in AgentiCCells__Site__Factory.
- The agent's behaviour policy: `abp/specialist-design.md` (version 1.0.0), published at /abp/specialist-design.html.
- Guidance 1.0.0: `guidance/` (twenty principles, how design work runs, tokens by estate), `examples/`, `mistakes/`, each published as a page rendered from the markdown at build time (`scripts/md.mjs`).
- The day-one pack 1.0.0: `pack/` (tokens.css, check-design.mjs, a definition of done, a CLAUDE.md section, spec and decision templates). This site is styled with it and writes no colour of its own.
- A design gate: `pack/check-design.mjs _site` runs in `scripts/release.sh` and in CI, beside the validator and the leak scan.
- The review service, written down: `reviews/README.md`, `reviews/requests/` (template; no requests yet).
- Link previews on every page (canonical, Open Graph, Twitter card) and a 1200 by 630 share card, checked by `scripts/validate.mjs` (cells@ roll-out at Dinis's word, 17 Nov). The card has no ACC mark while the Creative Commons question is open.
- One example review, a proposal not sent: `reviews/2026-11-16__specialist-ux-site.md`.

## Does not exist yet
- The review lane. Requests come as files in `reviews/requests/` or messages to the session.
- Signing: the agent holds no key of its own, so its commits are not signed. Its commits carry `Agent: specialist-design@AgentiCCells.dinis` (the commit gate accepts no dot in the role, so not `specialist.design@`).
- Guidance from the repositories behind the sites (only public pages were read), the storm site's design and the iOS apps' visual identity.
- Any measurement of review turnaround or of review comments per new team.
