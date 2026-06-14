# Integration Branch: integration/2026-06-14-13-38

## Merge Checklist

| Status | #   | Branch Name                  | Remote | Commit Hash | Description |
| ------ | --- | ---------------------------- | ------ | ----------- | ----------- |
| ☑      | 1   | feat/luau-syntax-highlighting | origin | 20c3e1e1d   | Conflict resolved by keeping `packages/opencode/parsers-config.ts` as the TUI re-export and adding Luau parser config to `packages/tui/src/parsers-config.ts`. |

## Additional Commit Checklist

| Status  | #   | Commit    | Description                                |
| ------- | --- | --------- | ------------------------------------------ |
| Applied | 1   | a6cf9e7a9 | config: default to shared opencode.db path |

## Merge Log

- Merged `feat/luau-syntax-highlighting` at `20c3e1e1d`; resolved parser config relocation conflict by preserving the current TUI parser config location.
- Cherry-picked approved standalone commit `a6cf9e7a9`; Git reused a recorded resolution for `packages/core/src/flag/flag.ts`, preserving the current flag layout while adding the commit's channel DB defaults.

## Comparison to Previous Integration Branch

Previous integration branch: `integration/2026-06-08-18-31`

### Newly Included Branches

- None

### No Longer Included

- None

### Same Branch, Different Merged Commit

- None
