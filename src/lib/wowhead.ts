import { GearItemSchema, GemSchema } from "@/schemas";

function formatItemName(name?: string) {
  if (!name) {
    return "";
  }

  return name.toLowerCase().replace(/'/g, "").replace(/ /g, "-");
}

function formatBonusId(bonusId: string) {
  return bonusId.split("/").join(":");
}

export function createTooltipUrl(item: GearItemSchema) {
  const formattedName = formatItemName(item.name);
  const baseUrl = new URL(`https://www.wowhead.com/item=${item.id}/${formattedName}`);

  baseUrl.searchParams.append("ilvl", item.itemLevel.toString());

  if (item.bonus_id) {
    baseUrl.searchParams.append("bonus", formatBonusId(item.bonus_id));
  }

  if (item.enchant_id) {
    baseUrl.searchParams.append("ench", item.enchant_id.toString());
  }

  if (item.socketInfo?.PRISMATIC?.gemIds.length) {
    const gemIds = item.socketInfo.PRISMATIC.gemIds.join(":");

    baseUrl.searchParams.append("gems", gemIds);
  }

  if (item.setPieces) {
    const formattedSetPices = item.setPieces.join(":");

    baseUrl.searchParams.append("pcs", formattedSetPices);
  }

  return decodeURIComponent(baseUrl.toString());
}

export function createGemTooltipUrl(gem: GemSchema) {
  return `https://www.wowhead.com/item=${gem.itemId}?crafting-quality=6`;
}