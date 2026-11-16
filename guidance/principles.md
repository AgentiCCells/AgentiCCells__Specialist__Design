# Design principles

Twenty principles that our sites already follow at their best, each with where it comes from and an example you can open. Version 1.0.0, 16 November 2026. Kept by `specialist-design@AgentiCCells.dinis`; the person who owns the skill is Dinis Cruz.

How this was made: read-only reading of the public sites newsroom.sgit.ai, sgit.ai, promptugal.news, web-summit.sgit.ai, agenticcells.site and riskmandate.ai on 16 November 2026. Every principle names its source page. Where a principle is the specialist's own reading rather than a rule a team wrote down, it says so. The repositories behind these sites were not read in this first pass (see [what is not covered yet](README.md#what-is-not-covered-yet)).

## Colour and tokens

### 1. Colour is written in one token block, and a gate enforces it

Every colour lives between `/* tokens:start */` and `/* tokens:end */`. The release check fails on a colour code anywhere else.

- **Why:** one place to change, and themes become possible. Without the gate, colours drift back in: PrompTugal's brand audit found the old cobalt still in shipped CSS after the brand changed.
- **Source:** [web-summit.sgit.ai/assets/site.css](https://web-summit.sgit.ai/assets/site.css) (header); [newsroom.sgit.ai themes README](https://newsroom.sgit.ai/assets/themes/README.md); [promptugal.news/assets/tokens.css](https://promptugal.news/assets/tokens.css) ("every colour, face, size and space the site uses lives here, and nowhere else").
- **In the pack:** [tokens.css](../pack/tokens.css) and [check-design.mjs](../pack/check-design.mjs) (check 1).

### 2. Name a token for its job, not its hue, and set it in every theme

`--head`, not `--ink`; `--bad`, not `--red`. A theme that leaves a token out is a bug, and a test fails it.

- **Why:** the newsroom's deck viewer already used `--ink` for a dark bar; a near-white "ink" in a dark theme would have turned that bar white under white text.
- **Source:** [Dark mode, and four more](https://newsroom.sgit.ai/articles/dark-mode-and-four-more.html) (newsroom.ux, 13 Oct 2026); PrompTugal tokens.css ("the gate fails a theme that leaves one out").
- **In the pack:** check-design.mjs checks 2 and 3 (a token declared twice; a light token with no dark value).

### 3. Measure contrast and write the ratio down

Every text colour holds at least 4.5:1 (WCAG 2.2, 1.4.3) on the page and on panels, in every theme. The ratio sits in a comment beside the token, and a check measures it.

- **Source:** [agenticcells.site/assets/style.css](https://agenticcells.site/assets/style.css) ("measured"); PrompTugal tokens.css (`--brand` 6.5:1 in the comment); the newsroom's `test_themes.mjs` (contrast under 4.5:1 in any theme fails).
- **Example of it catching something:** PrompTugal imported an outside mock-up whose "THIS WEEK" strip was white on `#ff5a3c`, 3.1:1. Mapped to brand red, 5.6:1 ([spec-front-page-e](https://promptugal.news/board/spec-front-page-e.md)).

### 4. Tokens carry their origin

Each token or CSS block names the issue or decision that added it, and who.

- **Source:** web-summit.sgit.ai site.css (each token cites WS-103, WS-123...); agenticcells.site style.css (decisions D1 to D11, "reviewer@ 2026-11-16").
- **Why:** a later agent can tell a decision from an accident, and ask the right owner.

### 5. Colour never carries meaning alone, and never implies a judgement it does not have

A state is a word (and, where it helps, an icon) as well as a colour. Red and green are kept out where nothing is good or bad.

- **Source:** PrompTugal tokens.css ("signals never alone, always with a word"); newsroom [wires design note](https://newsroom.sgit.ai/admin/notes/wires-ux/design.md) (status colour with an icon and a word); PrompTugal [the design flip](https://promptugal.news/newsroom/design/decisions/the-design-flip/index.md): GAMMA-Ray chips fill by level in ink only, "red and green are kept out, because they would read as bad and good"; missing evidence is a dashed chip "not yet evidenced", never zero.

## Type and layout

### 6. Few faces, each with one job

System fonts by default, nothing loaded from another host. A brand that needs its own faces self-hosts a Latin subset, and gives each face a job: serif to read, sans for the interface, mono for dates and data.

- **Source:** agenticcells.site style.css ("system fonts only: nothing is loaded from another host"); PrompTugal brand v2.0 guide, p7 (Newsreader, IBM Plex Sans, IBM Plex Mono); [web-summit's copy of the PrompTugal brand](https://web-summit.sgit.ai/admin/brand/promptugal/index.html): Latin-subset WOFF2, about 270 KB for five faces, not the kit's 1.6 MB of TTF.

### 7. A fixed type scale and a fixed space scale

Use the sizes in the token file and no others.

- **Source:** agenticcells.site (a 1.25 ratio from 1rem); newsroom front page (12 to 42px, space 4 to 48px); the book site's tokens.css ("eight sizes, no others; 12px only for uppercase labels").
- **The specialist's reading:** where a team has no scale, sizes drift; sgit.ai's shared stylesheet writes sizes as literals and clusters around .64 to 1.12rem without a rule.

### 8. Phone first at 390px, and prove there is no sideways scroll

Design at 390px first. Before saying done, measure `scrollWidth` against `clientWidth` at 390 by 844, and screenshot at 1280 and 390, light and dark.

- **Source:** [sgit.ai designer role](https://sgit.ai/team/roles/designer.html); PrompTugal site.css header ("every rule below is for a 390px screen"); PrompTugal theme spec checks T1 to T8.
- **Why:** 57 newsroom article pages scrolled sideways on phones because byline chips had nowhere to wrap (release v0.13.59).

### 9. Breakpoints are measured, on more than one machine

- **Source:** newsroom release v0.12.13: the top bar fitted at 1200px locally and broke at 1200px on CI's wider Ubuntu fonts; the collapse moved to 1279 with slack, and a test now sweeps ten widths from 2000 to 360.

### 10. Prose keeps a readable line; tables, code and figures may use the width

- **Source:** [web-summit site review](https://web-summit.sgit.ai/site-review/index.html): inner pages were a 46rem column in a 72rem header, half the screen empty at 1440px while tables were cramped. Fix: an 82rem frame, prose capped at 50rem, tables and figures full width.

### 11. Rules, not boxes

Hairlines and a few strong rules separate things. A box is for something that floats, or for a notice. No boxes inside boxes.

- **Source:** PrompTugal design README and brand ("rules, not boxes: corners are barely there", 3px radius); [pt.newsroom design system](https://newsroom.sgit.ai/briefs/11__pt-newsroom-commissioning-brief.md) section 16 (no rounded cards, no shadows); [web-summit command centre](https://web-summit.sgit.ai/command-centre/index.html), 7 Nov ("sections are a title and a hairline instead of boxes inside boxes").

## What the reader sees first

### 12. The first screen answers one question, on a phone, in under ten seconds

Decide the question before the layout. Put the thing that answers it first; put the plumbing last.

- **Source:** [web-summit home (WS-103)](https://web-summit.sgit.ai/design/index.html): "what needs me, what is happening now, who is doing it", approved by Dinis on 2 Nov; newsroom [first-screen note](https://newsroom.sgit.ai/admin/notes/wires-ux/first-screen.md): "news first, record second, plumbing last" (the wire's lead story sat 9,000px down on a phone, under vault ids and fetch counts).
- **Example:** PrompTugal chose design E partly because it was among the few designs with a headline in the first phone screen, and took 5.3 phone screens against 13.8 ([the front-page pass](https://promptugal.news/board/passes/2026-11-06-the-front-page.md)).

### 13. Nothing moves while the reader reads

No layout shift as content loads, no jitter in live numbers, no floating control over the text.

- **Source:** [Scrolled is not read](https://newsroom.sgit.ai/articles/scrolled-is-not-read.html): the reading chip moved its left edge 20 times in 30 scroll steps; fixed-width boxes and tabular figures took it to 1. PrompTugal: floating Ask and design-picker buttons covered text on every phone screen until moved to a tab bar above the safe area.

### 14. Touch, focus and motion are designed, not left to defaults

Touch targets at least 44px (citation links at least 32px); a visible focus ring; motion stops under `prefers-reduced-motion`; tickers pause on hover and focus.

- **Source:** agenticcells.site style.css (`min-height: 2.75rem`; `.cite` 32px tap area); web-summit command centre (44px buttons); PrompTugal (yellow focus ring with an ink edge; the E ticker pauses and is static under reduced motion).

## Honesty

### 15. Say what is not real, on the page

Placeholders, made-up examples, proposals and simulations are labelled where the reader sees them. A thing that is not measured is shown as "not measured", never as zero. Live data says when it was read.

- **Source:** [hub.agenticcells.site](https://hub.agenticcells.site/) ("Made-up example" on each card); web-summit command centre ("shown as not measured, never as zero"; "LIVE, read hh:mm UTC"); newsroom [/shipped/](https://newsroom.sgit.ai/shipped/index.html) ("running is not designed").
- **And its limit:** a placeholder must not reach a finished live page (PrompTugal, the design flip, round 3 replaced invented cards with real ones).

### 16. A label only claims what is true for this item

- **Source:** PrompTugal spec E8: the "signed" pill only when the gate verified the signature; "checked" only with a verified block. PrompTugal's promise line "Every fact sourced and dated" read to a reporter as "every fact checked" and was rewritten as "Every fact links to its source, with the date we read it".

### 17. An image never carries a fact alone

Alt text says what the image says. AI-made images are marked, carry only the article's facts, and show no faces, logos or quotes. People are drawn round and agents square; no likeness is guessed.

- **Source:** newsroom wires design note; PrompTugal security conditions for infographics (six images, two first drafts rejected and remade); web-summit [cast](https://web-summit.sgit.ai/cast/index.html) ("people round, agents square, so the two read apart").

## How the page is built

### 18. Nothing from another site at run time, and it works without JavaScript

Self-host fonts, copy what you need into assets, load no third-party script. Menus on phones work with `<details>`. A page without JavaScript still shows its content.

- **Source:** agenticcells.site header (no-JS menu); PrompTugal spec E2 ("no request to web-summit.sgit.ai"); newsroom front page (no JS gives the Broadsheet view, tested); this repository's validator refuses third-party scripts and stylesheets.

### 19. Figures are data

A diagram or chart is drawn from a data file at build time, in SVG styled by tokens, so it follows the theme and cannot drift from the numbers.

- **Source:** web-summit cast (`data/cast.json` to inline SVG); agenticcells.site `.cell-fig` diagrams styled by token classes; [riskmandate.ai statics](https://riskmandate.ai/statics.html) ("so the posts can never drift from the demo").

### 20. Every page reads in three places

In a browser, as its `.md` twin, and (for SGit sites) inside a vault. Write the page so each reads as itself.

- **Source:** [sgit.ai designer role](https://sgit.ai/team/roles/designer.html); every newsroom page has a `.md` twin generated from the same content; riskmandate.ai the same ("Edit the page, not this file").

## Also read

- [How design work runs](process.md): directions, decision pages, spec before build, checks after.
- [Tokens by estate](tokens-by-estate.md): the token sets of each site, side by side.
- [Mistakes](../mistakes/README.md) and [examples](../examples/README.md).
