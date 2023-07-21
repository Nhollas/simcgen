// Generated by ts-to-zod
import { z } from "zod";

const statSchema = z.object({
  id: z.number(),
  alloc: z.number(),
});

const sourceSchema = z.object({
  instanceId: z.number(),
  encounterId: z.number(),
});

const preferredSchema = z.object({
  roles: z.array(z.string()),
});

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
  stats: z.array(statSchema),
  key: z.string(),
  name: z.string(),
  type: z.string(),
  dps: z.boolean(),
});

const prismaticSchema = z.object({
  type: z.string(),
  staticSlots: z.number(),
  dynamicSlots: z.number(),
  filled: z.number(),
  total: z.number(),
  gems: z.array(gemSchema),
  gemIds: z.array(z.any()),
  hasUnique: z.boolean(),
});

const highWatermarkDiscountSchema = z.object({
  type: z.string(),
  id: z.number(),
  scaling: z.number(),
  accountWide: z.boolean(),
});

const amountSchema = z.object({
  currencyId: z.number().optional(),
  amount: z.number(),
  name: z.string(),
  icon: z.string(),
  itemId: z.number().optional(),
});

const optionalCraftingSlotSchema = z.object({
  id: z.number(),
  count: z.number(),
  recraftCount: z.number(),
});

const itemLimitSchema = z.object({
  category: z.number(),
  quantity: z.number(),
  name: z.string(),
});

const spellSchema = z.object({
  id: z.number(),
  name: z.string(),
  icon: z.string(),
});

const socketInfoSchema = z.object({
  PRISMATIC: prismaticSchema.optional(),
});

const costSchema = z.object({
  mask_inv_type: z.number(),
  flags: z.number(),
  amounts: z.array(amountSchema),
});

const professionSchema = z.object({
  id: z.number(),
  recipeSpellId: z.number(),
  optionalCraftingSlots: z.array(optionalCraftingSlotSchema),
});

const effectSchema = z.object({
  id: z.number(),
  index: z.number(),
  spell: spellSchema,
});

const neckSchema = z.object({
  id: z.number(),
  bonus_id: z.string(),
  context: z.string(),
  crafted_stats: z.string(),
  equipped: z.boolean(),
  name: z.string(),
  icon: z.string(),
  quality: z.number(),
  itemClass: z.number(),
  itemSubClass: z.number(),
  inventoryType: z.number(),
  itemLevel: z.number(),
  socketInfo: socketInfoSchema,
  stats: z.array(statSchema),
  bonusLists: z.array(z.number()),
  sources: z.array(sourceSchema),
  profession: professionSchema,
  expansion: z.number(),
  baseItemLevel: z.number(),
});

const waistSchema = z.object({
  id: z.number(),
  bonus_id: z.string(),
  context: z.string(),
  crafted_stats: z.string(),
  equipped: z.boolean(),
  name: z.string(),
  icon: z.string(),
  quality: z.number(),
  itemClass: z.number(),
  itemSubClass: z.number(),
  inventoryType: z.number(),
  itemLevel: z.number(),
  stats: z.array(statSchema),
  bonusLists: z.array(z.number()),
  sources: z.array(sourceSchema),
  profession: professionSchema,
  expansion: z.number(),
  baseItemLevel: z.number(),
  effects: z.array(effectSchema),
  socketInfo: socketInfoSchema,
  itemLimit: itemLimitSchema,
});

const footSchema = z.object({
  id: z.number(),
  bonus_id: z.string(),
  context: z.string(),
  crafted_stats: z.string(),
  equipped: z.boolean(),
  name: z.string(),
  icon: z.string(),
  quality: z.number(),
  itemClass: z.number(),
  itemSubClass: z.number(),
  inventoryType: z.number(),
  itemLevel: z.number(),
  stats: z.array(statSchema),
  bonusLists: z.array(z.number()),
  sources: z.array(sourceSchema),
  profession: professionSchema,
  expansion: z.number(),
  baseItemLevel: z.number(),
  effects: z.array(effectSchema),
  socketInfo: socketInfoSchema,
  itemLimit: itemLimitSchema,
});

