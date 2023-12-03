import { SearchGearSchema } from "@/schemas";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get("query");

  searchParams.append("locale", "en_US");

  const response = await axios.get<SearchGearSchema>(
    `https://www.raidbots.com/api/item/${query}`,
    {
      params: searchParams,
    }
  );

  const items = response.data;

  items.map((item) => {
    item["unique_id"] = uuidv4();
  });

  return NextResponse.json<SearchGearSchema>(response.data);
}
