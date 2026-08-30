# prateekkapoor.dev — Site Vision & Style Guide

This is the durable design/product context for this personal site. It describes
intent and standing decisions, not a specific build log — exact copy (bio text,
project descriptions, blog posts) lives in the actual source files and changes
often, so it's deliberately not duplicated here.

## Who this site is for

Prateek Kapoor — a full-stack software engineer with a growing focus on applied AI
in production (RAG pipelines, LLM document processing, computer vision). Backend
work is the preference, though the day-to-day is full-stack. Positioning across the
site should read as **applied AI / ML engineer with a full-stack background**, not a
generic "software engineer" resume site.

An important, standing nuance for any copy written on this site: distributed/scalable
systems is an active curiosity and a goal for a *future* role — never framed as
current expertise. Don't let generated copy imply otherwise.

## Design philosophy

- Not a professional designer's site — the bar is simple, scannable, one clear
  visual hierarchy per page/section. Resist adding visual complexity that doesn't
  earn its place.
- Actively avoid the generic-AI-generated look: no purple gradients, no
  Inter-everywhere defaults, no rounded-card-with-soft-shadow-on-everything.
- No illustration, no avatar/photo of the person, no cartoon or mascot elements
  anywhere on the site.
- Time-conscious builds — features should be scoped so a working version ships
  quickly, with polish added in later passes rather than blocking launch.

## Color palette

- Background: `#06070a` — deliberately just short of true black. Pure `#000000`
  causes visible halation/glow around bright text on many screens, which reads as
  harsh rather than premium. The site is expected to often be viewed at night, so
  this dark-but-not-pure-black choice matters.
- Text: `#f5f7fb` (headings), `#b8c0d4` (body), `#7c8aa8` (muted/small text — also
  used for any "resting" / inactive state of interactive visual elements)
- Accent — dusty rose:
  - Base (small accents, active/highlighted state): `#a8646f`
  - Deeper rose (hover/pressed states, larger elements): `#8a4f58`
  - Pale blush (rare, subtle highlights only): `#d9a3ac`

Any new section or page added to the site should draw from this exact palette
rather than introducing new colors, unless there's a deliberate reason to expand it.

## Typography

- Display / headings / name: **Space Grotesk** (500/700 weight)
- Body text: **Inter** (400/500)
- Small mono accents (tags, status lines, code-comment-styled labels): **Space Mono**

A recurring lockup pattern on this site: a larger Space Grotesk label paired with a
small Space Mono tag styled like a code comment (e.g. `// Applied AI`) rather than a
plain subtitle. Reuse this pattern for similar label+tag pairs elsewhere on the site.

## Layout conventions

- Left-aligned single-column content blocks, narrow measure (~60–65 characters per
  line) for body text — editorial feel over full-width paragraphs.
- Consistent padding on all sides; content should never touch the viewport edge.
- Any decorative visual (like the hero's node network) should act as a counterweight
  placed to one side, not centered and not competing with text for primary attention.

## The node network motif

The animated node/line network (small dots, thin connecting lines, irregular and
open rather than a closed symmetric shape) is the site's signature visual motif —
it's a metaphor for embedding spaces / knowledge graphs, tying directly to the
applied-AI positioning above. It's built as a reusable, resizable component
specifically so it can reappear elsewhere on the site (not just the homepage hero)
as the site grows past a single page.

Visual rules for this motif, wherever it's reused:
- Flat only — no glow, no gradient, no blur. Small flat circles, thin flat lines.
- Resting state uses the muted gray-blue (`#7c8aa8`); active/highlighted state uses
  the dusty rose accent (`#a8646f`).
- Motion should stay quiet and occasional (slow drift, occasional signal-pulse
  animation) — never busy or twinkling. It's ambient texture, not a focal animation.
- Cursor interactivity (nearby elements brighten/react) is a nice-to-have pattern
  worth reusing for other interactive visual elements on the site, not just this one.

## Content voice

- Person-first, not resume-first — avoid leading with company names or metrics in
  bio-style copy.
- Show, don't tell — prefer a specific, concrete detail (a specific book, a specific
  trip, a specific project) over a generic abstract claim ("I like scifi," "I love
  traveling"). When drafting this kind of copy, ask for the specific detail rather
  than inventing one.
- Comes through as a "researcher at heart" through behavior/specifics in the copy,
  not as a stated label.
- Real content (bio copy, project write-ups, blog posts, demos) is the user's own —
  treat requests to draft this copy as a starting point/editing pass, not as final,
  and don't publish/finalize content the user hasn't reviewed.

## Site scope

**Built:** single-page hero — name, tagline, short bio, "currently" status line,
contact links, and the animated node-network visual.

**Future ideas, not yet committed to a timeline:**
- A projects section, likely a rotating carousel
- A blog
- A dedicated photography tab/page
- A chat-based virtual interview bot
- Calendar booking
- A wireframe humanoid silhouette built from the same node/line visual language,
  parked until there's real design/animation time to invest in it properly

## Current implementation

Vite + React + TypeScript + Tailwind CSS. One component per concept under
`src/components/`, composed together in `src/App.tsx`. No routing or state
management library yet — add one only when the site actually grows past what plain
component composition can handle cleanly.

Code comments: single line only, max two lines, and concise. No multi-line comment
blocks or paragraph-style explanations.
