import { qualityTypeToColour } from "@/lib/raidbots";
import { Button } from "../ui";
import { createTooltipUrl } from "@/lib/wowhead";
import Link from "next/link";
import Image from "next/image";

export function MiniItemPreview({ item }: { item: any }) {
  return (
    <div className="flex flex-row w-full gap-x-3 gap-y-2 relative bg-muted p-1.5 rounded-lg h-[50px] items-center">
      <Button
        className="p-0.5 h-full flex-none"
        style={{
          backgroundColor: qualityTypeToColour(item.quality),
        }}
      >
        <Link
          className="relative h-full aspect-square rounded-md overflow-hidden"
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
      <div className="space-y-1 flex flex-col truncate">
        <h1
          style={{ color: qualityTypeToColour(item.quality) }}
          className="truncate text-sm font-bold leading-5"
        >
          {item.name}
        </h1>
      </div>
    </div>
  );
}
