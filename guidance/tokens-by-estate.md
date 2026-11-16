# Tokens by estate

The core tokens of each of our sites, side by side, as read from their public stylesheets on 16 November 2026. Use the set for the estate you belong to; a new AgentiCCells team starts from the [pack](../pack/README.md), which uses the AgentiCCells set. Values change: check the source file before copying.

## The core colours (light theme)

| Job | AgentiCCells | SGit (sgit.ai, newsroom, web-summit) | PrompTugal brand v2.0 | RiskMandate |
|---|---|---|---|---|
| Page | `#ffffff` | `#faf9f5` | `#f6f3ec` | `#f7f6f2` |
| Text | `#16191d` | `#1c1d21` | `#121317` | `#1a1917` |
| Secondary text | `#4f5861` | `#5c5f66` | `#595c64` (site) | `#4a4845` |
| Accent | `#0a5c6b` deep teal | `#0f766e` teal | `#006600` green, `#c52830` red for the T only | `#1a7f5a` green |
| Hairline | `#d5dbdf` | `#e5e1d5` | `#d9d2c1` (site) | `#e2dfd8` |
| Dark theme | follows the system | web-summit follows the system; newsroom has five themes | five themes, ink is the dark one | none (light only) |
| Faces | system | system (newsroom front page: Newsreader, Archivo) | Newsreader, IBM Plex Sans, IBM Plex Mono, self-hosted | system; Geist for logo assets only |

## Sources

- **AgentiCCells:** [agenticcells.site/assets/style.css](https://agenticcells.site/assets/style.css), visual identity D1 by designer@agenticcells.dinis, 15 Nov 2026. Contrast measured in `map/design.md` in its repository (not read here).
- **SGit:** [sgit.ai/assets/site.css](https://sgit.ai/assets/site.css) (byte-identical to newsroom.css); [newsroom themes](https://newsroom.sgit.ai/assets/themes/themes.css) (Newsprint, Night, Paper, Blueprint, Ember); [web-summit.sgit.ai/assets/site.css](https://web-summit.sgit.ai/assets/site.css) (light and dark, status colours ok, warn, bad, wait, sent).
- **PrompTugal:** [brand v2.0 guide](https://promptugal.news/design/brand/Promptugal-Brand-Guide.pdf) and [promptugal.news/assets/tokens.css](https://promptugal.news/assets/tokens.css) (five themes: paper, ink, broadsheet, archive, azulejo). Design E's own tokens are in [front-e.css](https://promptugal.news/assets/front-e/front-e.css). The brand kit uses an 8px space unit and slightly different neutrals from the site's 4px base; the site kept its earlier neutrals when the accent changed (the specialist's reading).
- **RiskMandate:** [riskmandate.ai](https://riskmandate.ai/) (inline tokens) and [brand page](https://riskmandate.ai/brand.html); the console has its own system, [admin/console.css](https://riskmandate.ai/admin/console.css), with a four-rank status scale (needs the lead, waiting outside, open, done).

## When a team needs its own brand

A team with its own brand (PrompTugal, RiskMandate) keeps the same structure: one token block, every token set in every theme, ratios in comments, and the brand's owner as the only person who changes it. Copy the [pack's check](../pack/check-design.mjs) and list your own pairs in `PAIRS`.
