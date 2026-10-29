<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Design file is the source of truth

The look & feel of the site is defined by the Claude Design file: https://claude.ai/artifact/FvwuqaCFwz2323aizjbQMj
(one `.dc.html` page per route, plus shared `Header` and `Footer`). Code follows the design, not the other way around.

Every code change must fall into one of these cases:

1. **Sync with the design file.** Changes that make the code match the design: just do them.
2. **Infrastructure.** Build, deploy, tooling, dependencies, analytics, redirects, SEO plumbing and similar upkeep: fine to do.
3. **Data sources.** Updates to content and data (e.g. `config/*.ts`, blog posts, images): fine to do, but if a change shows up
   on a page the design covers, update the design file in the same task so both stay in sync.

Any other change that could make the code drift from the design (layout, styles, components, copy outside data sources)
must be confirmed with the user first, and rejected if the design file can't be updated to match.
