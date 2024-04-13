import { ExtractedGear } from "@/lib/simc"
import { GearSchema } from "@/schemas"
import axios, { AxiosResponse } from "axios"
import { NextResponse, type NextRequest } from "next/server"
import { v4 as uuidv4 } from "uuid"

export async function POST(request: NextRequest) {
  const body = await request.json()


  const { searchParams } = new URL(request.url)

  try {
    const response = await axios.post<
      string,
      AxiosResponse<GearSchema>,
      { gear: ExtractedGear }
    >(
      "https://www.raidbots.com/api/item-info",
      { gear: body.gear },
      {
        params: searchParams,
      },
    )

    const gearInfo = response.data

    const setPieces = Object.values(gearInfo).flatMap((items) =>
      items
        .filter((i) => i.itemSetId && i.equipped)
        .map((i) => i.id.toString()),
    )

    // Add unique-id property to each item.
    Object.entries(gearInfo).map(([slot, items]) => {
      {
        items.map((item) => {
          item["unique_id"] = uuidv4()

          if (item.itemSetId && item.equipped) {
            item["setPieces"] = setPieces
          }
        })
      }
    })

    return NextResponse.json(gearInfo)
  } catch (error) {
    return NextResponse.error()
  }
}
