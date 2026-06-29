# Superdeal Style Guide (standalone)

A self-contained copy of the Superdeal design-system style guide — the page that
used to live at `/style-guide` inside the frontend app. It's now an independent
Next.js app you can run, edit, and iterate on without booting the whole product.

The workflow: **edit components here → once they look right, mirror them into the
main app.**

## Run it

```bash
cd /Users/ericdahan/Dev/SuperdealHQ/style_guide
npm install        # or: pnpm install
npm run dev        # serves on http://localhost:3020
```

Port **3020** is used to avoid clashing with the main app on 3010.

## Layout

```
src/app/
  page.tsx                 # the style guide (the / route) — edit components here
  styleGuide.module.css    # all styling, fully scoped under .root — edit tokens/styles here
  globals.css              # minimal document reset only
  layout.tsx               # minimal shell
  docs/                    # design specs lifted alongside the guide
    PRD.md
    COMPONENTS.md
    COMPONENT-BACKLOG.md
    CREATOR-PANEL-IA.md
    CREATOR-WORKSPACE-SPEC.md
```

## Notes

- The page is fully self-contained: it depends only on React, the Inter font
  (`next/font/google`), `@tabler/icons-react`, and `styleGuide.module.css`. No
  global theme/tokens from the main app are required — every design token is
  defined under `.root` in the module CSS.
- Source of truth before extraction:
  `train-yard/superdeal/mbp-codex-design/frontend/src/app/style-guide/`.
