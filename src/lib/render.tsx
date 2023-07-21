import { Embellishment, Enchant, Gem, ItemLevel, SecondaryStats } from "@/components/gearconfigs"
import { GearConfigOption } from "./gear"
import { Control } from "react-hook-form"

export const renderGearConfigComponent = (configOption: GearConfigOption, control: Control, name: string) => {
    // switch
    switch (configOption) {
        case "ItemLevel":
            return <ItemLevel control={control} name={name} />
        case "Gem":
            return <Gem control={control} name={name} />
        case "Enchant":
            return <Enchant control={control} name={name} />
        case "SecondaryStats":
            return <SecondaryStats control={control} name={name} />
        case "Embellishment":
            return <Embellishment control={control} name={name} />
    }
}
