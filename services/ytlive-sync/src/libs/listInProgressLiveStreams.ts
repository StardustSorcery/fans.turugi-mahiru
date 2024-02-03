import strapi from "@/strapi";
import { StrapiResponseData, Video } from "@/types/strapi";

export default async function listInProgressLiveStreams() {
  return await strapi
    .find<StrapiResponseData<Video>[]>(
      'videos',
      {
        fields: [
          'videoId',
        ],
        filters: {
          provider: 'youtube',
          isInProgressLiveStream: true,
        },
      }
    )
    .then(res => {
      return res.data;
    });
}
