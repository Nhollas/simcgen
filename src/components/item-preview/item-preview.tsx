import { qualityTypeToColour } from "@/lib/raidbots"
import { Badge, Button } from "../ui"
import { createTooltipUrl } from "@/lib/wowhead"
import Link from "next/link"
import Image from "next/image"
import { GemPreviews } from "./gem-previews"
import { EnchantmentPreview } from "./enchantment-preview"
import { GearItemSchema } from "@/schemas"
import { ManageItemContainer } from "./manage-item-container"
import { cn } from "@/lib/utils"

export function ItemPreview({
  item,
  manage = false,
}: {
  item: GearItemSchema
  manage?: boolean
}) {
  const { icon, quality, itemLevel, enchant_id, socketInfo, name, equipped } =
    item

  return (
    <div
      className={cn(
        "relative flex h-[72px] w-full flex-row items-start gap-x-3 gap-y-4 rounded-lg bg-muted p-3",
        manage && "overflow-hidden",
      )}
    >
      <Button
        className="h-full p-0.5"
        style={{
          backgroundColor: qualityTypeToColour(quality),
        }}
      >
        <Link
          className="relative aspect-square h-full overflow-hidden rounded-md"
          href={createTooltipUrl(item)}
        >
          <Image
            src={`https://www.raidbots.com/static/images/icons/56/${icon}.png`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt={name}
          />
        </Link>
      </Button>
      <div className="flex flex-col space-y-1 truncate">
        <div className="flex flex-row gap-x-4">
          <h1
            style={{ color: qualityTypeToColour(quality) }}
            className="truncate text-base font-bold leading-5"
          >
            {name}
          </h1>
          {equipped && <Badge className="bg-yellow-500">Equipped</Badge>}
        </div>
        <div className="flex h-6 flex-row items-center gap-x-2">
          <p className="flex-shrink-0 text-sm leading-3">{itemLevel}</p>
          {socketInfo.PRISMATIC && (
            <GemPreviews gems={socketInfo.PRISMATIC.gems} />
          )}
          {enchant_id && (
            <EnchantmentPreview enchantmentId={parseInt(enchant_id)} />
          )}
        </div>
      </div>
      {manage && <ManageItemContainer item={item} />}
    </div>
  )
}
