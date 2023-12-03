import { Checkbox, Input } from "@/components/ui"
import { GearItemSchema } from "@/schemas"
import { GemPreviews } from "../gem-previews"

export function ManageSocket({ item }: { item: GearItemSchema }) {
  if (item.inventoryType === 2) {
    return <Input type="number" placeholder="Socket Bonus" />
  }

  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" checked={item.socketInfo.PRISMATIC?.filled === 1} />
      <GemPreviews gems={item.socketInfo.PRISMATIC?.gems || []} />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Socket
      </label>
    </div>
  )
}
