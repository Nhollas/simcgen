import { GetItemInfoRequest } from '@/types/contracts/GetItemInfo';
import { GearSchema } from '@/types/schemas/GearOutputSchema';
import axios, { AxiosResponse } from 'axios';
import { NextResponse, type NextRequest } from 'next/server'
import { v4 as uuidv4 } from 'uuid';

export async function POST(
  request: NextRequest
) {  

  const body = await request.json() as GetItemInfoRequest;

  const { searchParams } = new URL(request.url);

  try {
    const response = await axios.post<
      string,
      AxiosResponse<GearSchema>,
      GetItemInfoRequest
    >(
      "https://www.raidbots.com/api/item-info",
      { gear: body.gear },
      {
        params: searchParams,
      }
    );

    const gearInfo = response.data;

    // Add unique-id property to each item.
    Object.entries(gearInfo).map(([slot, items]) => {
      {items.map((item) => (
        item["unique_id"] = uuidv4()
      ))}
    });

    return NextResponse.json(response.data);

  } catch (error) {
    return NextResponse.error();
  }
}
