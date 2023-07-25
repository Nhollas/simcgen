import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)

    const search = searchParams.get("search");

    searchParams.append("locale", "en_US")

    const response = await axios.get(`https://www.raidbots.com/api/item/${search}`, {
        params: searchParams
    })

    return NextResponse.json(response.data)
}