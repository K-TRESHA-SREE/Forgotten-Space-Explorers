# Forgotten Space Explorers

An interactive storytelling website about spacecraft, landers, and rovers that remain on worlds across our Solar System—or continue travelling through deep space. Explore each mission through simple stories, archival imagery, 3D models, timelines, facts, and poems.

## Features

- Interactive Solar System with eight planets shown in order from the Sun and selectable mission destinations.
- Ten mission stories, each with narration, verified mission information, an interactive timeline, fun facts, and a journey poem.
- 3D model, illustrated artwork, and NASA archival photo views for each featured instrument.
- Destination pages, an equipment gallery, and a facts and sources page.
- Responsive interface with animated transitions and browser-based narration where supported.

## Missions

| Destination | Featured equipment |
| --- | --- |
| Moon | Apollo 11 Eagle descent stage, Surveyor 3 |
| Venus | Pioneer Venus Large Probe, Pioneer Venus Day Probe |
| Mars | Sojourner, Opportunity |
| Deep space | Pioneer 10, Pioneer 11 |
| Asteroids | NEAR Shoemaker, DART |

## Getting started

### Requirements

- Node.js 20.19+ or 22.12+
- npm

### Install and run

```bash
npm install
npm run dev
```

Vite prints a local development URL in the terminal, typically `http://localhost:5173/`.

## Available commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server. |
| `npm run build` | Create the production build in `dist/`. |
| `npm run preview` | Preview the production build locally. |

## Technology

- React 19 and TypeScript
- Vite
- Tailwind CSS 4
- React Router
- Three.js with React Three Fiber and Drei
- Framer Motion

## Project structure

```text
public/
  images/              Local illustrations and visual assets
src/
  components/          Shared interface, story, and 3D components
  data/                Destination and mission content
  pages/               Home, destination, story, gallery, and about pages
  utils/               Shared utilities
```

Mission data is maintained in `src/data/equipment-inner.ts` and `src/data/equipment-outer.ts`. Destination content is in `src/data/destinations.ts`. Shared data types are in `src/data/types.ts`.

## Content and image notes

Mission facts are presented separately from the imagined first-person storytelling. The stories and poems are creative interpretations informed by the mission record; they are not historical transcripts or actual spacecraft recordings.

The site includes NASA archival imagery with source links and credits in the instrument story pages. Some images depict mission hardware during preparation, in operation, or from a distance rather than as an isolated close-up. The 3D models are simplified artistic reconstructions, and the illustrations are AI-assisted artwork; neither is an official engineering model or photograph.

This is an independent educational project and is not affiliated with or endorsed by NASA. Refer to the source linked with each archival photo for its original description and usage information.
