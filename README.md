# Northstar Journal

A TanStack Start + Convex app for:

- setting long-term and short-term goals
- writing daily reflections
- carrying forward context from recent entries
- surfacing useful prompts when you do not know what to write

The product direction is based on the transcript in [docs/transcript.md](./docs/transcript.md).

## Stack

- TanStack Start
- TanStack Router
- Convex
- Tailwind CSS v4
- Biome

## Local setup

```bash
npm install
```

Start Convex in one terminal:

```bash
npm run convex:dev
```

Start the web app in another terminal:

```bash
npm run dev
```

`convex dev` will create the local deployment config and generate the real
`convex/_generated` files. The checked-in versions are only there so the app can
typecheck and build before the deployment is connected.

## Useful scripts

```bash
npm run dev
npm run build
npm run check
npm run convex:dev
npm run convex:codegen
```

## Notes

- The app is currently single-user and intentionally does not include auth.
- The home page becomes fully interactive once `VITE_CONVEX_URL` is available.
- The archive page shows recurring reflection themes derived from simple
  keyword-based heuristics.