const mainHandSchema = z.object({
  id: z.number(),
  bonus_id: z.string(),
  enchant_id: z.string(),
  context: z.string(),
  crafted_stats: z.string(),
  equipped: z.boolean(),
  name: z.string(),
  icon: z.string(),
  quality: z.number(),
  itemClass: z.number(),
  itemSubClass: z.number(),
  inventoryType: z.number(),
  itemLevel: z.number(),
  stats: z.array(statSchema),
  bonusLists: z.array(z.number()),
  sources: z.array(sourceSchema),
  profession: professionSchema,
  expansion: z.number(),
  baseItemLevel: z.number(),
  effects: z.array(effectSchema),
  socketInfo: socketInfoSchema,
  guid: z.string(),
});

const ringSchema = z.object({
  id: z.number(),
  bonus_id: z.string(),
  gem_id: z.string(),
  enchant_id: z.string(),
  context: z.string(),
  crafted_stats: z.string(),
  equipped: z.boolean(),
  name: z.string(),
  icon: z.string(),
  quality: z.number(),
  itemClass: z.number(),
  itemSubClass: z.number(),
  inventoryType: z.number(),
  itemLevel: z.number(),
  socketInfo: socketInfoSchema,
  uniqueEquipped: z.boolean(),
  stats: z.array(statSchema),
  bonusLists: z.array(z.number()),
  sources: z.array(sourceSchema),
  profession: professionSchema,
  expansion: z.number(),
  baseItemLevel: z.number(),
});

const upgradeSchema = z.object({
  level: z.number(),
  max: z.number(),
  group: z.number(),
  name: z.string(),
  costs: z.array(costSchema),
  bonusId: z.number(),
  itemLevel: z.number(),
  highWatermarkDiscounts: z.array(highWatermarkDiscountSchema),
  seasonId: z.number(),
});

const headSchema = z.object({
  id: z.number(),
  bonus_id: z.string(),
  context: z.string(),
  equipped: z.boolean(),
  name: z.string(),
  icon: z.string(),
  quality: z.number(),
  itemClass: z.number(),
  itemSubClass: z.number(),
  inventoryType: z.number(),
  itemLevel: z.number(),
  itemSetId: z.number(),
  allowableClasses: z.array(z.number()),
  stats: z.array(statSchema),
  bonusLists: z.array(z.number()),
  sources: z.array(sourceSchema),
  expansion: z.number(),
  baseItemLevel: z.number(),
  socketInfo: socketInfoSchema,
  upgrade: upgradeSchema,
});

const shoulderSchema = z.object({
  id: z.number(),
  bonus_id: z.string(),
  context: z.string(),
  equipped: z.boolean(),
  name: z.string(),
  icon: z.string(),
  quality: z.number(),
  itemClass: z.number(),
  itemSubClass: z.number(),
  inventoryType: z.number(),
  itemLevel: z.number(),
  itemSetId: z.number(),
  allowableClasses: z.array(z.number()),
  stats: z.array(statSchema),
  bonusLists: z.array(z.number()),
  sources: z.array(sourceSchema),
  expansion: z.number(),
  baseItemLevel: z.number(),
  socketInfo: socketInfoSchema,
  upgrade: upgradeSchema,
});

const backSchema = z.object({
  id: z.number(),
  bonus_id: z.string(),
  context: z.string(),
  equipped: z.boolean(),
  name: z.string(),
  icon: z.string(),
  quality: z.number(),
  itemClass: z.number(),
  itemSubClass: z.number(),
  inventoryType: z.number(),
  itemLevel: z.number(),
  stats: z.array(statSchema),
  bonusLists: z.array(z.number()),
  sources: z.array(sourceSchema),
  expansion: z.number(),
  baseItemLevel: z.number(),
  socketInfo: socketInfoSchema,
  upgrade: upgradeSchema,
});

const chestSchema = z.object({
  id: z.number(),
  bonus_id: z.string(),
  context: z.string(),
  equipped: z.boolean(),
  name: z.string(),
  icon: z.string(),
  quality: z.number(),
  itemClass: z.number(),
  itemSubClass: z.number(),
  inventoryType: z.number(),
  itemLevel: z.number(),
  itemSetId: z.number(),
  allowableClasses: z.array(z.number()),
  stats: z.array(statSchema),
  bonusLists: z.array(z.number()),
  sources: z.array(sourceSchema),
  expansion: z.number(),
  baseItemLevel: z.number(),
  socketInfo: socketInfoSchema,
  upgrade: upgradeSchema,
});

