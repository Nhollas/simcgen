import { z } from "zod"
import { socketInfoSchema } from "./GearOutputSchema"

const searchItemSchema = z.object({
  id: z.number(),
  unique_id: z.string(),
  name: z.string(),
  icon: z.string(),
  quality: z.number(),
  itemClass: z.number(),
  itemSubClass: z.number(),
  inventoryType: z.number(),
  itemLevel: z.number(),
  baseItemLevel: z.number(),
  socketInfo: socketInfoSchema,
})

export type SearchItemSchema = z.infer<typeof searchItemSchema>
export type SearchGearSchema = SearchItemSchema[]
export const searchGearSchema = z.array(searchItemSchema)
