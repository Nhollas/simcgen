import {
  classIdToName,
  classToId,
  simcToRaidbotsQueryParamAdapter,
  specIdToName,
  specToId,
  RaidbotsSpecName,
  RaidbotsClassName,
} from "./raidbots"
import { GearOutputSchema, GearItemSchema } from "@/schemas"

const possibleClassLines = [
  "deathknight=",
  "demonhunter=",
  "druid=",
  "hunter=",
  "mage=",
  "monk=",
  "paladin=",
  "priest=",
  "rogue=",
  "shaman=",
  "warlock=",
  "warrior=",
  "evoker=",
]

export type ExtractedGear = Record<string, Record<string, string | boolean>[]>

export function extractGearFromInput(simcInput: string): ExtractedGear {
  const lines: string[] = simcInput.split("\n")

  const bagLinesToKeep = [
    "# head=",
    "# neck=",
    "# shoulder=",
    "# back=",
    "# chest=",
    "# wrist=",
    "# hands=",
    "# waist=",
    "# legs=",
    "# feet=",
    "# finger1=",
    "# finger2=",
    "# trinket1=",
    "# trinket2=",
    "# main_hand=",
    "# off_hand=",
  ]
  const linesToKeep = [
    "head=",
    "neck=",
    "shoulder=",
    "back=",
    "chest=",
    "wrist=",
    "hands=",
    "waist=",
    "legs=",
    "feet=",
    "finger1=",
    "finger2=",
    "trinket1=",
    "trinket2=",
    "main_hand=",
    "off_hand=",
  ]

  const filteredLines = lines.filter((line) => {
    // Only keep line if it starts with a lineToKeep.
    if (line.startsWith("#")) {
      return bagLinesToKeep.some((bagLine) => line.startsWith(bagLine))
    } else {
      return linesToKeep.some((lineToKeep) => line.startsWith(lineToKeep))
    }
  })

  const gearData: Record<string, Record<string, string | boolean>[]> = {}
  let currentSlot = ""

  for (const line of filteredLines) {
    let gearItem: Record<string, string | boolean> = {}

    if (line.startsWith("# ")) {
      currentSlot = line.split("# ")[1].split("=")[0].trim()
    } else {
      gearItem["equipped"] = true
      currentSlot = line.split("=")[0]
    }

    if (currentSlot === "trinket1" || currentSlot === "trinket2") {
      currentSlot = "trinkets"
    }

    if (currentSlot === "finger1" || currentSlot === "finger2") {
      currentSlot = "rings"
    }

    // Check if there are any items in the slot.
    if (!gearData[currentSlot]) {
      gearData[currentSlot] = []
    }

    // Split the line into parts but skip the slot.
    const parts = line.split(",").slice(1)

    for (const part of parts) {
      const [key, value] = part.split("=")

      gearItem[key] = value
    }

    gearData[currentSlot].push(gearItem)
  }

  return gearData
}

export function extractCharacterInfoFromInput(simcInput: string) {
  const lines: string[] = simcInput.split("\n")

  const possibleClasses = [
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

  const linesToKeep = [
    "level=",
    "race=",
    "region=",
    "server=",
    "role=",
    "spec=",
    "talents=",
    ...possibleClassLines,
  ]

  const filteredLines = lines.filter((line) => {
    // Only keep line if it starts with a lineToKeep.
    return linesToKeep.some((lineToKeep) => line.startsWith(lineToKeep))
  })

  const characterInfoKeys = [
    "level",
    "race",
    "region",
    "server",
    "role",
    "spec",
    "talents",
  ]

  const characterInfo: Record<string, any> = {}

  for (const line of filteredLines) {
    const [key, value] = line.split("=")

    if (!key || !value) continue

    if (characterInfoKeys.includes(key)) {
      if (key === "spec") {
        characterInfo["specId"] = specToId(value as RaidbotsSpecName)
      } else {
        characterInfo[key] = value
      }
    } else {
      if (possibleClasses.includes(key)) {
        characterInfo["classId"] = classToId(key as RaidbotsClassName)
        characterInfo["name"] = value
      }
    }
  }

  return characterInfo
}

export function createQueryParamsFromInput(simcInput: string) {
  const lines: string[] = simcInput.split("\n")

  const linesToKeep = [
    "level=",
    "race=",
    "region=",
    "server=",
    "role=",
    "professions=",
    "spec=",
    ...possibleClassLines,
  ]

  const filteredLines = lines.filter((line) => {
    // Only keep line if it starts with a lineToKeep.
    return linesToKeep.some((lineToKeep) => line.startsWith(lineToKeep))
  })

  const params = simcToRaidbotsQueryParamAdapter(filteredLines)

  return params
}

function generateGearLine(item: GearItemSchema) {
  const { id, bonus_id, enchant_id, context, socketInfo } = item

  let attributes: string[] = []

  attributes.push(`id=${id}`)
  attributes.push(`bonus_id=${bonus_id}`)

  //gem_id=192961/192961/192961
  if ("PRISMATIC" in socketInfo && socketInfo.PRISMATIC) {
    const { PRISMATIC } = socketInfo

    const gemIds = PRISMATIC.gems.map((gem) => gem.itemId).join("/")

    attributes.push(`gem_id=${gemIds}`)
  }

  if (enchant_id) {
    attributes.push(`enchant_id=${enchant_id}`)
  }

  if (context) {
    attributes.push(`context=${context}`)
  }

  return attributes.join(",")
}

export function createSimcOutputFromInfo(values: GearOutputSchema): string {
  let lines: string[] = []

  lines.push(
    "# Raidbots-generated SimC input...SIKE! This is from the devs @ simcgen.com",
  )

  lines.push("")

  const className = classIdToName(values.characterInfo["classId"])
  // This needs to be first.
  lines.push(`${className}=${values.characterInfo["name"]}`)

  for (const key in values.characterInfo) {
    if (key === "specId") {
      const specName = specIdToName(values.characterInfo[key])

      lines.push(`spec=${specName}`)
    } else if (key === "name" || key === "classId") {
      // Do nothing
    } else {
      lines.push(`${key}=${values.characterInfo[key]}`)
    }
  }

  // Push empty line.
  lines.push("")

  for (const key in values.gearInfo) {
    let trinket = false
    let ring = false

    for (const item of values.gearInfo[key]) {
      let base = "#"

      if (item.equipped) {
        base = ""
      }

      if (key === "trinkets") {
        if (!trinket) {
          lines.push(`${base}trinket1=,${generateGearLine(item)}`)
          trinket = true
        } else {
          lines.push(`${base}trinket2=,${generateGearLine(item)}`)
        }
      } else if (key === "rings") {
        if (!ring) {
          lines.push(`${base}finger1=,${generateGearLine(item)}`)
          ring = true
        } else {
          lines.push(`${base}finger2=,${generateGearLine(item)}`)
        }
      } else {
        lines.push(`${base}${key}=,${generateGearLine(item)}`)
      }
    }
  }

  return lines.join("\n")
}
