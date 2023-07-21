export interface GetItemInfoRequest {
  gear: Gear
}

export interface Gear {
  head: HeadItem[]
  neck: NeckItem[]
  shoulder: ShoulderItem[]
  back: BackItem[]
  chest: ChestItem[]
  wrist: WristItem[]
  hands: HandItem[]
  waist: WaistItem[]
  legs: LegItem[]
  feet: FootItem[]
  main_hand: MainHandItem[]
  off_hand: OffHandItem[]
  unknown: UnknownItem[]
  rings: RingItem[]
  trinkets: TrinketItem[]
}

export interface HeadItem {
  id: string
  bonus_id: string
  gem_id: string
  context: string
  equipped: boolean
}

export interface OffHandItem {

}

export interface UnknownItem {
}

export interface NeckItem {
  id: string
  bonus_id: string
  gem_id: string
  context: string
  equipped: boolean
}

export interface ShoulderItem {
  id: string
  bonus_id: string
  context: string
  equipped: boolean
}

export interface BackItem {
  id: string
  bonus_id: string
  enchant_id: string
  context: string
  equipped: boolean
}

export interface ChestItem {
  id: string
  bonus_id: string
  enchant_id: string
  context: string
  equipped: boolean
}

export interface WristItem {
  id: string
  bonus_id: string
  gem_id: string
  enchant_id: string
  context: string
  equipped: boolean
}

export interface HandItem {
  id: string
  bonus_id: string
  context: string
  equipped: boolean
}

export interface WaistItem {
  id: string
  bonus_id: string
  gem_id: string
  enchant_id: string
  context: string
  crafted_stats: string
  equipped: boolean
}

export interface LegItem {
  id: string
  bonus_id: string
  enchant_id: string
  context: string
  equipped: boolean
}

export interface FootItem {
  id: string
  bonus_id: string
  enchant_id: string
  context: string
  equipped: boolean
}

export interface MainHandItem {
  id: string
  bonus_id: string
  enchant_id: string
  context: string
  equipped: boolean
}

export interface RingItem {
  id: string
  bonus_id: string
  gem_id: string
  enchant_id: string
  context: string
  crafted_stats: string
  equipped: boolean
}

export interface TrinketItem {
  id: string
  bonus_id: string
  context: string
  equipped: boolean
}



export interface GetItemInfoResponse {
  head: Head[];
  neck: Neck[];
  shoulder: Shoulder[];
  back: Back[];
  chest: Chest[];
  wrist: Wrist[];
  hands: Hand[];
  waist: Waist[];
  legs: Leg[];
  feet: Foot[];
  main_hand: MainHand[];
  off_hand: OffHand[];
  rings: Ring[];
  trinkets: Trinket[];
}

interface Head {
  id: number;
  bonus_id: string;
  context: string;
  equipped: boolean;
  name: string;
  icon: string;
  quality: number;
  itemClass: number;
  itemSubClass: number;
  inventoryType: number;
  itemLevel: number;
  itemSetId: number;
  allowableClasses: number[];
  stats: Stat[];
  bonusLists: number[];
  sources: Source[];
  expansion: number;
  baseItemLevel: number;
  socketInfo: SocketInfo;
  upgrade: Upgrade;
}

interface Stat {
  id: number;
  alloc: number;
}

interface Source {
  instanceId: number;
  encounterId: number;
}

interface SocketInfo {
    PRISMATIC?: Prismatic;
}

interface Upgrade {
  level: number;
  max: number;
  group: number;
  name: string;
  costs: Cost[];
  bonusId: number;
  itemLevel: number;
  highWatermarkDiscounts: HighWatermarkDiscount[];
  seasonId: number;
}

interface Cost {
  mask_inv_type: number;
  flags: number;
  amounts: Amount[];
}

interface Amount {
  currencyId?: number;
  amount: number;
  name: string;
  icon: string;
  itemId?: number;
}

