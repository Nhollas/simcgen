import { GetClassIdsResponse } from "@/types/contracts";
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
    const response = await axios.get<GetClassIdsResponse>(
      "https://us.api.blizzard.com/data/wow/playable-class/index",
      {
        params: {
          namespace: "static-us",
          locale: "en_US",
          access_token: token.access_token,
        },
      }
    );

      // I want to format the classes into a record of name: id

        const formattedClasses = response.data.classes.reduce((acc, curr) => {
            acc[curr.name.toLocaleLowerCase()] = curr.id;
            return acc;
        }, {} as Record<string, number>);
        

    return NextResponse.json(formattedClasses);
  } catch (error) {
    console.error("error");
    return NextResponse.error();
  }
}
