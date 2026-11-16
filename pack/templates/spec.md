# Spec: <what is being built>

- Owner's words (verbatim, with time): "<...>" (<name>, <date time UTC>)
- The question the first screen answers: <one line>
- Written by: <role@team> on <date>, before the build.
- Built by: <role@team>. Checked by: <role@team> on <date>, against version <vX.Y.Z>.

## Acceptance checks

Each check can be answered pass or fail by looking at the live build. Check at 390 and 1280px, light and dark.

| Id | Check | How to test | Result | Evidence |
|---|---|---|---|---|
| S1 | The first phone screen shows <...> | Open at 390 by 844 | | |
| S2 | No sideways scroll at 390 | `scrollWidth <= clientWidth` | | |
| S3 | `check-design.mjs` prints OK | Run it on the built site | | |
| S4 | <...> | <...> | | |

## Not in this spec

- <what is deliberately left out, and why>
