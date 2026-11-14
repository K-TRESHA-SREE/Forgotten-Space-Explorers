import type { Destination } from "./types";
import { IMG } from "./images";

export const destinations: Destination[] = [
  {
    id: "moon",
    name: "The Moon",
    tagline: "Footprints that never fade",
    description:
      "Earth's only natural satellite, 384,400 km away, has no wind or rain to erase anything. Every landing site is a time capsule: hardware and footprints can stay for a very long time, slowly changed only by tiny meteoroids and sunlight.",
    image: IMG.eagle,
    accent: "#cfd8ff",
    facts: [
      { label: "Average distance", value: "384,400 km" },
      { label: "Surface gravity", value: "about 1/6 of Earth" },
      { label: "Day–night cycle", value: "about 29.5 Earth days" },
      { label: "Atmosphere", value: "Almost none (a thin exosphere)" },
    ],
    whyLeft:
      "Landers are not built to come home. The Apollo descent stage was the launch platform for the ascent stage, and robotic Surveyors had no way to leave at all.",
    equipmentIds: ["apollo-11-eagle", "surveyor-3"],
  },
  {
    id: "venus",
    name: "Venus",
    tagline: "A furnace wrapped in cloud",
    description:
      "Earth's twin in size, Venus is wrapped in sulfuric-acid clouds over a crushing carbon-dioxide atmosphere. Its surface is hot enough to melt lead. Robotic probes here live in minutes, not years.",
    image: IMG.venusLarge,
    accent: "#ffb866",
    facts: [
      { label: "Surface temperature", value: "about 465 °C" },
      { label: "Surface pressure", value: "about 90× Earth's" },
      { label: "Atmosphere", value: "About 96% carbon dioxide" },
      { label: "Clouds", value: "Sulfuric acid droplets" },
    ],
    whyLeft:
      "Nothing built in the 1970s could survive Venus for long. The Pioneer Venus probes were designed only to measure the atmosphere on the way down.",
    equipmentIds: ["pioneer-venus-large-probe", "pioneer-venus-day-probe"],
  },
  {
    id: "mars",
    name: "Mars",
    tagline: "The rust-red frontier",
    description:
      "A cold desert world with ancient river valleys and lake beds. Rovers have turned Mars from a point of light into a place with weather, rocks and a story of water.",
    image: IMG.opportunity,
    accent: "#ff9b6b",
    facts: [
      { label: "Surface gravity", value: "about 38% of Earth's" },
      { label: "Length of a day (sol)", value: "24 h 39 min 35 s" },
      { label: "Atmosphere", value: "Thin, mostly carbon dioxide" },
      { label: "Signal delay to Earth", value: "About 3–22 minutes one way" },
    ],
    whyLeft:
      "Rovers run until dust, cold, wear or lost contact ends their work. When the last signal fades, they stay where they stopped.",
    equipmentIds: ["sojourner-rover", "opportunity-rover"],
  },
  {
    id: "deep-space",
    name: "Deep Space",
    tagline: "Messengers beyond the planets",
    description:
      "Past Jupiter and Saturn, past the orbit of Neptune, two small spacecraft are still coasting outward on paths that lead to the stars, each carrying a plaque for anyone who might find it.",
    image: IMG.pioneer10,
    accent: "#a99bff",
    facts: [
      { label: "Jupiter's distance from the Sun", value: "about 5.2 AU" },
      { label: "Saturn's distance from the Sun", value: "about 9.5 AU" },
      { label: "Pioneer 10 at last contact (2003)", value: "about 80 AU" },
      { label: "Light-travel time at 80 AU", value: "roughly 11 hours" },
    ],
    whyLeft:
      "Fly-by spacecraft are meant to keep going. When their power runs out they fall silent but keep travelling, with no engine to stop them.",
    equipmentIds: ["pioneer-10", "pioneer-11"],
  },
  {
    id: "asteroids",
    name: "Asteroids",
    tagline: "Rubble from the dawn of the Solar System",
    description:
      "Asteroids are leftover building blocks from the early Solar System. Studying them tells us how planets formed, and how we might one day protect our own.",
    image: IMG.near,
    accent: "#9ee6c1",
    facts: [
      { label: "Main belt location", value: "Between Mars and Jupiter" },
      { label: "433 Eros length", value: "about 34 km" },
      { label: "Dimorphos diameter", value: "about 160 m" },
      { label: "Gravity", value: "Tiny: you could escape with a jump on a small one" },
    ],
    whyLeft:
      "Asteroid missions end in a variety of ways. One was gently set down on Eros, and one was crashed into Dimorphos on purpose.",
    equipmentIds: ["near-shoemaker", "dart"],
  },
];

export const getDestination = (id?: string) => destinations.find((d) => d.id === id);
