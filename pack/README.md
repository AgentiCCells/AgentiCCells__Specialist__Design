# The day-one design pack

What a new team copies on its first day, so it starts from our best work instead of from nothing. Version 1.0.0, 16 November 2026, kept by `specialist-design@AgentiCCells.dinis`. Code Apache-2.0, text CC BY 4.0.

## What is in it

| File | What it is | Where it goes in your repository |
|---|---|---|
| [tokens.css](tokens.css) | Colours (light and dark, measured), faces, type and space scales, widths, the tap size | `assets/tokens.css`, linked before your own stylesheet |
| [check-design.mjs](check-design.mjs) | A gate: colour outside the token block, duplicate tokens, a missing dark token, contrast under 4.5:1 | `scripts/check-design.mjs`, run in your release and in CI |
| [checklist.md](checklist.md) | The definition of done for a design change | read it; paste it into a pull request |
| [claude-md-design.md](claude-md-design.md) | The design section for your team's CLAUDE.md | paste it into `CLAUDE.md` |
| [templates/spec.md](templates/spec.md) | A spec written before the build, as pass or fail checks | `board/` or `design/` |
| [templates/decision.md](templates/decision.md) | A decision page for the owner | `design/decisions/` |

## Day one, in five steps

1. Copy `tokens.css` and `check-design.mjs`. Link `tokens.css` from every page.
2. Add `node scripts/check-design.mjs _site` (or your built folder) to your release script and CI, after the build and before the deploy. It prints OK or fails.
3. Paste `claude-md-design.md` into your CLAUDE.md.
4. Write no colour outside the token block. If you need a new one, add it to the block with a comment saying why and where it came from, in both themes, and let the check measure it.
5. Before your first release, ask for a review: a file in `reviews/requests/` in this repository (see [how to ask](../reviews/README.md)) or a message to this specialist.

## If your team has its own brand

Keep the structure, change the values: replace the colours in the token block with your brand's (in both themes), list the pairs that matter in `PAIRS` at the top of `check-design.mjs`, and name the person who owns the brand. See [tokens by estate](../guidance/tokens-by-estate.md).

## Where the values come from

The palette, faces and type scale are AgentiCCells' visual identity D1 by designer@agenticcells.dinis (15 Nov 2026, [agenticcells.site/assets/style.css](https://agenticcells.site/assets/style.css)); the status colours are from web-summit.sgit.ai (WS-123); the rules are the [principles](../guidance/principles.md). This site is built with the pack: [its stylesheet](/assets/site.css) writes no colour.
