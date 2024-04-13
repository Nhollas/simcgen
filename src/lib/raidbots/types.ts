import { specIdMap, classIdMap, qualityTypeMap, inventoryTypeMap, gearSlots } from "./data"

export type RaidbotsSpecName = keyof typeof specIdMap
export type RaidbotsSpecId = typeof specIdMap[keyof typeof specIdMap]
export type RaidbotsClassId = typeof classIdMap[keyof typeof classIdMap]
export type RaidbotsClassName = keyof typeof classIdMap
export type RaidbotsQualityTypeColour = typeof qualityTypeMap[keyof typeof qualityTypeMap]
export type RaidbotsQualityTypeId = keyof typeof qualityTypeMap
export type RaidbotsInventoryType = keyof typeof inventoryTypeMap
export type RaidbotsInventoryTypeName = typeof inventoryTypeMap[keyof typeof inventoryTypeMap]
export type RaidbotsGearSlotName = keyof typeof gearSlots
export type RaidbotsGearSlotId = typeof gearSlots[keyof typeof gearSlots]

export interface RaidbotsGearOutput {
    back: RaidbotsItem[]
    chest: RaidbotsItem[]
    feet: RaidbotsItem[]
    hands: RaidbotsItem[]
    head: RaidbotsItem[]
    legs: RaidbotsItem[]
    main_hand: RaidbotsItem[]
    neck: RaidbotsItem[]
    off_hand: RaidbotsItem[]
    rings: RaidbotsItem[]
    shoulder: RaidbotsItem[]
    trinkets: RaidbotsItem[]
    waist: RaidbotsItem[]
    wrist: RaidbotsItem[]
}

export interface RaidbotsItem {
    equipped?: boolean
    id: number
    bonus_id: string
    name: string
    icon: string
    quality: 1 | 2 | 3 | 5 | 6 | 7 | 4
    itemClass: number
    itemSubClass: number
    inventoryType: 1 | 2 | 3 | 16 | 5 | 9 | 10 | 6 | 7 | 8 | 21 | 22 | 11 | 12 | 4 | 13 | 14 | 15 | 17 | 20 | 23
    itemLevel: number
    itemSetId?: number
    allowableClasses?: Array<number>
    enchant_id?: string
    context?: string
    bonusLists?: Array<number>
    stats: Array<{
      id: number
      alloc: number
    }>
    sources?: Array<{
      instanceId: number
      encounterId: number
    }>
    expansion: number
    baseItemLevel: number
    socketInfo: {
      PRISMATIC?: {
        type: string
        staticSlots: number
        dynamicSlots: number
        filled: number
        total: number
        gems: Array<{
          slot: string
          shortName: string
          group: string
          preferred: {
            roles: Array<string>
          }
          id: number
          displayName: string
          spellIcon: string
          itemId: number
          itemName: string
          itemIcon: string
          quality: number
          expansion: number
          craftingQuality: number
          tokenizedName: string
          socketType: number
          stats: Array<{
            type: string
            amount: number
          }>
          key: string
          name: string
          type: string
          dps: boolean
        }>
        gemIds: Array<number>
        hasUnique: boolean
      }
    }
    upgrade?: {
      level: number
      max: number
      group: number
      name: string
      costs: Array<{
        mask_inv_type: number
        flags: number
        amounts: Array<{
          currencyId: number
          amount: number
          name: string
          icon: string
        }>
      }>
      bonusId: number
      itemLevel: number
      highWatermarkDiscounts: Array<{
        type: string
        id: number
        scaling: number
        accountWide: boolean
      }>
      seasonId: number
    }
    profession?: {
      id: number
      recipeSpellId: number
      optionalCraftingSlots: Array<{
        id: number
        count: number
        recraftCount: number
      }>
    }
    unique_id: string
    setPieces?: Array<string>
    gem_id?: string
}