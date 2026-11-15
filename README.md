# Forgotten Space Explorers

Forgotten Space Explorers is an interactive, story-driven introduction to NASA spacecraft, landers, and rovers left behind across the Solar System. It combines source-linked mission facts with imaginative first-person narration, interactive 3D models, an orrery, timelines, and NASA archival photographs.

**Live site:** [forgotten-space-explorers-final.vercel.app](https://forgotten-space-explorers-final.vercel.app/)

## 2026 NASA Space Apps Challenge

This project responds to the 2026 NASA Space Apps Challenge:

**Abandoned but not Forgotten: Storytelling about NASA’s Discarded Equipment on the Moon and Mars**

Read the [official challenge description](https://www.spaceappschallenge.org/2026/challenges/nasas-discarded-equipment-storytelling/).

The experience is designed to introduce school-age space enthusiasts to NASA hardware and the science it enabled. It features stories about equipment on the Moon and Mars and also explores related missions elsewhere in the Solar System, including Venus, deep space, and asteroids.

## Explore

- **Five destinations:** the Moon, Venus, Mars, deep space, and the asteroids.
- **Ten mission stories:** each pairs creative narration with mission facts, timelines, and references.
- **An interactive Solar System:** select a highlighted destination to explore its associated machines.
- **A browsable equipment gallery:** filter missions by destination and current status.
- **Interactive 3D models:** simplified artistic reconstructions created for this site, not official engineering models.
- **Responsive layouts and animated transitions** for desktop and mobile.
- **Browser-based narration** where the browser supports speech synthesis.

## Mission information and resources

Mission dates, figures, locations, and outcomes are presented with source references on the story pages and in the About section. The project consults NASA Science, NASA’s NSSDC Master Catalog, NASA History, and mission-partner sources, including the Johns Hopkins Applied Physics Laboratory. Each mission’s references link to the original material.

NASA archival photographs are shown separately from the illustrations, with a credit and link to their NASA source on the story page. Check each original source for its description and usage terms.

First-person narration and poems are creative interpretations, not historical transcripts or spacecraft recordings. The factual record is identified separately; uncertainties are noted where relevant.

## Artwork disclosure

The ten local JPG assets in `public/images/` are AI-generated anime-style illustrations used throughout the home page, destination pages, gallery, story pages, and interactive panels. Every displayed copy is visibly marked **“AI-generated.”** These illustrations are interpretations, not photographs. NASA archival photographs are not AI-generated and are not given the AI watermark.

The interactive 3D models are separate, simplified artistic reconstructions built in code for this project. They are not official NASA engineering models.

## Run locally

### Requirements

- Node.js 20.19+ or 22.12+
- npm

### Install and start the development server

```bash
npm ci
npm run dev
```

Vite prints the local URL in the terminal (usually `http://localhost:5173/`).

### Production build

```bash
npm run build
```

The production build uses Vite's single-file plugin. Public image assets are copied to the build output.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server. |
| `npm run build` | Create the production build in `dist/`. |
| `npm run preview` | Preview the production build locally. |

## Built with

- React 19 and TypeScript
- Vite
- Tailwind CSS 4
- React Router
- Three.js, React Three Fiber, and Drei
- Framer Motion

## Project structure

```text
public/
  images/              AI-generated illustrations
src/
  components/          Shared interface, story, and 3D components
  data/                Mission, destination, and image data
  pages/               Home, destination, story, gallery, and about pages
  utils/               Shared utilities
```

Mission details and references are maintained in `src/data/equipment-inner.ts` and `src/data/equipment-outer.ts`. Destination information is in `src/data/destinations.ts`.

## Submission checks

Repository changes do not establish compliance for a team, event, submission form, or demo. According to the [official Project Submission Guide](https://www.spaceappschallenge.org/resources/project-submission-guide/), the demo must be either a public video no longer than 30 seconds or a slide deck of no more than 7 slides, including the title/introduction. Submission links must be publicly accessible without login, permission, or registration.

Separately, check the submission portal for project details and NASA/data/resource disclosures, team and event eligibility, agreement checkboxes, and the submission deadline. None of those team- or submission-specific items is verified by this repository.

This independent educational project is not affiliated with or endorsed by NASA. See [LICENSE](./LICENSE) for the software license.
