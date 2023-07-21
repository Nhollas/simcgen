export function raidbotsQueryParamAdapter(
  filteredLines: string[]
): URLSearchParams {
  const raidbotsQueryParams = ["locale", "plvl", "classId", "specId", "char"];

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
  ];

  function specToId(specName: keyof typeof specIdMap) {
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
    };
    const specIdResult = specIdMap[specName];

    console.log("specIdResult", specIdResult);

    return specIdResult;
  }

  function classToId(className: keyof typeof classIdMap) {
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
    };

    return classIdMap[className];
  }

  const queryParams = filteredLines.reduce((acc, line) => {
    const [key, value] = line.split("=");
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>);

  // Convert queryParams to raidbotsQueryParams
  const raidbotsParams = {} as Record<string, string>;

  for (const key in queryParams) {
    const value = queryParams[key];

    if (key === "level") {
      // Convert level to plvl
      raidbotsParams["plvl"] = value;
    } else if (key === "spec") {
      // Convert spec to specId
      //@ts-ignore
      raidbotsParams["specId"] = specToId(value);
    } else if (classKeys.includes(key)) {
      // Convert class key to classId
      //@ts-ignore
      raidbotsParams["classId"] = classToId(key);
      // Get the corresponding character name for classId
      raidbotsParams["char"] = value;
    } else if (raidbotsQueryParams.includes(key)) {
      // Directly copy other specified query parameters
      raidbotsParams[key] = value;
    }
  }

  // Add any missing parameters with default values
  const defaultParams: Record<string, string> = {
    locale: "en_US", // Default locale
  };

  const finalRaidbotsParams = { ...defaultParams, ...raidbotsParams };

  return new URLSearchParams(finalRaidbotsParams);
}


export function qualityTypeToColour(qualityType: number) {
  type QualityTypeMap = {
    [key: number]: string;
  };

  const qualityTypeMap: QualityTypeMap = {
    1: "##ffffff",
    2: "##1eff00",
    3: "#0070dd",
    4: "#a335ee",
    5: "#ff8000",
    6: "#e6cc80",
    7: "#00ccff",
  };
  
  const result = qualityTypeMap[qualityType];

  if (!result) {
    return "#ffffff";
  } else {
    return result;
  }
}