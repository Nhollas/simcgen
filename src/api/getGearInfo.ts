import { ExtractedGear } from "@/lib/simc";
import { GearSchema } from "@/schemas";
import axios, { AxiosResponse } from "axios";

export async function getGearInfo(
  gear: ExtractedGear,
  params: URLSearchParams
) {
  const response = await axios.post<
    string,
    AxiosResponse<GearSchema>,
    { gear: ExtractedGear }
  >(
    "/api/gear-info",
    { gear },
    {
      params,
    }
  );

  return response.data;
}
