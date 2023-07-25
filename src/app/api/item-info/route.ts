import { GetItemInfoRequest, GetItemInfoResponse } from '@/types/contracts/GetItemInfo';
import axios, { AxiosResponse } from 'axios';
import { NextResponse, type NextRequest } from 'next/server'

export async function POST(
  request: NextRequest
) {  

  const body = await request.json() as GetItemInfoRequest;

  const { searchParams } = new URL(request.url);

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

    return NextResponse.json(response.data);

  } catch (error) {
    return NextResponse.error();
  }
}
