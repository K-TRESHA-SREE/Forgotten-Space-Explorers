import { innerEquipment } from "./equipment-inner";
import { outerEquipment } from "./equipment-outer";
import type { Equipment, StatusKind } from "./types";

export * from "./types";
export * from "./destinations";

export const equipment: Equipment[] = [...innerEquipment, ...outerEquipment];

export const getEquipment = (id?: string) => equipment.find((e) => e.id === id);

export const equipmentForDestination = (dest: string) => equipment.filter((e) => e.destination === dest);

export const STATUS_META: Record<
  StatusKind,
  { label: string; short: string; color: string; description: string }
> = {
  surface: {
    label: "Resting on a surface",
    short: "On a surface",
    color: "#ffcf7a",
    description:
      "Still sitting on the world where it stopped — the Moon, Venus, Mars or an asteroid.",
  },
  impact: {
    label: "Destroyed in impact",
    short: "Destroyed",
    color: "#ff7a8a",
    description: "Ended its mission by deliberately crashing into its target.",
  },
  drifting: {
    label: "Inactive, still travelling",
    short: "Still travelling",
    color: "#7ff0ff",
    description: "Silent, but still coasting through space with no engine to stop it.",
  },
};
