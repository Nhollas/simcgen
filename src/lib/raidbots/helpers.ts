import { specIdMap, classIdMap, qualityTypeMap, inventoryTypeMap, classKeys } from "./data";
import { RaidbotsSpecName, RaidbotsSpecId, RaidbotsClassId, RaidbotsClassName, RaidbotsQualityTypeId, RaidbotsQualityTypeColour, RaidbotsInventoryType, RaidbotsInventoryTypeName } from "./types";


export function specToId(specName: RaidbotsSpecName): RaidbotsSpecId {
  return specIdMap[specName]
}

export function specIdToName(specId: RaidbotsSpecId): RaidbotsSpecName | undefined {
  const specIdMapReverse: Record<RaidbotsSpecId, RaidbotsSpecName> = {
    263: "enhancement",
    270: "enhancement",
    73: "enhancement",
    255: "enhancement",
    256: "enhancement",
    268: "enhancement",
    72: "enhancement",
    252: "enhancement",
    259: "enhancement",
    105: "enhancement",
    251: "enhancement",
    62: "enhancement",
    257: "enhancement",
    70: "enhancement",
    71: "enhancement",
    253: "enhancement",
    254: "enhancement",
    258: "enhancement",
    261: "enhancement",
    103: "enhancement",
    104: "enhancement",
    267: "enhancement",
    63: "enhancement",
    250: "enhancement",
    260: "enhancement",
    262: "enhancement",
    265: "enhancement",
    266: "enhancement",
    269: "enhancement",
    102: "enhancement",
    577: "enhancement",
    581: "enhancement",
    1467: "enhancement",
    1468: "enhancement",
    1473: "enhancement"
  };

  return specIdMapReverse[specId];
}

export function classIdToName(classId: RaidbotsClassId): RaidbotsClassName {
  const classIdMapReverse: Record<RaidbotsClassId, RaidbotsClassName> = {
    3: "hunter",
    9: "hunter",
    11: "hunter",
    8: "hunter",
    6: "hunter",
    12: "hunter",
    10: "hunter",
    5: "hunter",
    2: "hunter",
    4: "hunter",
    7: "hunter",
    1: "hunter",
    13: "hunter"
  }

  return classIdMapReverse[classId]
}

export function classToId(className: RaidbotsClassName): RaidbotsClassId {
  return classIdMap[className]
}

export function qualityTypeToColour(qualityType: RaidbotsQualityTypeId): RaidbotsQualityTypeColour {
  return qualityTypeMap[qualityType]
}

export function inventoryTypeToSlot(inventoryType: RaidbotsInventoryType): RaidbotsInventoryTypeName {
  return inventoryTypeMap[inventoryType]
}



/*
  Example input:
  [
    "mage=\"Nickolaki\"",
    "level=70",
    "race=troll",
    "region=eu",
    "server=twisting_nether",
    "role=spell",
    "professions=alchemy=100/",
    "spec=frost"
  ]

  Example converted query params object: 
  {
    "mage": "\"Nickolaki\"",
    "level": "70",
    "race": "troll",
    "region": "eu",
    "server": "twisting_nether",
    "role": "spell",
    "professions": "alchemy",
    "spec": "frost"
  }

  Example output:
  {
    "locale": "en_US",
    "classId": "8",
    "char": "\"Nickolaki\"",
    "plvl": "70",
    "specId": "251"
  }
 */
export function simcToRaidbotsQueryParamAdapter(
  filteredLines: string[],
): URLSearchParams {

  const raidbotsQueryParamKeys = ["locale", "plvl", "classId", "specId", "char"] as const
  type RaidbotsQueryParam = typeof raidbotsQueryParamKeys[number]

  const queryParams = filteredLines.reduce(
    (acc, line) => {
      const [key, value] = line.split("=")
      if (!key || !value) return acc;

      acc[key] = value
      return acc
    },
    {} as Record<string, string>,
  )

  const raidbotsParams = {
    locale: "en_US",
  } as Record<string, string>

  for (const key in queryParams) {
    const value = queryParams[key] as string

    if (key === "level") {
      raidbotsParams["plvl"] = value
    } else if (key === "spec") {
      raidbotsParams["specId"] = specToId(value as RaidbotsSpecName).toString()
    } else if (classKeys.includes(key as RaidbotsClassName)) {
      raidbotsParams["classId"] = classToId(key as RaidbotsClassName).toString()
      raidbotsParams["char"] = value
    } else if (raidbotsQueryParamKeys.includes(key as RaidbotsQueryParam)) {
      raidbotsParams[key] = value
    }
  }

  return new URLSearchParams(raidbotsParams)
}
