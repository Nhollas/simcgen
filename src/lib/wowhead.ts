function formatItemName(name?: string) {
    if (!name) {
      return "";
    }

    return name.toLowerCase().replace(/'/g, "").replace(/ /g, "-");
  }
  
  function formatBonusId(bonusId?: string) {
    if (!bonusId) {
      return "";
    }
  
    return bonusId.split("/").join(":");
  }

export function createTooltipUrl(item: any, setPieces?: number[]) {
    return `https://www.wowhead.com/item=${item.id}/${formatItemName(
      item.name
    )}?bonus=${formatBonusId(item.bonus_id)}&ilvl=${
      item.itemLevel
    }&ench=${item.enchant_id}&gems=${item.socketInfo?.PRISMATIC?.gemIds.join(":")}&spec=103${item.itemSetId ? "&pcs=" + setPieces?.join(":") : ""}`;
  }

export function createGemTooltipUrl(gem: any) {
  return `https://www.wowhead.com/item=${gem.itemId}?crafting-quality=6`
}