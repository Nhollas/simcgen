import { GetItemInfoRequest, GetItemInfoResponse } from '@/types/contracts/GetItemInfo';
import axios, { AxiosResponse } from 'axios';
import { NextResponse, type NextRequest } from 'next/server'

export async function POST(
  request: NextRequest
) {  

  const body = await request.json();

  const { searchParams } = new URL(request.url)

  console.log("body", body)

  try {
    const response = await axios.post<
      string,
      AxiosResponse<GetItemInfoResponse>,
      GetItemInfoRequest
    >(
      "https://www.raidbots.com/api/item-info",
      { gear: body.gear },
      {
        params: searchParams,
      }
    );

    console.log("gear", JSON.stringify(response.data))

    return NextResponse.json(response.data);

  } catch (error) {
    console.log("error", error)

    return NextResponse.error();
  }
}
