import { qualityTypeToColour } from "@/lib/raidbots"
import { Button } from "../ui"
import { createGemTooltipUrl } from "@/lib/wowhead"
import Link from "next/link"
import Image from "next/image"
import { GemSchema } from "@/schemas"

export function GemPreviews({ gems }: { gems: GemSchema[] }) {
  return (
    <div className="flex flex-row gap-x-2">
      {gems?.map((gem, i) => (
        <div
          key={i}
          className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-primary p-0.5 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          style={{
            backgroundColor: qualityTypeToColour(gem.quality || 0),
          }}
        >
          <Link
            className="relative h-5 w-5 overflow-hidden rounded-md"
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
        </div>
      ))}
    </div>
  )
}
