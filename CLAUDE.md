# Project Instructions

## Commands

```bash
# Dev
npm start

# Build
npm run build

# Test
npm test                              # full suite
npm test -- --testPathPattern=<path> # single file

# Deploy
npm run deploy
```

## Workflow

- Run `npm run build` after a series of type-heavy changes to catch TS errors
- Prefer fixing the root cause over adding workarounds
- When unsure about approach, use plan mode (`Shift+Tab`) before coding
