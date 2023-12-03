"use client";

import axios, { AxiosResponse } from "axios";
import { useEffect } from "react";
import Script from "next/script";

import {
  createQueryParamsFromInput,
  extractCharacterInfoFromInput,
  extractGearFromInput,
} from "@/lib/simc";
import {
  GetItemInfoResponse,
  GetItemInfoRequest,
} from "@/types/contracts/GetItemInfo";
import { useOutputForm } from "@/hooks";
import { GearOutputForm, SimcInput, GearDisplay } from "@/components";
import { isBrowser } from "@/lib/utils";

export default function Home() {
  const form = useOutputForm();

  const { watch, setValue } = form;

  const [simcInput, gearInfo] = watch(["simcInput", "gearInfo"]);

  useEffect(() => {
    let isMounted = true;

    async function fetchItemInfo(gear: any, params: URLSearchParams) {
      const response = await axios.post<
        string,
        AxiosResponse<GetItemInfoResponse>,
        GetItemInfoRequest
      >(
        "/api/item-info",
        { gear },
        {
          params,
        }
      );

      if (isMounted) {
        // @ts-ignore
        setValue("gearInfo", response.data);
      }
    }

    const gear = extractGearFromInput(simcInput);
    const characterInfo = extractCharacterInfoFromInput(simcInput) as any;

    setValue("characterInfo", characterInfo);

    const queryParams = createQueryParamsFromInput(simcInput);

    fetchItemInfo(gear, queryParams);

    isBrowser && localStorage.setItem("simcInput", simcInput);

    return () => {
      isMounted = false;
    };
  }, [simcInput, setValue]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-3 md:p-6 w-full max-w-5xl">
      <GearOutputForm form={form}>
        <SimcInput form={form} />
        {gearInfo && <GearDisplay form={form} gear={gearInfo} />}
      </GearOutputForm>
      <Script src="https://wow.zamimg.com/js/tooltips.js" />
      <Script src="/scripts/wowheadTooltip.js" />
    </main>
  );
}
