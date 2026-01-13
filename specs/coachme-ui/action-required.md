# Action Required: CoachMe UI

## Before Implementation

- [ ] **Start dev server** - User should run `pnpm dev` to verify the current app works before making changes

- [ ] **Confirm scope** - This spec covers ~120 components and ~48 pages. User should confirm they want to proceed with the full implementation or prioritize certain sections.

## During Implementation

- [ ] **Run lint/typecheck after each phase** - Execute `pnpm lint && pnpm typecheck` after completing each phase to catch issues early

- [ ] **Visual review** - User should periodically review the UI in the browser to ensure components match expectations

## After Implementation

- [ ] **Full build verification** - Run `pnpm build` to ensure production build works

- [ ] **Browser testing** - Manually test in multiple browsers (Chrome, Firefox, Safari) if cross-browser compatibility is important

## Notes

- No environment variables or external API keys required for UI-only implementation
- Mock data is self-contained, no database setup needed
- The existing auth/billing components will remain functional but won't be connected to the new coaching features until backend implementation
