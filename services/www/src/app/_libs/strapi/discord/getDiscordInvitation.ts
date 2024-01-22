import strapi from "@/app/_libs/strapi";
import { DiscordInvitation, StrapiResponseData } from "@/types/strapi";

export default async function getDiscordInvitation(): Promise<{ data: { isActive: boolean; url: string | null; } | null; error: any; }> {
  try {
    const invitation = await strapi
      .find<StrapiResponseData<DiscordInvitation>>('discord-invitation')
      .then(res => {
        return res.data;
      });

    return {
      data: {
        isActive: invitation.attributes.isActive,
        url: invitation.attributes.url,
      },
      error: null,
    };
  }
  catch(err) {
    return {
      data: null,
      error: err,
    };
  }
}
