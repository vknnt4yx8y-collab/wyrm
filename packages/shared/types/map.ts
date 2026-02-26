export interface MapLocationDetail {
  id: string;
  name: string;
  type: MapLocationType;
  x: number;
  y?: number;
  z: number;
  icon?: string;
  details?: Record<string, unknown>;
}

export type MapLocationType =
  | "city"
  | "dungeon"
  | "boss_altar"
  | "quest_npc"
  | "merchant"
  | "fast_travel"
  | "discovery"
  | "resource_node"
  | "cave"
  | "shrine";
