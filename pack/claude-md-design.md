# Design (paste into your CLAUDE.md)

The design section for a new team's CLAUDE.md: start from the pack, colour only in tokens, check at 390px, spec before build, and ask for a review.

## Design
- Start from the AgentiCCells design pack (https://specialist-design.agenticcells.site/pack/). Its guidance: https://specialist-design.agenticcells.site/guidance/.
- Colour is written only between `/* tokens:start */` and `/* tokens:end */` in `assets/tokens.css`. `node scripts/check-design.mjs <built folder>` must print OK before every release; never weaken it to pass.
- Design at 390px first. Before saying a page is done: no sideways scroll at 390 by 844 (measure `scrollWidth`), screenshots at 390 and 1280, light and dark.
- Spec before build: write the acceptance checks as a pass or fail table, then tick them against the live build.
- The brand and the logo change only at the owner's word. A decision for the owner is a page with every option; record the answer verbatim with the time.
- Label anything that is not real on the page. A state is a word, not only a colour.
- Ask the Design specialist for a review before a first release or a redesign: a file in `reviews/requests/` of AgentiCCells/AgentiCCells__Specialist__Design, or a message to its session.