const wristSchema = z.object({
  id: z.number(),
  bonus_id: z.string(),
  context: z.string(),
  equipped: z.boolean(),
  name: z.string(),
  icon: z.string(),
  quality: z.number(),
  itemClass: z.number(),
  itemSubClass: z.number(),
  inventoryType: z.number(),
  itemLevel: z.number(),
  stats: z.array(statSchema),
  bonusLists: z.array(z.number()),
  sources: z.array(sourceSchema),
  expansion: z.number(),
  baseItemLevel: z.number(),
  socketInfo: socketInfoSchema,
  upgrade: upgradeSchema,
});

const handSchema = z.object({
  id: z.number(),
  bonus_id: z.string(),
  context: z.string(),
  equipped: z.boolean(),
  name: z.string(),
  icon: z.string(),
  quality: z.number(),
  itemClass: z.number(),
  itemSubClass: z.number(),
  inventoryType: z.number(),
  itemLevel: z.number(),
  itemSetId: z.number(),
  allowableClasses: z.array(z.number()),
  stats: z.array(statSchema),
  bonusLists: z.array(z.number()),
  sources: z.array(sourceSchema),
  expansion: z.number(),
  baseItemLevel: z.number(),
  socketInfo: socketInfoSchema,
  upgrade: upgradeSchema,
});

const legSchema = z.object({
  id: z.number(),
  bonus_id: z.string(),
  enchant_id: z.string(),
  context: z.string(),
  equipped: z.boolean(),
  name: z.string(),
  icon: z.string(),
  quality: z.number(),
  itemClass: z.number(),
  itemSubClass: z.number(),
  inventoryType: z.number(),
  itemLevel: z.number(),
  stats: z.array(statSchema),
  bonusLists: z.array(z.number()),
  sources: z.array(sourceSchema),
  expansion: z.number(),
  baseItemLevel: z.number(),
  socketInfo: socketInfoSchema,
  upgrade: upgradeSchema,
});

const offHandSchema = z.object({
  id: z.number(),
  bonus_id: z.string(),
  context: z.string(),
  equipped: z.boolean(),
  name: z.string(),
  icon: z.string(),
  quality: z.number(),
  itemClass: z.number(),
  itemSubClass: z.number(),
  inventoryType: z.number(),
  itemLevel: z.number(),
  stats: z.array(statSchema),
  bonusLists: z.array(z.number()),
  sources: z.array(sourceSchema),
  expansion: z.number(),
  baseItemLevel: z.number(),
  socketInfo: socketInfoSchema,
  upgrade: upgradeSchema,
  guid: z.string(),
});

const trinketSchema = z.object({
  id: z.number(),
  bonus_id: z.string(),
  context: z.string(),
  equipped: z.boolean(),
  name: z.string(),
  icon: z.string(),
  quality: z.number(),
  itemClass: z.number(),
  itemSubClass: z.number(),
  inventoryType: z.number(),
  itemLevel: z.number(),
  uniqueEquipped: z.boolean(),
  specs: z.array(z.number()).optional(),
  stats: z.array(statSchema),
  bonusLists: z.array(z.number()),
  sources: z.array(sourceSchema),
  expansion: z.number(),
  baseItemLevel: z.number(),
  socketInfo: socketInfoSchema,
  upgrade: upgradeSchema,
  onUseTrinket: z.boolean().optional(),
});

const gearSchema = z.object({
  head: z.array(headSchema),
  neck: z.array(neckSchema),
  shoulder: z.array(shoulderSchema),
  back: z.array(backSchema),
  chest: z.array(chestSchema),
  wrist: z.array(wristSchema),
  hands: z.array(handSchema),
  waist: z.array(waistSchema),
  legs: z.array(legSchema),
  feet: z.array(footSchema),
  main_hand: z.array(mainHandSchema),
  off_hand: z.array(offHandSchema),
  rings: z.array(ringSchema),
  trinkets: z.array(trinketSchema),
});

const gearStatsSchema = z.object({
  id: z.number(),
  bonus_id: z.array(z.number()),
  enchant_id: z.number().optional(),
  context: z.number().optional(),
  gem_id: z.string().optional(),
  crafted_stats: z.number().optional()
})

export const gearOutputSchema = z.object({
  simcInput: z.string(),
  gearInfo: gearSchema,
  gearStats: gearStatsSchema
});
