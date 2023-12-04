import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui"
import { isSocketable } from "@/lib/wow"
import { GearItemSchema } from "@/schemas"
import { PenBox, Trash2, CopyPlus } from "lucide-react"
import { ManageSocket } from "./mange-socket"
import { ItemPreview } from "../item-preview"
import { ManageEnchantment } from "./manage-enchantment"

export function EditItem({ item }: { item: GearItemSchema }) {
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
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Edit Item</DialogTitle>
          <DialogDescription>
            Make changes to this item. Changes will automatically be saved.
          </DialogDescription>
        </DialogHeader>
        <ItemPreview item={item} noAction />
        {isSocketable(item.inventoryType) && <ManageSocket item={item} />}
        <ManageEnchantment item={item} />
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
