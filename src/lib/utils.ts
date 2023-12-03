import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const exampleInput = `# Nickolaki - Frost - 2023-12-02 14:44 - EU/Twisting Nether\n# SimC Addon 10.2.0-01\n# WoW 10.2.0.52301, TOC 100200\n# Requires SimulationCraft 1000-01 or newer\n\nmage=\"Nickolaki\"\nlevel=70\nrace=troll\nregion=eu\nserver=twisting_nether\nrole=spell\nprofessions=alchemy=100/\nspec=frost\n\ntalents=BAEArSxcnei16P8xFL3rzzOyRKRiUSDJRSaCIHIRERkEAAAJSiESkkkIJJJRSAAAAAAAAAgIA\n\n# Saved Loadout: ST\n# talents=BAEArSxcnei16P8xFL3rzzOyRSEUSzBkEJpJgkQEJRSAAAIlEJhEJJhkkkkkEAAAAAAAAAICA\n# Saved Loadout: M+\n# talents=BAEArSxcnei16P8xFL3rzzOyRKRiUSDJRSaCIHIRERkEAAAJSiESkkkIJJJRSAAAAAAAAAgIA\n\n# Wayward Chronomancer's Chronocap (483)\nhead=,id=207290,bonus_id=6652/9599/9639/9513/9581/1514/8767\n# Chain of the Green Flight (476)\nneck=,id=137311,gem_id=192958/192958/192958,bonus_id=9639/6652/9144/9477/8782/9571/9849/8767\n# Wayward Chronomancer's Metronomes (480)\nshoulder=,id=207288,bonus_id=6652/9511/9573/9639/1511/8767\n# Cloak of Fading Echoes (467)\nback=,id=134405,enchant_id=6592,bonus_id=9568/9639/6652/9506/9144/9840/8767\n# Wayward Chronomancer's Patchwork (476)\nchest=,id=207293,enchant_id=6625,bonus_id=6652/7980/9515/9571/1507/8767\n# Dream Wardens Tabard (1)\ntabard=,id=210501\n# Vibrant Wildercloth Wristwraps  (486)\nwrist=,id=193510,bonus_id=8836/8840/8902/9405/9500/8790/9379/8960/9498/9599,crafted_stats=32/49,crafting_quality=5\n# Twisted Sisters Handwraps (467)\nhands=,id=159272,bonus_id=9568/9639/6652/9506/9144/9464/8767\n# Poisonroot Belt (467)\nwaist=,id=134423,bonus_id=9568/9639/6652/9600/9506/9144/9840/8767\n# Wayward Chronomancer's Pantaloons (489)\nlegs=,id=207289,enchant_id=6544,bonus_id=6652/9512/9639/9576/1520/8767\n# Devilsaur Worshiper's Sandals (470)\nfeet=,id=158303,bonus_id=9639/6652/9506/9144/9569/9834/8767\n# Ochre Field Signet (450)\nfinger1=,id=208350,enchant_id=6562,gem_id=192988,bonus_id=9589/6652/9516/9543/1507/8767\n# Anthia's Ring (480)\nfinger2=,id=133189,enchant_id=6562,bonus_id=9639/6652/9599/9144/9572/9886/8767\n# Spoils of Neltharus (441)\ntrinket1=,id=193773,bonus_id=6652/9144/9334/1663/8767\n# Vessel of Skittering Shadows (463)\ntrinket2=,id=159610,bonus_id=9563/9639/6652/9144/9458/8767\n# Jagged Iris Sica (483)\nmain_hand=,id=159133,enchant_id=6643,bonus_id=9639/6652/9147/9581/9847/8767\n# Interloper's Mossy Skull (483)\noff_hand=,id=119176,bonus_id=9639/6652/9144/9581/9882/8767\n\n### Gear from Bags\n#\n# Underlight Conjurer's Arcanocowl (447)\n# head=,id=202551,gem_id=192952,bonus_id=6652/9229/9382/1504/8767/9413\n#\n# Collar of Raking Claws (467)\n# head=,id=134426,bonus_id=9568/9639/6652/9600/9506/9144/9840/8767\n#\n# Heart of Azeroth (194)\n# neck=,id=158075,bonus_id=6316/4932/4933/1554\n#\n# Torc of Passed Time  (447)\n# neck=,id=201759,gem_id=192988/192952/192952,bonus_id=8836/8840/8902/9477/8782/9405/8792/9376/9366,crafted_stats=40/32,crafting_quality=5\n#\n# Underlight Conjurer's Aurora (447)\n# shoulder=,id=202549,bonus_id=6652/9382/9227/1504\n#\n# Frigid Conservator's Wrap (450)\n# back=,id=210382,bonus_id=9555/9506/6652/1481/8767\n#\n# Cloak of Fading Echoes (470)\n# back=,id=134405,bonus_id=9569/9639/6652/9506/9144/9843/8767\n#\n# Underlight Conjurer's Vestment (441)\n# chest=,id=202554,enchant_id=6625,bonus_id=6652/7977/9231/9334/1492/8767\n#\n# Loa Betrayer's Vestments (470)\n# chest=,id=211405,bonus_id=9569/9639/43/9506/9144/3149/8767\n#\n# Underlight Conjurer's Gloves (447)\n# hands=,id=202552,bonus_id=6652/9230/9410/9382/1498/8767\n#\n# Vibrant Wildercloth Girdle  (447)\n# waist=,id=193516,gem_id=192952,bonus_id=8836/8840/8902/9405/9376/8792/9379/8960/9366/9413,crafted_stats=49/36,crafting_quality=5\n#\n# Vibrant Wildercloth Slacks  (447)\n# legs=,id=193518,enchant_id=6541,bonus_id=8836/8840/8902/9405/9376/8792/9366,crafted_stats=40/49,crafting_quality=5\n#\n# Vibrant Wildercloth Slippers  (447)\n# feet=,id=193519,enchant_id=6613,bonus_id=8836/8840/8902/9405/9376/8792/9379/8960/9366,crafted_stats=40/49,crafting_quality=5\n#\n# Snipping Sleet Circle (447)\n# finger1=,id=210377,bonus_id=9554/6652/9600/1478/8767\n#\n# Snipping Sleet Circle (450)\n# finger1=,id=210377,bonus_id=9555/6652/9600/1481/8767\n#\n# Lord Waycrest's Signet (467)\n# finger1=,id=158362,bonus_id=9568/9639/6652/9599/9144/9464/8767\n#\n# Signet of Titanic Insight  (447)\n# finger1=,id=192999,enchant_id=6556,gem_id=192952,bonus_id=8836/8840/8902/8780/9405/8792/9376/9366,crafted_stats=49/40,crafting_quality=5\n#\n# Ring-Bound Hourglass  (447)\n# finger1=,id=193000,enchant_id=6556,gem_id=192952,bonus_id=8836/8840/8902/8780/9405/8792/9376/9366,crafted_stats=36/49,crafting_quality=5\n#\n# Ominous Chromatic Essence (441)\n# trinket1=,id=203729,bonus_id=9409/40/9334/1495/8767\n#\n# Irideus Fragment (441)\n# trinket1=,id=193743,bonus_id=6652/9144/9334/1663/8767\n#\n# Lady Waycrest's Music Box (467)\n# trinket1=,id=159631,bonus_id=9568/9639/6652/9144/9464/8767\n#\n# Time-Breaching Talon (441)\n# trinket1=,id=193791,bonus_id=6652/9144/9334/1663/8767\n#\n# Cerith Spire Staff (470)\n# main_hand=,id=133184,bonus_id=9569/9639/6652/9147/9876/8767\n#\n# Sol's Magestaff (470)\n# main_hand=,id=119174,bonus_id=9569/9639/6652/9147/9849/8767\n#\n# Obsidian Seared Hexsword  (447)\n# main_hand=,id=190511,enchant_id=6643,bonus_id=8836/8840/8902/9405/9376/8792/8174/9366,crafted_stats=32/36,crafting_quality=5\n#\n# Crackling Codex of the Isles  (447)\n# off_hand=,id=194879,bonus_id=8836/8840/8902/9405/8792/9376/9366,crafted_stats=36/40,crafting_quality=5\n#\n# Ancestor's Necromantic Focus (470)\n# off_hand=,id=207983,bonus_id=9569/9639/6652/9144/1592/8767\n\n### Additional Character Info\n#\n# upgrade_currencies=c:2708:13/c:2122:2/c:2707:220/c:1792:70/c:2706:367/c:2245:1305/i:204440:2/i:204681:2/i:206960:1/i:204682:1\n#\n# slot_high_watermarks=0:483:483/1:476:476/2:480:480/3:476:476/4:467:467/5:489:489/6:470:470/7:486:486/8:467:467/9:467:467/10:463:463/11:482:482/12:470:470/13:483:483/14:319:319/15:1:1/16:483:483\n\n# Checksum: 17b15dd9`

export const isBrowser = typeof window !== "undefined"
