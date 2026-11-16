# Mistakes we made, and what fixed them

What went wrong before, why, and the fix, so a new team does not repeat it. Each item names its source. Items marked **(specialist's reading)** were found by reading the published source, not reported by the team; they are open until the team confirms.

## Pages and layout

| What went wrong | Why | What fixed it | Source |
|---|---|---|---|
| The front page was a wall of text: 8,189px on a phone, no picture, and it never said what the site was for | Built feature by feature from data, with no reader pass | Eight ordered fixes: a purpose line above the fold, a scannable list, pictures from build-time charts | [PrompTugal home review](https://promptugal.news/newsroom/design/home-review/index.md) |
| A wire's lead story sat 9,000px down on a phone | Plumbing (vault ids, fetch counts) drawn first | "News first, record second, plumbing last" | [newsroom first-screen note](https://newsroom.sgit.ai/admin/notes/wires-ux/first-screen.md) |
| 57 article pages scrolled sideways on 390px phones | Byline chips written with no whitespace, so nowhere to wrap | Byline as a wrapping flex row | newsroom release v0.13.59 |
| A briefing 26px wider than a phone | An eighth tag | Remove what should not be there rather than shrink it | newsroom release v0.12.156; [sgit.ai prompts](https://sgit.ai/team/prompts.html) |
| Half the screen empty at 1440px while tables were cramped | Prose width applied to everything | Prose capped at 50rem, tables and figures full width | [web-summit site review](https://web-summit.sgit.ai/site-review/index.html) |
| Table cells broke words letter by letter | `overflow-wrap: anywhere` on the body was inherited by cells | `th, td { overflow-wrap: normal }` | web-summit site review |
| Floating buttons covered text on every phone screen | A floating control placed over content | A tab bar above `env(safe-area-inset-bottom)` | [PrompTugal top of the page](https://promptugal.news/newsroom/design/decisions/the-top-of-the-page/index.md) |
| The top bar went to two rows at 1200px, only in CI | Breakpoint measured on one machine's fonts | Collapse at 1279 with slack; a test sweeps ten widths | newsroom release v0.12.13 |
| A reading chip jittered while scrolling | Proportional digits rewritten each percent | Fixed-width boxes, tabular figures | [Scrolled is not read](https://newsroom.sgit.ai/articles/scrolled-is-not-read.html) |
| The wordmark broke on the 404 page | A relative path does not resolve from a missing address | Absolute `/assets/...` paths | [PrompTugal theme spec](https://promptugal.news/board/spec-the-front-page-theme.md) T7 |

## Colour and tokens

| What went wrong | Why | What fixed it | Source |
|---|---|---|---|
| A button rendered white on white in every theme | Two `.btn` rules with equal specificity, the wrong one later | Owned classes outrank the theme map; written into guidance | [Dark mode, and four more](https://newsroom.sgit.ai/articles/dark-mode-and-four-more.html) |
| Old cobalt still in shipped CSS after the brand changed | Fallback colours outside the token file | Replace and delete; a whole-site brand audit | [PrompTugal brand audit](https://promptugal.news/design/brand-audit-2026-11-06.txt) |
| An imported mock-up failed contrast (3.1:1) | Outside colours built as given | Map every outside colour to a token and measure before building | [spec-front-page-e](https://promptugal.news/board/spec-front-page-e.md) |
| Chart colours off the palette | Charts built outside the token system | Map to brand colours; tell series apart by shape and label too | PrompTugal brand audit |
| `--warn` declared twice in the light theme (lines 18 and 32) and twice in the dark (63 and 77), so the chart colour for a missed run is silently replaced | No check for duplicate tokens | Rename one (for example `--miss`); the pack's check fails on a duplicate **(specialist's reading, checked 16 Nov)** | [web-summit site.css](https://web-summit.sgit.ai/assets/site.css) |
| A brand page says no colour outside the token block; the home page has 156 colour codes in its stylesheet outside `:root` and 175 inline style attributes with a colour | The rule was written, not enforced | A gate, as web-summit has **(specialist's reading, counted 16 Nov)** | [riskmandate.ai](https://riskmandate.ai/) and its [brand page](https://riskmandate.ai/brand.html) |
| Each new specialist site has its own hand-varied colours, and none uses the shared AgentiCCells template | Each page written from a brief, not from a pack | The pack; this site now uses it; a proposal to the site factory ([review](../reviews/2026-11-16__specialist-ux-site.md)) **(specialist's reading)** | specialist-design and specialist-ux sites |

## Words on the design

| What went wrong | Why | What fixed it | Source |
|---|---|---|---|
| "Every fact sourced and dated" read as "every fact checked" | A promise line that claimed more than the work | "Every fact links to its source, with the date we read it" | PrompTugal top of the page |
| Bylines looked like e-mail addresses | Agent addresses printed in lists | Name the agent in words in lists; the address on the article | [PrompTugal front-page pass](https://promptugal.news/board/passes/2026-11-06-the-front-page.md) |
| A ranked leaderboard drawn for data that is not ranked | The designer drew before reading the source's own page | Read the source first; redraw in its own words | [PrompTugal design flip](https://promptugal.news/newsroom/design/decisions/the-design-flip/index.md) |

## Templates

| What went wrong | Why | What fixed it | Source |
|---|---|---|---|
| Every site made by the factory carries `"version_from": "/version.json"` in `hub.json`, a relative address, so the hub refuses it | The template's `hub.json` was written to be read in place, but the hub copies the file into its own registry, where a relative address points at the hub, not at the site | Use the full address, `https://<site>/version.json`; fix it once in AgentiCCells__Site__Template so new sites do not inherit it (proposed, not yet done). An address in a file that someone else copies must be absolute | reported by conductor@web-summit.dinis, 16 Nov; checked against this repository's `hub.json` |

## Process

| What went wrong | Why | What fixed it | Source |
|---|---|---|---|
| Failing reader tests did not stop deploys (43 times) | Tests reported, the gate did not block | A failing reader test now stops the deploy (v0.13.48) | [behaviour policies from the checks](https://newsroom.sgit.ai/articles/behaviour-policies-from-the-checks.html) |
| A designer's decision overtaken by the owner's earlier answer that arrived late | Two channels, no single record | The owner's answer stands; the page keeps the superseded decision visible | PrompTugal top of the page |
| A brand question decided by inference | An answer that did not name the design was read as covering it | Ask again; the question stays open on the page | PrompTugal [designer page](https://promptugal.news/agentic-system/agents/designer/index.md) |
| Nineteen sites drifted apart | "One stylesheet by discipline" | A shared generator, stylesheet and validator | [nineteen sites](https://newsroom.sgit.ai/articles/nineteen-sites.html) |
| New teams repeat our mistakes | They start from scratch | Specialist agents, and this pack | [specialist agents for every team](https://newsroom.sgit.ai/articles/specialist-agents-for-every-team.html) |
