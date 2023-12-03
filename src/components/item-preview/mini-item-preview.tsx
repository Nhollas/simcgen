import { qualityTypeToColour } from "@/lib/raidbots"
import { Button } from "../ui"
import { createTooltipUrl } from "@/lib/wowhead"
import Link from "next/link"
import Image from "next/image"
import { GearItemSchema } from "@/schemas"

export function MiniItemPreview({ item }: { item: GearItemSchema }) {
  return (
    <div className="relative flex h-[50px] w-full flex-row items-center gap-x-3 gap-y-2 rounded-lg bg-muted p-1.5">
      <Button
        className="h-full flex-none p-0.5"
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
        <h1
          style={{ color: qualityTypeToColour(item.quality) }}
          className="truncate text-sm font-bold leading-5"
        >
          {item.name}
        </h1>
      </div>
    </div>
  )
}
