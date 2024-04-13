import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
} from "@/components/ui"
import { GearItemSchema } from "@/schemas"
import { CopyPlus } from "lucide-react"
import { UseFieldArrayAppend } from "react-hook-form"
import { ItemPreview } from "../item-preview"

export function DuplicateAction({
  append,
  item,
}: {
  append: UseFieldArrayAppend<any>
  item: GearItemSchema
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="flex w-full flex-row">
          <CopyPlus className="mr-2 h-4 w-4" />
          <span>Duplicate</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to duplicate this item?
          </AlertDialogTitle>
          <ItemPreview item={item} />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
