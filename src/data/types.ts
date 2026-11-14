export type DestinationId = "moon" | "venus" | "mars" | "deep-space" | "asteroids";

export type StatusKind = "surface" | "impact" | "drifting";

export type ModelKey =
  | "eagle"
  | "surveyor"
  | "venus-large"
  | "venus-day"
  | "sojourner"
  | "opportunity"
  | "pioneer10"
  | "pioneer11"
  | "near"
  | "dart";

export interface Chapter {
  title: string;
  /** First-person, imagined narration (dramatisation). */
  text: string;
  /** The verified historical record that the chapter is based on. */
  basis: string;
}

export interface TimelineEvent {
  date: string;
  title: string;
  text: string;
}

export interface Reference {
  label: string;
  url: string;
  source: string;
}

export interface Stat {
  label: string;
  value: string;
}

export interface EquipmentPhoto {
  src: string;
  alt: string;
  caption: string;
  credit: string;
  source: string;
}

export interface JourneyPoem {
  title: string;
  lines: string[];
}

export interface Equipment {
  id: string;
  destination: DestinationId;
  name: string;
  officialName: string;
  years: string;
  yearStart: number;
  tagline: string;
  image: string;
  realPhotos: EquipmentPhoto[];
  journeyPoem: JourneyPoem;
  model: ModelKey;
  status: StatusKind;
  statusNote: string;
  stats: Stat[];
  facts: {
    mission: string;
    launchDate: string;
    purpose: string;
    background: string;
    journey: string;
    majorEvents: string[];
    discoveries: string[];
    achievements: string[];
    challenges: string[];
    finalStatus: string;
    currentLocation: string;
    significance: string;
  };
  timeline: TimelineEvent[];
  narration: Chapter[];
  funFacts: { front: string; back: string }[];
  references: Reference[];
}

export interface Destination {
  id: DestinationId;
  name: string;
  tagline: string;
  description: string;
  image: string;
  accent: string;
  facts: Stat[];
  whyLeft: string;
  equipmentIds: [string, string];
}
