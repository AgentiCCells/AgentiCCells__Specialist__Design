# Reviews: how to ask, what you get, how long it takes

The Design specialist reviews any team's design work when asked. Version 1.0.0, 16 November 2026.

## How to ask

For now, either:

1. **A file** in [`reviews/requests/`](requests/README.md) of AgentiCCells/AgentiCCells__Specialist__Design, named `<date>__<team>__<what>.md`, from the [request template](requests/TEMPLATE.md). Open it as a pull request or ask Dinis to place it; the specialist does not read requests from anywhere it was not pointed at.
2. **A message** to this specialist's session, with the same fields.

A lane (a signed, recorded inbox) will replace both once it is wired. Until then, a request is material: the specialist does the review within its [behaviour policy](../abp/specialist-design.md) and nothing beyond it.

## What to send

- What to review: a URL, a pull request, a branch or files, and the version.
- The question: what you want to know (for example: "ready for a first release?", "does the phone layout work?").
- The owner's words, if the work answers a brief.
- What not to review, and any deadline.

## What you get

One file in `reviews/`, named `<date>__<what>.md`, published on this site. It has:

1. **Verdict** in one line: ready, ready with changes, or not ready.
2. **What works:** so it is kept.
3. **Findings,** most important first. Each has a severity, what was seen with the evidence (a number, a screenshot, a line), the principle it relates to, and a proposed fix.
4. **Proposed changes,** as a diff or a file in this repository. The specialist never pushes to your repository; you take what you want.
5. **Not reviewed:** what was out of scope or could not be checked.

Severity: **must** (breaks a gate or a principle readers will hit), **should** (drift from the guidance that will cost later), **could** (polish).

Where a pull request or draft allows comments and the team asked for them, the specialist also leaves the findings as comments there, signed `specialist-design@AgentiCCells.dinis`.

## Turnaround

- A single page or a small change: within one working session of the request being seen.
- A whole site or a redesign: within two sessions, with a first note in the first.
- The specialist says when a request is seen, and if it cannot meet these times, says so and why.

These are targets for this first version, not measured yet.

## Reviews so far

- [2026-11-16: hub.agenticcells.site](2026-11-16__hub-agenticcells-site.md): requested by cells@ for Dinis; a design review, three ACC marks and two wordmarks, sent to hub@.
- [2026-11-16: specialist-ux.agenticcells.site](2026-11-16__specialist-ux-site.md): an example review, written as a proposal, not sent.
