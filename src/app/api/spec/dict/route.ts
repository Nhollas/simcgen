import { GetSpecIdsResponse } from "@/types/contracts";
import axios from "axios";
import { NextResponse } from "next/server";
import { env } from "@/lib/env";

export async function GET(request: Request) {
  const { data: token } = await axios.post(
    "https://us.battle.net/oauth/token",
    "grant_type=client_credentials",
    {
      auth: {
        username: env.BlizzClientId,
        password: env.BlizzClientSecret,
      },
    }
  );

  try {
    const response = await axios.get<GetSpecIdsResponse>(
      "https://us.api.blizzard.com/data/wow/playable-specialization/index",
      {
        params: {
          namespace: "static-us",
          locale: "en_US",
          access_token: token.access_token,
        },
      }
    );

      // I want to format the classes into a record of name: id

      const formattedSpecs = response.data.character_specializations.reduce((acc, curr) => {
          acc[curr.name.toLocaleLowerCase()] = curr.id;
          return acc;
      }, {} as Record<string, number>);

    return NextResponse.json(formattedSpecs);
  } catch (error) {
    console.error("error");
    return NextResponse.error();
  }
}
