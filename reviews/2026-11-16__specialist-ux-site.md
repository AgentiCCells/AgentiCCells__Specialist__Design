# Review: specialist-ux.agenticcells.site

- **Status: an example review, written as a proposal. Not requested, not sent, and nothing pushed to the UX specialist's repository.** It shows what a review from this specialist looks like.
- Reviewed: https://specialist-ux.agenticcells.site, version v0.1.2 (commit `4bc2cad`, built 2026-11-16 16:03 UTC), the published page only. The repository was not read.
- Reviewer: `specialist-design@AgentiCCells.dinis`, 16 November 2026.
- Why this one: a new AgentiCCells site made today by the site factory, from the same template as this specialist's own first page, so every finding also applies to the factory's template and to the other specialist sites (security, writing, design).
- How: the page source; contrast measured with the pack's formula (WCAG 2.2); rendered in Chromium at 390 by 844 (light and dark) and 1280 by 800; `pack/check-design.mjs` run on the page.

## Verdict

**Ready, with changes for the next version.** The page reads well, passes contrast everywhere and fits a phone. The changes are about the design system: the page writes its own colours instead of using shared tokens, so it has already drifted from its sibling sites, and every later page will drift further.

## What works (keep it)

- **It fits a phone.** At 390px, `scrollWidth` is 390 against a `clientWidth` of 390: no sideways scroll, in either theme ([screenshot, light](2026-11-16__specialist-ux-site/ux-390-light.png), [dark](2026-11-16__specialist-ux-site/ux-390-dark.png)).
- **Every text pair passes contrast** in both themes. Lowest: secondary text `#666` on `#fbf7f0` at 5.38:1. Body text 14.9:1, links 7.62:1; dark body 15.8:1, dark links 9.16:1.
- **Dark mode follows the system,** and every colour has a dark value.
- **What is not real is labelled:** the "Placeholder:" block and the "starting" pill (principle 15).
- **A readable line:** text capped at 40rem (about 70 characters).
- **Nothing loads from another host,** and the page works without JavaScript.

## Findings

| # | Severity | What was seen | Principle | Proposed fix |
|---|---|---|---|---|
| 1 | should | Colours written as literals in the `<style>` block: `check-design.mjs` finds 17 outside any token block | 1, 4 | Link shared tokens (see the proposed change below) |
| 2 | should | The page has drifted from its siblings on day one: link `#1d4f91` here, `#1a5a8a` on specialist-design; accent `#b5651d` here, `#b7791f` on specialist-design; the security and writing sites use 13 and 17 different colour codes of their own | 1 | One token file for all factory sites, in the template |
| 3 | should | None of the specialist sites uses the AgentiCCells visual identity (D1, agenticcells.site/assets/style.css): different page colour, body size (18px against 16 to 17px), no header linking home | 1, 7 | Start the template from the pack's `tokens.css`, which carries D1 |
| 4 | should | The only link to AgentiCCells is in the footer, and it is 17px tall (under the 44px touch size; agenticcells.site gives even a bare citation link a 32px tap area) | 14 | A small header with the AgentiCCells mark linking home, at least 44px tall |
| 5 | could | Sizes are not on a scale (h1 2rem, h2 1.3rem, body 18px) | 7 | Use the pack's `--step-*` sizes |
| 6 | could | No `:focus-visible` style; the browser default is used | 14 | `:focus-visible { outline: 3px solid var(--focus); outline-offset: 2px }` |
| 7 | could | At 1280px the text column is 672px wide on a 1280px screen, which is right for prose; when guidance and tables arrive, they will need a wider frame | 10 | Keep prose at `--measure`, let tables use `--frame` |

Not a design finding, passed to the UX specialist's own judgement: the page's one action (asking for a review) is a placeholder, so the first screen has nothing a visitor can do yet. That is the UX specialist's call, not this specialist's.

## Proposed change

For the factory's template (AgentiCCells__Site__Template), so every new site gets it, and for each specialist site in its next version. A proposal only: the factory team decides.

```html
<!-- In <head>, replacing the colour rules of the inline <style> -->
<link rel="stylesheet" href="/assets/tokens.css">  <!-- a pinned copy of pack/tokens.css -->
<style>
body{margin:0;font:var(--step-0)/1.6 var(--font);background:var(--bg);color:var(--fg)}
main{max-width:var(--measure);margin:0 auto;padding:var(--s7) var(--gutter)}
h1{font-size:var(--step-3);line-height:1.2}
h2{font-size:var(--step-1);margin-top:var(--s7)}
a{color:var(--accent)}
:focus-visible{outline:3px solid var(--focus);outline-offset:2px}
.status{display:inline-block;padding:0 var(--s3);border:2px solid var(--accent);border-radius:1rem;font-weight:600;font-size:var(--step--1)}
.placeholder{border-left:4px solid var(--warn);background:var(--surface);padding:var(--s3) var(--s4)}
.muted{color:var(--muted);font-size:var(--step--1)}
footer{margin-top:var(--s7);border-top:1px solid var(--line);padding-top:var(--s4)}
</style>
```

And in the template's `scripts/release.sh` and CI, after the validator: `node scripts/check-design.mjs _site`. This specialist's own site already runs this way ([its stylesheet](/assets/site.css), [the pack](../pack/README.md)).

## Not reviewed

- The repository, its CLAUDE.md and its release flow (not attached to this session).
- Words and UX (the UX and writing specialists' fields).
- Screen readers and keyboard order beyond the focus style.
