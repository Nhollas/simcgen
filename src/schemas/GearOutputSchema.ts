import { z } from "zod"

const statSchema = z.object({
  id: z.number(),
  alloc: z.number(),
})

const gemStatSchema = z.object({
  type: z.string(),
  amount: z.number(),
})

const sourceSchema = z.object({
  instanceId: z.number(),
  encounterId: z.number(),
})

const preferredSchema = z.object({
  roles: z.array(z.string()),
})

const gemSchema = z.object({
  slot: z.string(),
  shortName: z.string(),
  group: z.string(),
  preferred: preferredSchema,
  id: z.number(),
  displayName: z.string(),
  spellIcon: z.string(),
  itemId: z.number(),
  itemName: z.string(),
  itemIcon: z.string(),
  quality: z.number(),
  expansion: z.number(),
  craftingQuality: z.number(),
  tokenizedName: z.string(),
  socketType: z.number(),
  stats: z.array(gemStatSchema),
  key: z.string(),
  name: z.string(),
  type: z.string(),
  dps: z.boolean(),
})

export type GemSchema = z.infer<typeof gemSchema>

const prismaticSchema = z.object({
  type: z.string(),
  staticSlots: z.number(),
  dynamicSlots: z.number(),
  filled: z.number(),
  total: z.number(),
  gems: z.array(gemSchema),
  gemIds: z.array(z.any()),
  hasUnique: z.boolean(),
})

const highWatermarkDiscountSchema = z.object({
  type: z.string(),
  id: z.number(),
  scaling: z.number(),
  accountWide: z.boolean(),
})

const amountSchema = z.object({
  currencyId: z.number().optional(),
  amount: z.number(),
  name: z.string(),
  icon: z.string(),
  itemId: z.number().optional(),
})

const optionalCraftingSlotSchema = z
  .object({
    id: z.number(),
    count: z.number(),
    recraftCount: z.number(),
  })
  .optional()

const itemLimitSchema = z
  .object({
    category: z.number(),
    quantity: z.number(),
    name: z.string(),
  })
  .optional()

export const socketInfoSchema = z.object({
  PRISMATIC: prismaticSchema.optional(),
})

const costSchema = z.object({
  mask_inv_type: z.number(),
  flags: z.number(),
  amounts: z.array(amountSchema),
})

const professionSchema = z
  .object({
    id: z.number(),
    recipeSpellId: z.number(),
    optionalCraftingSlots: z.array(optionalCraftingSlotSchema),
  })
  .optional()

const upgradeSchema = z
  .object({
    level: z.number(),
    max: z.number(),
    group: z.number(),
    name: z.string(),
    costs: z.array(costSchema),
    bonusId: z.number(),
    itemLevel: z.number(),
    highWatermarkDiscounts: z.array(highWatermarkDiscountSchema),
    seasonId: z.number(),
  })
  .optional()

export type GearItemSchema = z.infer<typeof gearItemSchema>

const gearItemSchema = z.object({
  id: z.number(),
  unique_id: z.string(),
  bonus_id: z.string().optional(),
  enchant_id: z.string().optional(),
  context: z.string().optional(),
  equipped: z.boolean().optional(),
  name: z.string(),
  icon: z.string(),
  quality: z.number(),
  itemClass: z.number(),
  itemSubClass: z.number(),
  inventoryType: z.number(),
  itemLevel: z.number(),
  stats: z.array(statSchema).optional(),
  bonusLists: z.array(z.number()).optional(),
  sources: z.array(sourceSchema).optional(),
  expansion: z.number(),
  baseItemLevel: z.number(),
  socketInfo: socketInfoSchema,
  upgrade: upgradeSchema,
  profession: professionSchema,
  itemLimit: itemLimitSchema,
  itemSetId: z.number().optional(),
  setPieces: z.array(z.string()).optional(),
})

export type GearSchema = z.infer<typeof gearSchema>

const gearSchema = z.object({
  head: z.array(gearItemSchema),
  neck: z.array(gearItemSchema),
  shoulder: z.array(gearItemSchema),
  back: z.array(gearItemSchema),
  chest: z.array(gearItemSchema),
  wrist: z.array(gearItemSchema),
  hands: z.array(gearItemSchema),
  waist: z.array(gearItemSchema),
  legs: z.array(gearItemSchema),
  feet: z.array(gearItemSchema),
  main_hand: z.array(gearItemSchema),
  off_hand: z.array(gearItemSchema).optional(),
  rings: z.array(gearItemSchema),
  trinkets: z.array(gearItemSchema),
})

const characterInfoSchema = z.object({
  level: z.string(),
  race: z.string(),
  region: z.string(),
  server: z.string(),
  role: z.string(),
  specId: z.number(),
  classId: z.number(),
  talents: z.string(),
  name: z.string(),
})

export type GearOutputSchema = z.infer<typeof gearOutputSchema>

export const gearOutputSchema = z.object({
  simcInput: z.string(),
  gearInfo: gearSchema,
  characterInfo: characterInfoSchema,
  searchedItems: z.array(gearItemSchema),
  searchOpen: z.boolean(),
})
