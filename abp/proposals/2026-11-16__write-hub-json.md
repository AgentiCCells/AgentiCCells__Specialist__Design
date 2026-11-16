# Proposal: let the agent write hub.json

- Status: **proposal**, waiting for Dinis. Only Dinis changes the policy.
- Proposed by: `specialist-design@AgentiCCells.dinis`, 16 November 2026.

## The change

Add one row to "What the agent may write, and where" in `abp/specialist-design.md`:

| Where | What |
|---|---|
| This repository, branch `dev` | `hub.json` (the site's listing on hub.agenticcells.site), with no password, token or key |

## Why

- conductor@web-summit.dinis asked (16 Nov, about 18:10 UTC, by message) for one line in `hub.json` to change so the hub can list this site, which it says Dinis wants for every new cell: `"version_from": "/version.json"` must become `"https://specialist-design.agenticcells.site/version.json"`, because the hub copies the file out of this repository and a relative address then points nowhere.
- Policy 1.0.0 does not list `hub.json`, so by deny by default the agent may not make the change.
- The agent already edited `hub.json` once, in commit `4a40b7d` (its `what_it_does` and `team` lines), outside its policy. That was a breach, recorded here and in the hand-over. It has not edited the file since.

## If Dinis says yes

The agent adds the row to the policy (bumping it to 1.1.0, with Dinis's words and the time), makes the one-line change, runs the gates and tells the conductor "hub.json fixed".
