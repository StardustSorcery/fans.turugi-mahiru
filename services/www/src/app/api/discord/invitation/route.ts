import { NextRequest, NextResponse } from "next/server";
import strapi from "@/app/api/_libs/strapi";
import { DiscordInvitation, StrapiResponseData } from "@/types/strapi";

export async function GET(req: NextRequest): Promise<NextResponse> {
  return await strapi
    .find<StrapiResponseData<DiscordInvitation>>('discord-invitation')
    .then(resp => {
      return NextResponse.json({
        isActive: resp.data.attributes.isActive,
        url: resp.data.attributes.url,
      });
    })
    .catch(err => {
      console.error(err);
      return NextResponse.json({}, { status: 500 });
    });
}