interface HighWatermarkDiscount {
  type: string;
  id: number;
  scaling: number;
  accountWide: boolean;
}

interface Neck {
  id: number;
  bonus_id: string;
  context: string;
  crafted_stats: string;
  equipped: boolean;
  name: string;
  icon: string;
  quality: number;
  itemClass: number;
  itemSubClass: number;
  inventoryType: number;
  itemLevel: number;
  socketInfo: SocketInfo;
  stats: Stat[];
  bonusLists: number[];
  sources: Source[];
  profession: Profession;
  expansion: number;
  baseItemLevel: number;
}
interface Prismatic {
  type: string;
  staticSlots: number;
  dynamicSlots: number;
  filled: number;
  total: number;
  gems: Gem[];
  gemIds: string[];
  hasUnique: boolean;
}

interface Profession {
  id: number;
  recipeSpellId: number;
  optionalCraftingSlots: OptionalCraftingSlot[];
}

interface OptionalCraftingSlot {
  id: number;
  count: number;
  recraftCount: number;
}

interface Shoulder {
  id: number;
  bonus_id: string;
  context: string;
  equipped: boolean;
  name: string;
  icon: string;
  quality: number;
  itemClass: number;
  itemSubClass: number;
  inventoryType: number;
  itemLevel: number;
  itemSetId: number;
  allowableClasses: number[];
  stats: Stat[];
  bonusLists: number[];
  sources: Source[];
  expansion: number;
  baseItemLevel: number;
  socketInfo: SocketInfo;
  upgrade: Upgrade;
}

interface Back {
  id: number;
  bonus_id: string;
  context: string;
  equipped: boolean;
  name: string;
  icon: string;
  quality: number;
  itemClass: number;
  itemSubClass: number;
  inventoryType: number;
  itemLevel: number;
  stats: Stat[];
  bonusLists: number[];
  sources: Source[];
  expansion: number;
  baseItemLevel: number;
  socketInfo: SocketInfo;
  upgrade: Upgrade
}


interface Chest {
  id: number;
  bonus_id: string;
  context: string;
  equipped: boolean;
  name: string;
  icon: string;
  quality: number;
  itemClass: number;
  itemSubClass: number;
  inventoryType: number;
  itemLevel: number;
  itemSetId: number;
  allowableClasses: number[];
  stats: Stat[];
  bonusLists: number[];
  sources: Source[];
  expansion: number;
  baseItemLevel: number;
  socketInfo: SocketInfo;
  upgrade: Upgrade;
}

interface Wrist {
  id: number;
  bonus_id: string;
  context: string;
  equipped: boolean;
  name: string;
  icon: string;
  quality: number;
  itemClass: number;
  itemSubClass: number;
  inventoryType: number;
  itemLevel: number;
  stats: Stat[];
  bonusLists: number[];
  sources: Source[];
  expansion: number;
  baseItemLevel: number;
  socketInfo: SocketInfo;
  upgrade: Upgrade;
}

interface Hand {
  id: number;
  bonus_id: string;
  context: string;
  equipped: boolean;
  name: string;
  icon: string;
  quality: number;
  itemClass: number;
  itemSubClass: number;
  inventoryType: number;
  itemLevel: number;
  itemSetId: number;
  allowableClasses: number[];
  stats: Stat[];
  bonusLists: number[];
  sources: Source[];
  expansion: number;
  baseItemLevel: number;
  socketInfo: SocketInfo;
  upgrade: Upgrade;
}


interface Waist {
  id: number;
  bonus_id: string;
  context: string;
  crafted_stats: string;
  equipped: boolean;
  name: string;
  icon: string;
  quality: number;
  itemClass: number;
  itemSubClass: number;
  inventoryType: number;
  itemLevel: number;
  stats: Stat[];
  bonusLists: number[];
  sources: Source[];
  profession: Profession;
  expansion: number;
  baseItemLevel: number;
  effects: Effect[];
  socketInfo: SocketInfo;
  itemLimit: ItemLimit;
}

