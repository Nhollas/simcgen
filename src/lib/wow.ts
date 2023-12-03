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
