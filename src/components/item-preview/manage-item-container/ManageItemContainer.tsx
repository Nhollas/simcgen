import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui"
import { isEnchantable, isSocketable } from "@/lib/wow"
import { GearItemSchema, GearOutputSchema } from "@/schemas"
import { PenBox, Trash2, CopyPlus } from "lucide-react"
import { ManageSocket } from "./mange-socket"
import { ItemPreview } from "../item-preview"
import { ManageEnchantment } from "./manage-enchantment"
import { useFieldArray, useFormContext } from "react-hook-form"
import { inventoryTypeToSlot } from "@/lib/raidbots"

// TODO: This should be EditItemContainer and follow the container/presentational pattern
export function ManageItemContainer({ item }: { item: GearItemSchema }) {
  // Need to use parent form context to pass down. Otherwise, the form context gets out of sync. ??
  const form = useFormContext<GearOutputSchema>()
  const { inventoryType } = item
  const slot = inventoryTypeToSlot(inventoryType)
  const { fields, update } = useFieldArray({
    control: form.control,
    name: `gearInfo.${slot}` as const,
  })

  const index = fields.findIndex((field) => field.unique_id === item.unique_id)
  const field = fields[index]

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="absolute -right-4 -top-4 h-10 w-10 rounded-full"
        >
          <PenBox className="h-4 w-4 flex-shrink-0 text-secondary-foreground" />
          <span className="sr-only">Actions</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Item</DialogTitle>
          <DialogDescription>
            Make changes to this item. Changes will automatically be saved.
          </DialogDescription>
        </DialogHeader>
        <ItemPreview item={item} />
        {isSocketable(inventoryType) && (
          <ManageSocket update={update} item={field} index={index} />
        )}
        {isEnchantable(inventoryType) && (
          <ManageEnchantment
            item={item}
            index={index}
            slot={slot}
            update={update}
          />
        )}
        <div className="grid grid-cols-2 gap-x-4">
          <Button className="flex w-full flex-row">
            <CopyPlus className="mr-2 h-4 w-4" />
            <span>Duplicate</span>
          </Button>
          <Button variant="destructive" className="flex w-full flex-row">
            <Trash2 className="mr-2 h-4 w-4" />
            <span>Remove</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
