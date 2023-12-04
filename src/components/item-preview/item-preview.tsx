import { qualityTypeToColour } from "@/lib/raidbots"
import { Badge, Button } from "../ui"
import { createTooltipUrl } from "@/lib/wowhead"
import Link from "next/link"
import Image from "next/image"
import { GemPreviews } from "./gem-previews"
import { EnchantmentPreview } from "./enchantment-preview"
import { GearItemSchema } from "@/schemas"
import { EditItem } from "./edit-item"
import clsx from "clsx"

export function ItemPreview({
  item,
  noAction,
}: {
  item: GearItemSchema
  noAction?: boolean
}) {
  console.log("item", item)

  return (
    <div
      className={clsx(
        "relative flex h-[72px] w-full flex-row items-start gap-x-3 gap-y-4 rounded-lg bg-muted p-3",
        noAction && "overflow-hidden",
      )}
    >
      <Button
        className="h-full p-0.5"
        style={{
          backgroundColor: qualityTypeToColour(item.quality),
        }}
      >
        <Link
          className="relative aspect-square h-full overflow-hidden rounded-md"
          href={createTooltipUrl(item)}
        >
          <Image
            src={`https://www.raidbots.com/static/images/icons/56/${item.icon}.png`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt={item.name}
          />
        </Link>
      </Button>
      <div className="flex flex-col space-y-1 truncate">
        <div className="flex flex-row gap-x-4">
          <h1
            style={{ color: qualityTypeToColour(item.quality) }}
            className="truncate text-base font-bold leading-5"
          >
            {item.name}
          </h1>
          {item.equipped && <Badge className="bg-yellow-500">Equipped</Badge>}
        </div>
        <div className="flex flex-row items-center gap-x-2 h-6">
          <p className="flex-shrink-0 text-sm leading-3">{item.itemLevel}</p>
          {item.socketInfo.PRISMATIC && (
            <GemPreviews gems={item.socketInfo.PRISMATIC.gems} />
          )}
          {item.enchant_id && (
            <EnchantmentPreview enchantmentId={parseInt(item.enchant_id)} />
          )}
        </div>
      </div>
      {!noAction && <EditItem item={item} />}
    </div>
  )
}
