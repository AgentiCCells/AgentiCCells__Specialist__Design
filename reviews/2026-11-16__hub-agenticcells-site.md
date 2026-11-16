# Review: hub.agenticcells.site, home page

- **Requested by** cells@AgentiCCells.dinis, relaying Dinis Cruz's words (16 Nov 2026, about 21:30 UTC): "ok can you ask for some help from designer and branding agents to make this better. also I think the logo should be ACC with and the name at the top should capitalise using AgentiCCells.site". The message is cut off after "ACC with".
- **For** hub@AgentiCCells.dinis, who owns and releases the hub. This review is a proposal: nothing is pushed to the hub's repository.
- **Reviewed:** https://hub.agenticcells.site/, version v0.1.8, the home page "Find a cell", on 16 November 2026. The published page and its stylesheet only; the repository was not read.
- **Reviewer:** `specialist.design@AgentiCCells.dinis`.
- **How:** rendered in Chromium at 390 by 844, 1280 by 800 and 1440 by 900, light and dark; positions measured in the page. Screenshots before: [1280 light](2026-11-16__hub-agenticcells-site/before-1280-light.png), [390 dark](2026-11-16__hub-agenticcells-site/before-390-dark.png).
- **Logo and wordmark options:** [the options page](2026-11-16__hub-agenticcells-site/logo-options.html), with three SVG marks.

## Decision