interface Effect {
  id: number;
  index: number;
  spell: Spell;
}

interface Spell {
  id: number;
  name: string;
  icon: string;
}

interface ItemLimit {
  category: number;
  quantity: number;
  name: string;
}

interface Leg {
  id: number;
  bonus_id: string;
  enchant_id: string;
  context: string;
  equipped: boolean;
  name: string;
  icon: string;
  quality: number;
  itemClass: number;
  itemSubClass: number;
  inventoryType: number;
  itemLevel: number;
  stats: Stat[];
  bonusLists: number[];
  sources: Source[];
  expansion: number;
  baseItemLevel: number;
  socketInfo: SocketInfo;
  upgrade: Upgrade;
}

interface Foot {
  id: number;
  bonus_id: string;
  context: string;
  crafted_stats: string;
  equipped: boolean;
  name: string;
  icon: string;
  quality: number;
  itemClass: number;
  itemSubClass: number;
  inventoryType: number;
  itemLevel: number;
  stats: Stat[];
  bonusLists: number[];
  sources: Source[];
  profession: Profession;
  expansion: number;
  baseItemLevel: number;
  effects: Effect[];
  socketInfo: SocketInfo;
  itemLimit: ItemLimit;
}

interface MainHand {
  id: number;
  bonus_id: string;
  enchant_id: string;
  context: string;
  crafted_stats: string;
  equipped: boolean;
  name: string;
  icon: string;
  quality: number;
  itemClass: number;
  itemSubClass: number;
  inventoryType: number;
  itemLevel: number;
  stats: Stat[];
  bonusLists: number[];
  sources: Source[];
  profession: Profession;
  expansion: number;
  baseItemLevel: number;
  effects: Effect[];
  socketInfo: SocketInfo;
  guid: string;
}

interface OffHand {
  id: number;
  bonus_id: string;
  context: string;
  equipped: boolean;
  name: string;
  icon: string;
  quality: number;
  itemClass: number;
  itemSubClass: number;
  inventoryType: number;
  itemLevel: number;
  stats: Stat[];
  bonusLists: number[];
  sources: Source[];
  expansion: number;
  baseItemLevel: number;
  socketInfo: SocketInfo;
  upgrade: Upgrade;
  guid: string;
}

interface Ring {
  id: number;
  bonus_id: string;
  gem_id: string;
  enchant_id: string;
  context: string;
  crafted_stats: string;
  equipped: boolean;
  name: string;
  icon: string;
  quality: number;
  itemClass: number;
  itemSubClass: number;
  inventoryType: number;
  itemLevel: number;
  socketInfo: SocketInfo;
  uniqueEquipped: boolean;
  stats: Stat[];
  bonusLists: number[];
  sources: Source[];
  profession: Profession;
  expansion: number;
  baseItemLevel: number;
}

interface Gem {
  slot: string;
  shortName: string;
  group: string;
  preferred: Preferred;
  id: number;
  displayName: string;
  spellIcon: string;
  itemId: number;
  itemName: string;
  itemIcon: string;
  quality: number;
  expansion: number;
  craftingQuality: number;
  tokenizedName: string;
  socketType: number;
  stats: Stat[];
  key: string;
  name: string;
  type: string;
  dps: boolean;
}

interface Preferred {
  roles: string[];
}

interface Trinket {
  id: number;
  bonus_id: string;
  context: string;
  equipped: boolean;
  name: string;
  icon: string;
  quality: number;
  itemClass: number;
  itemSubClass: number;
  inventoryType: number;
  itemLevel: number;
  uniqueEquipped: boolean;
  specs?: number[];
  stats: Stat[];
  bonusLists: number[];
  sources: Source[];
  expansion: number;
  baseItemLevel: number;
  socketInfo: SocketInfo;
  upgrade: Upgrade;
  onUseTrinket?: boolean;
}