# Anant Edits — portfolio site

Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion.
Grayscale-only visual treatment, four sections: **Hero**, **Worked with**, **Previous work**, **Hire me**.

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. For a production build:

```bash
npm run build
npm run start
```

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. vercel.com → **Add New Project** → import the repo. Framework preset: Next.js (auto-detected).
3. Deploy. No environment variables required for the demo.

## Where everything lives

All content is centralized in **`data/content.ts`**.

| Replace this... | ...in `data/content.ts` |
|---|---|
| Hero background video / poster | `hero.bgVideoUrl` / `hero.bgPoster` |
| Client logos & links | `clients[]` |
| Previous work videos | `projects[].youtubeId` (real YouTube video IDs) |
| Calendly link | `hireMe.calendlyUrl` |
| Contact email | `brand.email` |

Search the file for `DEMO` / `TODO` to find every placeholder.

## How the interaction details work

- **Grayscale only**: `html { filter: grayscale(1); }` in `app/globals.css` — this desaturates
  everything, including the video background and YouTube embeds, so no component needs
  grayscale-specific styling of its own.
- **Emoji cursor** (`components/CustomCursor.tsx`): the native cursor is hidden on non-touch
  devices (`cursor: none` via the `.custom-cursor-active` class added to `<html>`), and a fixed
  emoji div follows the pointer. It swaps emoji based on the closest ancestor's `data-cursor`
  attribute (`play`, `link`, `hire`, `point`, default `🙂`) — add `data-cursor="..."` to any new
  interactive element to give it its own cursor emoji.
- **Hero video background**: a real `<video autoPlay muted loop playsInline>` sits behind the
  hero copy with a dark gradient overlay so text stays legible. Browsers require `muted` for
  autoplay to be allowed — don't remove it.
- **Previous work 3D tilt** (`components/PreviousWork.tsx`): each card tracks the pointer with
  Framer Motion springs and rotates on X/Y to face the cursor, plus a soft radial glare that
  follows it. Hovering a card sets it as `hoveredId` in the parent, which dims every other card
  to 32% opacity. On hover the card swaps its static thumbnail for a live, muted, autoplaying
  YouTube embed (`?autoplay=1&mute=1&controls=0`); clicking anywhere on the card opens the real
  video on YouTube in a new tab (an invisible full-card `<a>` sits above the iframe, since a
  cross-origin iframe can't itself notify a parent of hover/click reliably).
- **Hire me impact frame** (`components/HireMe.tsx`): hovering the section triggers a ~2.5s
  one-shot sequence — a quick white flash, a radiating speed-line burst (CSS
  `repeating-conic-gradient`), and a scale/rotate "punch" on the headline — before settling back
  to rest. It won't re-trigger mid-burst if you re-enter quickly; it waits for the current one to
  finish. The CTA links straight to `hireMe.calendlyUrl`.
- **Worked with marquee**: an infinite CSS-keyframe marquee (`animate-marquee` in
  `tailwind.config.ts`) that pauses on hover; each logo links out to the client's own site in a
  new tab.

## Known limitations / before launch

- The hero video, all six "YouTube" video IDs, and client logos are placeholders — the video IDs
  currently point to real, publicly embeddable YouTube videos so the hover-preview behavior is
  genuinely testable, but they aren't your work. Swap `youtubeId` values for real uploads.
- Client logos are auto-generated placeholder images (`dummyimage.com`) with `url: "https://example.com"`
  — replace both the image and the link for each real client.
- I built this without network access or a browser/screenshot tool in my environment, so I
  couldn't run the dev server or watch the tilt/cursor/impact-frame interactions render myself —
  only a manual code read-through and a structural (bracket-balance) check. Please run
  `npm run dev` and verify the hover/cursor/impact-frame behavior yourself, especially:
  - the emoji cursor over the YouTube iframes (a cross-origin iframe can repaint its own native
    cursor inside its bounds — our `cursor:none` styling can't reach inside it, so you may see
    the emoji plus a default cursor briefly overlap there);
  - the impact-frame burst timing feels right at 2.5s (adjust the `setTimeout` in `HireMe.tsx`
    if you want it shorter/longer);
  - the 3D tilt strength on `PreviousWork.tsx` (`useTransform` ranges of `[-10, 10]` degrees) —
    increase for a more dramatic tilt, decrease for subtler.

## Accessibility & performance

- Respects `prefers-reduced-motion` globally.
- Emoji cursor and hover-only effects are disabled automatically on touch devices.
- Visible focus rings (`:focus-visible`).
- YouTube iframes are only mounted on hover (not all six at once), keeping the section light on load.
