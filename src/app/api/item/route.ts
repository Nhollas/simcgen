import axios from "axios";
import { NextResponse } from "next/server";
import { URLSearchParams } from "url";

function generateUrl(searchParams: URLSearchParams) {
    let url = "https://www.raidbots.com/api/item"

    if (searchParams.get('search')) {
        url += `/${searchParams.get('search')}`
    }

    url += `?${searchParams.toString()}`

    return url
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)

    const response = await axios.get(generateUrl(searchParams))

    return NextResponse.json(response.data)
}