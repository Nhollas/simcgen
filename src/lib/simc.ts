import { classKey, classToId, raidbotsQueryParamAdapter, specKey, specToId } from "./raidbots";

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
];

export function extractGearFromInput(simcInput: string) {
  const lines: string[] = simcInput.split("\n");

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
  ];
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
  ];

  const filteredLines = lines.filter((line) => {
    // Only keep line if it starts with a lineToKeep.
    if (line.startsWith("#")) {
      return bagLinesToKeep.some((bagLine) => line.startsWith(bagLine));
    } else {
      return linesToKeep.some((lineToKeep) => line.startsWith(lineToKeep));
    }
  });

  const gearData: Record<string, any> = {};
  let currentSlot = "";

  for (const line of filteredLines) {
    let gearItem: Record<string, any> = {};

    if (line.startsWith("# ")) {
      currentSlot = line.split("# ")[1].split("=")[0].trim();
    } else {
      gearItem = { equipped: true };
      currentSlot = line.split("=")[0];
    }

    if (currentSlot === "trinket1" || currentSlot === "trinket2") {
      currentSlot = "trinkets";
    }

    if (currentSlot === "finger1" || currentSlot === "finger2") {
      currentSlot = "rings";
    }

    // Check if there are alreadys items in the slot
    if (!gearData[currentSlot]) {
      gearData[currentSlot] = [];
    }

    // Split the line into parts but skip the slot.
    const parts = line.split(",").slice(1);

    for (const part of parts) {
      const [key, value] = part.split("=");

      gearItem[key] = value;
    }

    gearData[currentSlot].push(gearItem);
  }

  return gearData;
}

export function extractCharacterInfoFromInput(simcInput: string) {
  const lines: string[] = simcInput.split("\n");

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
  ];

  const linesToKeep = [
    "level=",
    "race=",
    "region=",
    "server=",
    "role=",
    "spec=",
    ...possibleClassLines,
  ];

  const filteredLines = lines.filter((line) => {
    // Only keep line if it starts with a lineToKeep.
    return linesToKeep.some((lineToKeep) => line.startsWith(lineToKeep));
  });

  const characterInfoKeys = [
    "level",
    "race",
    "region",
    "server",
    "role",
    "spec",
  ];

  const characterInfo: Record<string, any> = {};

  for (const line of filteredLines) {
    const [key, value] = line.split("=");

    if (characterInfoKeys.includes(key)) {
      if (key === "spec") {
        characterInfo["specId"] = specToId(value as specKey);
      } else {
        characterInfo[key] = value;
      }
    } else {
      if (possibleClasses.includes(key)) {
        characterInfo["classId"] = classToId(key as classKey);
        characterInfo["name"] = value;
      }
    }
  }

  return characterInfo;
}

export function createQueryParamsFromInput(simcInput: string) {
  const lines: string[] = simcInput.split("\n");

  const linesToKeep = [
    "level=",
    "race=",
    "region=",
    "server=",
    "role=",
    "professions=",
    "spec=",
    ...possibleClassLines,
  ];

  const filteredLines = lines.filter((line) => {
    // Only keep line if it starts with a lineToKeep.
    return linesToKeep.some((lineToKeep) => line.startsWith(lineToKeep));
  });

  const params = raidbotsQueryParamAdapter(filteredLines);

  return params;
}
