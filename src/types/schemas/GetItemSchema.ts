import { z } from "zod";
import { socketInfoSchema } from "./GearOutputSchema";

/* {
    "id": 1169,
    "name": "Blackskull Shield",
    "icon": "spell_shadow_grimward",
    "quality": 4,
    "itemClass": 4,
    "itemSubClass": 6,
    "inventoryType": 14,
    "itemLevel": 24,
    "baseItemLevel": 24,
    "socketInfo": {}
},
*/

export type GetItemSchema = z.infer<typeof GetItemSchema>;
const itemSchema = z.object({
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
});

export type ItemSchema = z.infer<typeof itemSchema>;

export const GetItemSchema = z.array(itemSchema);
