import { qualityTypeToColour } from "@/lib/raidbots";
import { Button } from "../ui";
import { createGemTooltipUrl } from "@/lib/wowhead";
import Link from "next/link";
import Image from "next/image";
import { GemSchema } from "@/schemas";

export function GemPreviews({ gems }: { gems: GemSchema[] }) {
  return (
    <div className="flex flex-row gap-x-2">
      {gems.map((gem, i) => (
        <Button
          key={i}
          className="p-0.5 h-6 w-6 rounded-md"
          style={{
            backgroundColor: qualityTypeToColour(gem.quality || 0),
          }}
        >
          <Link
            className="h-5 w-5 overflow-hidden relative rounded-md"
            href={createGemTooltipUrl(gem)}
          >
            <Image
              src={`https://www.raidbots.com/static/images/icons/56/${gem.itemIcon}.png`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              alt={gem.name}
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
      ))}
    </div>
  );
}
