import { z } from "zod"

export const gearConfigOptions = z.enum(["ItemLevel", "Gem", "Enchant", "SecondaryStats", "Embellishment"]);
export type GearConfigOption = z.infer<typeof gearConfigOptions>;

export const gearSlotOptions = z.enum(["head", "feet", "neck", "shoulder", "back", "chest", "wrist", "hands", "waist", "legs", "finger1", "finger2", "trinket1", "trinket2", "main_hand", "off_hand", "tabard"]);
export type GearSlot = z.infer<typeof gearSlotOptions>;
export const groupedGearSlotOptions = z.enum(["head", "feet", "neck", "shoulder", "back", "chest", "wrist", "hands", "waist", "legs", "ring", "trinket", "main_hand", "off_hand", "tabard"]);
export type GroupedGearSlot = z.infer<typeof groupedGearSlotOptions>;

export const gearSlotOptionsConfig: Record<GroupedGearSlot, GearConfigOption[]> = {
    head: ["ItemLevel", "Gem"],
    neck: ["ItemLevel", "Gem", "Gem", "Gem"],
    shoulder: ["ItemLevel"],
    back: ["ItemLevel", "Enchant"],
    chest: ["ItemLevel", "Enchant"],
    wrist: ["ItemLevel", "Gem", "Enchant"],
    hands: ["ItemLevel", "Enchant"],
    waist: ["ItemLevel", "Gem", "SecondaryStats", "Embellishment"],
    legs: ["ItemLevel", "Enchant"],
    ring: ["ItemLevel", "Gem", "SecondaryStats", "Embellishment"],
    trinket: ["ItemLevel"],
    main_hand: ["ItemLevel", "Embellishment", "Enchant", "SecondaryStats"],
    off_hand: ["ItemLevel", "Enchant"],
    feet: ["ItemLevel", "Embellishment", "Enchant", "SecondaryStats"],
    tabard: [],
}