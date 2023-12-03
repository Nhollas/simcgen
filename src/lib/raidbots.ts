const specIdMap = {
  enhancement: 263,
  mistweaver: 270,
  protection: 73,
  survival: 255,
  discipline: 256,
  brewmaster: 268,
  fury: 72,
  unholy: 252,
  assassination: 259,
  restoration: 105,
  frost: 251,
  arcane: 62,
  holy: 257,
  retribution: 70,
  arms: 71,
  beast_mastery: 253,
  marksmanship: 254,
  shadow: 258,
  subtlety: 261,
  feral: 103,
  guardian: 104,
  destruction: 267,
  fire: 63,
  blood: 250,
  outlaw: 260,
  elemental: 262,
  affliction: 265,
  demonology: 266,
  windwalker: 269,
  balance: 102,
  havoc: 577,
  vengeance: 581,
  devastation: 1467,
  preservation: 1468,
  augmentation: 1473,
}

const classIdMap = {
  hunter: 3,
  warlock: 9,
  druid: 11,
  mage: 8,
  deathknight: 6,
  demonhunter: 12,
  monk: 10,
  priest: 5,
  paladin: 2,
  rogue: 4,
  shaman: 7,
  warrior: 1,
  evoker: 13,
}

export type classKey = keyof typeof classIdMap

export type specKey = keyof typeof specIdMap

export function specToId(specName: keyof typeof specIdMap) {
  return specIdMap[specName]
}

export function specIdToName(specId: number) {
  const specIdMapReverse = Object.fromEntries(
    Object.entries(specIdMap).map(([key, value]) => [value, key]),
  )

  return specIdMapReverse[specId]
}

export function classIdToName(classId: number) {
  const classIdMapReverse = Object.fromEntries(
    Object.entries(classIdMap).map(([key, value]) => [value, key]),
  )

  return classIdMapReverse[classId]
}

export function classToId(className: keyof typeof classIdMap) {
  return classIdMap[className]
}

export function raidbotsQueryParamAdapter(
  filteredLines: string[],
): URLSearchParams {
  const raidbotsQueryParams = ["locale", "plvl", "classId", "specId", "char"]

  const classKeys = [
    "deathknight",
    "demonhunter",
    "druid",
    "hunter",
    "mage",
    "monk",
    "paladin",
    "priest",
    "rogue",
    "shaman",
    "warlock",
    "warrior",
    "evoker",
  ]

  const queryParams = filteredLines.reduce(
    (acc, line) => {
      const [key, value] = line.split("=")
      acc[key] = value
      return acc
    },
    {} as Record<string, string>,
  )

  // Convert queryParams to raidbotsQueryParams
  const raidbotsParams = {} as Record<string, string>

  for (const key in queryParams) {
    const value = queryParams[key]

    if (key === "level") {
      // Convert level to plvl
      raidbotsParams["plvl"] = value
    } else if (key === "spec") {
      // Convert spec to specId
      //@ts-ignore
      raidbotsParams["specId"] = specToId(value)
    } else if (classKeys.includes(key)) {
      // Convert class key to classId
      //@ts-ignore
      raidbotsParams["classId"] = classToId(key)
      // Get the corresponding character name for classId
      raidbotsParams["char"] = value
    } else if (raidbotsQueryParams.includes(key)) {
      // Directly copy other specified query parameters
      raidbotsParams[key] = value
    }
  }

  // Add any missing parameters with default values
  const defaultParams: Record<string, string> = {
    locale: "en_US", // Default locale
  }

  const finalRaidbotsParams = { ...defaultParams, ...raidbotsParams }

  return new URLSearchParams(finalRaidbotsParams)
}

export function qualityTypeToColour(qualityType: number) {
  type QualityTypeMap = {
    [key: number]: string
  }

  const qualityTypeMap: QualityTypeMap = {
    1: "#ffffff",
    2: "#1eff00",
    3: "#0070dd",
    4: "#a335ee",
    5: "#ff8000",
    6: "#e6cc80",
    7: "#00ccff",
  }

  return qualityTypeMap[qualityType]
}

const gearSlots = {
  head: 1,
  neck: 2,
  shoulder: 3,
  back: 16,
  chest: 5,
  wrist: 9,
  hands: 10,
  waist: 6,
  legs: 7,
  feet: 8,
  main_hand: 21,
  off_hand: 22,
  rings: 11,
  trinkets: 12,
}

type GearSlot = keyof typeof gearSlots

export function inventoryTypeToSlot(inventoryType: number) {
  type InventoryTypeMap = Record<number, GearSlot>

  const inventoryTypeMap: InventoryTypeMap = {
    1: "head",
    2: "neck",
    3: "shoulder",
    4: "chest",
    5: "chest",
    6: "waist",
    7: "legs",
    8: "feet",
    9: "wrist",
    10: "hands",
    11: "rings",
    12: "trinkets",
    13: "main_hand",
    14: "off_hand",
    15: "main_hand",
    16: "back",
    17: "main_hand",
    20: "chest",
    21: "main_hand",
    22: "off_hand",
    23: "off_hand",
  }

  const result = inventoryTypeMap[inventoryType]

  if (!result) {
    return "head"
  }

  return result
}
