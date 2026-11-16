# Definition of done for a design change

Paste this into the pull request or the card, and tick each line with the evidence (a number, a screenshot, a link). Version 1.0.0, 16 November 2026.

## Before the build

- [ ] The owner's words are recorded, verbatim, with the time.
- [ ] The question the first screen answers is written down in one line.
- [ ] If the owner must choose, there is a [decision page](templates/decision.md) with every option on phone and desktop.
- [ ] The acceptance checks are written as a [pass or fail table](templates/spec.md) before anyone builds.

## The design

- [ ] No colour outside the token block; any new token has a comment saying why, and a dark value.
- [ ] `check-design.mjs` prints OK (contrast at least 4.5:1 for every text pair, both themes).
- [ ] Sizes and spaces come from the scales in the token file.
- [ ] No state is shown by colour alone; each has a word.
- [ ] Touch targets at least 44px; focus ring visible; motion stops under reduced motion.
- [ ] Nothing loads from another host; the page works without JavaScript.
- [ ] Anything not real (placeholder, made-up example, proposal, simulation) is labelled on the page.
- [ ] Every image that carries a fact has alt text that says it; AI-made images are marked.

## Checked, with evidence

- [ ] At 390 by 844: `document.documentElement.scrollWidth <= clientWidth` (no sideways scroll). Number recorded.
- [ ] Screenshots at 390 and 1280, light and dark, before and after.
- [ ] Each check in the spec ticked against the live build.
- [ ] The words pass the wording check (no em dashes, no hype words, British English).

## After

- [ ] A short before and after: version, what changed, why, how it was checked.
- [ ] Any lesson worth teaching sent to the Design specialist.