> "I like" (Dinis Cruz, 16 Nov 2026, about 21:38 UTC by the relay's clock, relayed by cells@AgentiCCells.dinis)

Chosen: **wordmark B, "hub.AgentiCCells.site"**, with **mark 2, ACC with today's arcs**, as shown on the options page. This overrules the recommended wordmark (A); options A, 1 and 3 stay on the options page as the record. hub@AgentiCCells.dinis builds it.

Still open: the Creative Commons trademark question (researcher@ S4, designer@ D7), which the hub's stylesheet says must be answered before the letters are styled. The decision does not mention it; this specialist has raised it with Dinis again.

## Verdict

**Ready, with changes.** The base is sound: it uses the AgentiCCells palette (D1, contrast measured), fits a phone with no sideways scroll, gives every control a 44px height, and labels demos, proposals and tests honestly. What would make it better is hierarchy: on a laptop the first card's title sits below the fold, cards lead with their tags rather than their names, "Live" looks like "Demo", and the Proposed list repeats one sentence six times.

## What works (keep it)

- **Honest labels:** Demo, Live, Proposed and Test, each explained under "How to read this page"; made-up examples say so in their title.
- **Phone:** no sideways scroll at 390px (`scrollWidth` 390), a `<details>` menu that needs no JavaScript, search and selects 44px tall.
- **Accessible cards:** the screenshot link is `aria-hidden` with `tabindex="-1"`, so a keyboard or screen reader meets each card once, at its title; every screenshot has alt text with its width and date.
- **Palette and type:** D1 tokens in both themes, system fonts, a 1.25 type scale.

## Findings

| # | Severity | What was seen | Principle | Proposed change |
|---|---|---|---|---|
| 1 | should | At 1280 by 800 the first card starts at 494px and its title at about 720px: the first screen is header, title, intro, search, a "Filters" button and three selects. On wide screens the "Filters" button shows above filters that are already open | [12](../guidance/principles.md) (first screen answers one question) | From 44rem: search and the three selects on one row, search taking the spare width; hide the "Filters" toggle where the filters are always shown. Saves about 120px, enough to bring the first row of titles into the first screen at 800px tall (estimate) |
| 2 | should | Each card leads with two pills ("Site", "Demo"), then the title | 12 | Title first, then one muted line, "Site · Demo", then the description and address. The name is what a visitor scans for |
| 3 | should | "Live" is drawn like "Demo"; the only live cell (agenticcells.ai) does not stand out among seven demos | [5](../guidance/principles.md) (colour never alone) | A filled accent pill for Live, with the word; Demo, Proposed and Test stay outlined. Consider ordering Live first |
| 4 | should | The intro sentence runs about 1,050px wide at 1280 (about 130 characters a line) | [10](../guidance/principles.md) (a readable line) | Cap the intro at `--measure` (42rem); let the card grid use the full width |
| 5 | should | Screenshots of white sites sit on a white card with no edge (the agenticcells.site and hub cards in light mode) | 11 | A 1px `--line` border under each screenshot, or around it |
| 6 | should | "Proposed, not built yet" lists six specialists, each with the same text ("newsroom, Specialist agents for every team"); and two of them are not proposals any more: specialist-design and specialist-ux are live sites with addresses | [15, 16](../guidance/principles.md) (labels only claim what is true) | One row, "Six specialist agents (newsroom, Specialist agents for every team)", listing each by name and linking those that have a site; move design and UX to Demo once their owners agree (the registry is the hub team's call) |
| 7 | could | On a phone each card is about 405px tall; six cards are about six screens before Parts (page 5,329px) | 12 | Under 40rem, cards as rows: a 96px-wide screenshot on the left, title and status on the right. Roughly halves the cards' height (estimate, not measured) |
| 8 | could | In dark mode the screenshots are the brightest things on the page | 13 | `@media (prefers-color-scheme: dark) { .preview img { filter: brightness(.9) } }`, or leave as is: the screenshots are true to the sites |
| 9 | could | The footer contact is an address on another company's domain, under the AgentiCCells name | 16 | The owner's call; if it is deliberate, say why in one line |

## Logo: "ACC with ..."

Dinis's words stop at "ACC with", so here are three readings, drawn as strokes in the weight of today's mark, in `currentColor` so they follow the theme ([options page](2026-11-16__hub-agenticcells-site/logo-options.html)):

1. **ACC, three letters** ([acc-letters.svg](2026-11-16__hub-agenticcells-site/acc-letters.svg)): plain and readable; loses today's overlap.
2. **ACC with today's arcs** ([acc-arcs.svg](2026-11-16__hub-agenticcells-site/acc-arcs.svg)), **recommended:** an A in front of the two open arcs of designer@'s mark (D1), the first one faded. The arcs are spaced further apart than today: drawn at today's spacing (about 4 units apart, the first at 45%), they merge into one C at header size and the mark reads "AC". Checked by rendering.
3. **ACC tile** ([acc-tile.svg](2026-11-16__hub-agenticcells-site/acc-tile.svg)): the letters on an accent square, for the favicon and app icons, the most legible of the three at 16px (at that size it is a shape more than letters). Its colours switch with the system theme.

**Before any of these ships, one question for Dinis.** The hub's own stylesheet says: "a plain wordmark: no special styling of the letters until the Creative Commons trademark question (researcher@ S4, designer@ D7) is answered". A mark built from two Cs is that question. The options avoid the obvious clash (no Cs inside a circle, which is the Creative Commons symbol), but whether "CC" may be styled at all is for Dinis, with researcher@ and designer@, not for this specialist.

## Wordmark: "AgentiCCells.site"

The header today says "AgentiCCells hub". Two places for "hub":

- **A. "AgentiCCells.site" with a "hub" label beside it (recommended).** The family name reads the same on every .site page; the label names the section and can say "factory" or "template" on other sites.
- **B. "hub.AgentiCCells.site",** the address exactly, with "hub." in the muted colour. Longer: at 390px it fills most of the row beside the Menu button.

Capitals in the text are not styling of the letters, so this part does not wait on the trademark question.

## Proposed code

The header, option 2 and wordmark A (CSS uses the hub's own tokens):

```html
<a class="brand" href="/">
  <svg class="mark" viewBox="0 0 53 32" width="46" height="28" aria-hidden="true" focusable="false"><g fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 26 L11 6 L18.5 26 M6.4 19.5 H15.6"/><path d="M35.5 6.5 A10.5 10.5 0 1 0 35.5 25.5" opacity=".6"/><path d="M48.25 9.5 A10.5 10.5 0 1 0 48.25 22.5"/></g></svg>
  <span>AgentiCCells.site</span><span class="section">hub</span>
</a>
```

```css
.brand .section { font-size: .875rem; font-weight: 600; color: var(--muted); border: 1px solid var(--line); border-radius: 1rem; padding: 0 .5rem; }
/* Finding 1: one filter row on wide screens. */
@media (min-width: 44rem) {
  .filters { display: flex; flex-wrap: wrap; gap: .75rem; align-items: end; }
  .filters .f-q { flex: 1 1 16rem; }
  .filters-toggle { display: none; }
}
/* Finding 3: Live stands out. */
.pill.live { background: var(--accent); color: var(--on-accent); border-color: var(--accent); }
```

The class names `.filters`, `.filters-toggle` and `.pill.live` are guesses at the hub's markup; the hub team knows the real ones.

The favicon: `<link rel="icon" href="/assets/acc-tile.svg" type="image/svg+xml">`.

## Not reviewed

- The cell pages, "Find and copy" and the registry files.
- The words (the writing specialist's field) and the flow of finding and copying a cell (the UX specialist's).
- Screen reader testing beyond the card structure.
