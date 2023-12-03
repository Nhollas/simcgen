"use client"
import { ExtractedGear } from "@/lib/simc"
import { useEffect } from "react"
import Script from "next/script"

import {
  createQueryParamsFromInput,
  extractCharacterInfoFromInput,
  extractGearFromInput,
} from "@/lib/simc"
import { useOutputForm } from "@/hooks"
import { GearOutputForm, SimcInput, GearDisplay } from "@/components"
import { isBrowser } from "@/lib/utils"
import { getGearInfo } from "@/api"

export function SimcGen() {
  const form = useOutputForm()

  const { watch, setValue } = form

  const [simcInput, gearInfo] = watch(["simcInput", "gearInfo"])

  useEffect(() => {
    let isMounted = true

    async function fetchItemInfo(gear: ExtractedGear, params: URLSearchParams) {
      const response = await getGearInfo(gear, params)

      if (isMounted) {
        setValue("gearInfo", response)
      }
    }

    const gear = extractGearFromInput(simcInput)
    const characterInfo = extractCharacterInfoFromInput(simcInput) as any

    setValue("characterInfo", characterInfo)

    const queryParams = createQueryParamsFromInput(simcInput)

    fetchItemInfo(gear, queryParams)

    isBrowser && localStorage.setItem("simcInput", simcInput)

    return () => {
      isMounted = false
    }
  }, [simcInput, setValue])

  return (
    <main className="flex min-h-screen w-full max-w-5xl flex-col items-center justify-between p-3 md:p-6">
      <GearOutputForm form={form}>
        <SimcInput form={form} />
        {gearInfo && <GearDisplay gear={gearInfo} />}
      </GearOutputForm>
      <Script src="https://wow.zamimg.com/js/tooltips.js" />
      <Script src="/scripts/wowheadTooltip.js" />
    </main>
  )
}
