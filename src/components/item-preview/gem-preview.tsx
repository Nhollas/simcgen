import { qualityTypeToColour } from "@/lib/raidbots"
import { Button } from "../ui"
import { createGemTooltipUrl } from "@/lib/wowhead"
import Link from "next/link"
import Image from "next/image"
import gems from "@/data/gems.json"

export function GemPreview({ gemId }: { gemId: number }) {
  const gem = gems.find((gem) => gem.id === gemId)

  if (!gem) {
    return null
  }

  return (
    <div className="flex flex-row gap-x-2 items-center">
      <Button
        className="h-6 w-6 rounded-md p-0.5"
        style={{
          backgroundColor: qualityTypeToColour(gem.quality || 0),
        }}
      >
        <Link
          className="relative h-5 w-5 overflow-hidden rounded-md"
          // @ts-ignore
          href={createGemTooltipUrl(gem)}
        >
          <Image
            src={`https://www.raidbots.com/static/images/icons/56/${gem.itemIcon}.png`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt={gem.itemName}
          />
          {gem.craftingQuality && (
            <Image
              src={`https://www.raidbots.com/images/crafting-quality-${gem.craftingQuality}.png`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              alt="Crafting Quality"
            />
          )}
        </Link>
      </Button>
      <p>{gem.displayName}</p>
    </div>
  )
}
