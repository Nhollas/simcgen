import enchantments from "@/data/enchantments.json"
import Link from "next/link"
import Image from "next/image"
import { qualityTypeToColour } from "@/lib/raidbots"

export function EnchantmentPreview({
  enchantmentId,
}: {
  enchantmentId: number
}) {
  const enchantment = enchantments.find(
    (enchantment) => enchantment.id === enchantmentId,
  )

  if (!enchantment) {
    return null
  }

  return (
    <div className="flex flex-row items-center gap-x-2 truncate">
      <div
        className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-6 w-6 flex-none rounded-md p-0.5"
        style={{
          backgroundColor: qualityTypeToColour(enchantment.quality || 0),
          color: "white",
        }}
      >
        <Link
          className="relative h-5 w-5 overflow-hidden rounded-md"
          href={`https://www.wowhead.com/item=${enchantment.itemId}`}
        >
          <Image
            src={`https://www.raidbots.com/static/images/icons/56/${enchantment.itemIcon}.png`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt={enchantment.displayName}
          />
          {enchantment.craftingQuality && (
            <Image
              src={`https://www.raidbots.com/images/crafting-quality-${enchantment.craftingQuality}.png`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              alt="Crafting Quality"
            />
          )}
        </Link>
      </div>
      <p
        className="truncate text-sm leading-4"
        style={{
          color: qualityTypeToColour(2),
        }}
      >
        {enchantment.displayName}
      </p>
    </div>
  )
}
