export interface ItemDetail {
  name: string;
  displayName: string;
  tier: ItemTier;
  type: ItemType;
  subType?: string;
  level: number;
  attackSpeed?: string;
  baseDamage?: {
    neutral?: string;
    earth?: string;
    thunder?: string;
    water?: string;
    fire?: string;
    air?: string;
  };
  baseDefense?: {
    health: number;
    earth?: number;
    thunder?: number;
    water?: number;
    fire?: number;
    air?: number;
  };
  requirements: {
    level?: number;
    classRequirement?: string;
    strength?: number;
    dexterity?: number;
    intelligence?: number;
    defence?: number;
    agility?: number;
  };
  identifications: Record<string, ItemIdentification>;
  powderSlots: number;
  lore?: string;
  setName?: string;
  restrictions?: string;
  material?: string;
  dropType?: string;
}

export interface ItemIdentification {
  min: number;
  max: number;
  raw: number;
}

export type ItemTier = "NORMAL" | "UNIQUE" | "RARE" | "LEGENDARY" | "FABLED" | "MYTHIC" | "SET" | "CRAFTED";
export type ItemType = "WEAPON" | "HELMET" | "CHESTPLATE" | "LEGGINGS" | "BOOTS" | "RING" | "BRACELET" | "NECKLACE";
