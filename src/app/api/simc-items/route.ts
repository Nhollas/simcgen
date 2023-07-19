import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const simcInput = await request.text();

    const response = await axios.post("https://www.raidbots.com/api/simc-items?locale=en_US", {
        text: simcInput,
      })

    return NextResponse.json(response.data)
}