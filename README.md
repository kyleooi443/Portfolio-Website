# Kyle's portfolio

A content-driven Next.js portfolio for Kyle Andrew Masilang.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Before deploying, set `NEXT_PUBLIC_SITE_URL` to the final public origin (for example, `https://your-domain.example`) so canonical URLs and social previews point to the correct domain.

## Update the content

- Edit the introduction, education, and verified contact links in `src/data/profile.ts`. Add only confirmed `mailto:` or `https://` destinations and set `verified: true` for those links.
- Edit project titles, descriptions, honest statuses, years, order, and card tint (`accent`) in `src/data/projects.ts`. Project cards are text-only. A missing year is simply hidden.
- Write each project story in `content/projects/<slug>.mdx`. The slug must match its entry in `src/data/projects.ts`.
- Add an article as `content/notes/<slug>.mdx` with `title`, `excerpt`, `topic`, `surface`, and optional `date` frontmatter. Set `isSample: false` only when it is Kyle's own publishable writing.
- Kyle's portrait is `public/images/kyle-portrait.png`. For “Outside the screen”, put photographs in `public/images/` and add `image` and `alt` to the matching entry in `src/components/home/OutsideScreen.tsx`; until then each album shows a labeled ASCII placeholder. Add project screenshots inside the project MDX with `ArticleMedia` once they exist. The hero backdrop and its click-to-cycle colors are defined in `src/app/globals.css` and `src/components/home/HeroSurface.tsx`; add a personal banner image in `src/components/home/Hero.tsx` if desired. Update image paths and alt text in the relevant content or component. `ArticleMedia` is available inside MDX for captioned images.

Placeholders deliberately say they are placeholders. No social identity, publication date, project metrics, or deployed product status has been invented.

## Checks

```bash
npm test
npm run lint
npm run typecheck
npm run build
```
