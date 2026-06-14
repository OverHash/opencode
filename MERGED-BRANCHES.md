# Integration Branch: integration/2026-06-14-13-38

## Merge Checklist

| Status | #   | Branch Name                  | Remote | Commit Hash | Description |
| ------ | --- | ---------------------------- | ------ | ----------- | ----------- |
| ☑      | 1   | feat/luau-syntax-highlighting | origin | 20c3e1e1d   | Conflict resolved by keeping `packages/opencode/parsers-config.ts` as the TUI re-export and adding Luau parser config to `packages/tui/src/parsers-config.ts`. |

## Additional Commit Checklist

| Status  | #   | Commit    | Description                                |
| ------- | --- | --------- | ------------------------------------------ |
| Pending | 1   | a6cf9e7a9 | config: default to shared opencode.db path |

## Merge Log

- Merged `feat/luau-syntax-highlighting` at `20c3e1e1d`; resolved parser config relocation conflict by preserving the current TUI parser config location.
