# How design work runs

The way our best teams take a design from an idea to a release. Version 1.0.0, 16 November 2026. Each step names the team that does it today.

## 1. The owner's words come first, with the time

Every design change starts from the words of the person who asked, kept verbatim with the time they were given: a card, a guidance file or a brief.

- **Source:** newsroom engineering cards (Source, then Given/When/Then, then Outcome), for example card 036 on themes ([Dark mode, and four more](https://newsroom.sgit.ai/articles/dark-mode-and-four-more.html)); PrompTugal `board/guidance/<date>-<slug>.md` ([decisions as pages](https://promptugal.news/board/guidance/2026-11-06-decisions-as-pages.md)).

## 2. Draw several directions, choose one, keep the rest

Draw two to four directions before porting any layout. The owner chooses. The directions not chosen are kept, with what each did well and badly, so the choice can be read again later.

- **Source:** [pt.newsroom directions](https://newsroom.sgit.ai/pt-newsroom/directions.html) (four directions, three kept and not to be built); [riskmandate.ai design options](https://riskmandate.ai/design-options.html) (eight logo concepts, with the case against the winner: "design decisions age badly when only the winner survives").
- **Try it in a lab, not in the product:** "a lab is the cheapest place to be wrong" ([the lab that redesigned the book](https://newsroom.sgit.ai/articles/the-lab-that-redesigned-the-book.html)).

## 3. A decision is a page

When the owner must choose, the team makes one page showing every option in full, on phone and desktop, with what each does well and badly, what reviewers found, the cost, the recommendation and why, and what happens after. The answer is recorded on the page, verbatim, with the time, including where it overruled the recommendation.

- **Source:** PrompTugal, Dinis on 6 November ([decisions as pages](https://promptugal.news/board/guidance/2026-11-06-decisions-as-pages.md)); the best example is [the top of the page](https://promptugal.news/newsroom/design/decisions/the-top-of-the-page/index.md).
- **Who decides what:** the brand and the logo are the owner's alone. For the rest, PrompTugal's standing rule is that the owner's recommendation is the default: push it, try it live, and where the team is unsure, A/B test it ([the four design decisions](https://promptugal.news/board/guidance/2026-11-06-the-four-design-decisions.md)).
- **A decision taken by inference is not a decision.** PrompTugal shipped a deepened green band for design E reading an answer that did not name E; it is still an open question on the designer's page.

## 4. Write the spec before the build, as a pass or fail table

The designer writes the acceptance checks before the developer builds, each one testable (E1 to E13 for PrompTugal's front page). After the build, the designer ticks each check against the live site at 390 and 1280px, light and dark.

- **Source:** [spec-front-page-e](https://promptugal.news/board/spec-front-page-e.md); [spec-the-front-page-theme](https://promptugal.news/board/spec-the-front-page-theme.md).
- **In the pack:** [spec template](../pack/templates/spec.md).

## 5. Review in passes, with a budget

A pass has a goal, a budget that is a hard stop, and an owner for every finding. PrompTugal's shape: the conductor opens it, security reviews first, reviewers read in parallel, then two or three rounds (designer, developer, user-review agent), one change per round, measured; security reviews again; someone writes it up; the conductor closes it.

- **Source:** [the passes](https://promptugal.news/board/the-passes.md) and a real log, [the front-page pass](https://promptugal.news/board/passes/2026-11-06-the-front-page.md) (for example 3 rounds, 18 runs, 55 USD).
- **Test with synthetic users who see screenshots, not code,** and order findings by cost: blocks a pilot, costs a payment, costs trust, loses a reader, minor. Say "not user research" on the page ([how to run synthetic users](https://newsroom.sgit.ai/articles/how-to-run-synthetic-users.html)).

## 6. Gates make the rules real

A rule that only an agent remembers is not a rule. The design rules our sites enforce in CI today:

| Check | Where it runs today |
|---|---|
| Colour only in the token block | web-summit.sgit.ai validate; newsroom `test_themes.mjs` |
| Every theme sets every token | newsroom `test_themes.mjs`; PrompTugal validate |
| Text contrast at least 4.5:1 in every theme | newsroom `test_themes.mjs` |
| No sideways scroll at 390px | newsroom `test_front.mjs` |
| Em dashes and hype words | web-summit validate; this repository's `validate.mjs` |
| No third-party script or stylesheet | this repository's `validate.mjs` |

- **The lesson behind it:** until newsroom v0.13.48, failing reader tests did not stop a deploy (deploys went ahead 43 times), and the phone-width and house-voice checks never ran in CI ([behaviour policies from the checks](https://newsroom.sgit.ai/articles/behaviour-policies-from-the-checks.html)).
- **In the pack:** [check-design.mjs](../pack/check-design.mjs) runs the first three as one command.

## 7. Show the change

Each design release gets a short before and after: version, what changed and why, how it was checked (which devices, which themes).

- **Source:** PrompTugal [design index](https://promptugal.news/newsroom/design/index.md); [web-summit command centre](https://web-summit.sgit.ai/command-centre/index.html) (each change tried on a private copy on iPhone, iPad and computer, both themes, before release).

## 8. Write the lesson down

"An agent cannot remember a lesson between sessions unless someone writes it down. So the lessons live in files." ([PrompTugal, mistakes we made](https://promptugal.news/articles/mistakes-we-made.md)). When a team finds a better way, tell this specialist: it goes into the guidance and every other team gets it.
