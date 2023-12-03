import { qualityTypeToColour } from "@/lib/raidbots";
import { Badge, Button } from "../ui";
import { createTooltipUrl } from "@/lib/wowhead";
import Link from "next/link";
import Image from "next/image";
import { GemPreviews } from "./gem-previews";
import { EnchantmentPreview } from "./enchantment-preview";
import { X } from "lucide-react";
import { GearItemSchema } from "@/schemas";

export function ItemPreview({ item }: { item: GearItemSchema }) {
  return (
    <div className="flex flex-row items-start w-full gap-x-3 gap-y-4 relative bg-muted p-3 rounded-lg h-[72px]">
      <Button
        className="p-0.5 h-full flex-none"
        style={{
          backgroundColor: qualityTypeToColour(item.quality),
        }}
      >
        <Link
          className="relative h-full aspect-square rounded-md overflow-hidden"
          href={createTooltipUrl(item, )}
        >
          <Image
            src={`https://www.raidbots.com/static/images/icons/56/${item.icon}.png`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt={item.name}
          />
        </Link>
      </Button>
      <div className="space-y-1 flex flex-col truncate">
        <div className="flex flex-row gap-x-4">
          <h1
            style={{ color: qualityTypeToColour(item.quality) }}
            className="truncate text-base font-bold leading-5"
          >
            {item.name}
          </h1>
          {item.equipped && <Badge className="bg-yellow-500">Equipped</Badge>}
        </div>
        <div className="flex flex-row gap-x-2 items-center">
          <p className="text-sm leading-3 flex-shrink-0">{item.itemLevel}</p>
          {item.socketInfo.PRISMATIC && (
            <GemPreviews gems={item.socketInfo.PRISMATIC.gems} />
          )}
          {item.enchant_id && (
            <EnchantmentPreview enchantmentId={item.enchant_id} />
          )}
        </div>
      </div>
      <Button
        onClick={() => {}}
        variant="outline"
        type="button"
        className="h-10 w-10 rounded-full absolute -right-4 -top-4"
      >
        <X className="h-5 w-5 flex-shrink-0" />
        <span className="sr-only">Remove</span>
      </Button>
    </div>
  );
}
