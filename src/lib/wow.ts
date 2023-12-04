import { GearItemSchema } from "@/schemas"

/* If Head, Neck, Wrist, Rings or Belt. */
export function isSocketable(inventoryType: number) {
  return [1, 2, 9, 11, 12, 6].includes(inventoryType)
}

function isSocketed(item: GearItemSchema) {
  return !!item.socketInfo.PRISMATIC
}

export function isSocketAddable(item: GearItemSchema) {
  return isSocketable(item.inventoryType) && !isSocketed(item)
}

export function isEnchantable(inventoryType: number) {
  return [1, 16, 5, 8, 11, 13, 7, 6, 9].includes(inventoryType)
}
