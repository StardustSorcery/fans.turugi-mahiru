import strapi from "@/strapi";
import { StrapiResponseData, Video } from "@/types/strapi";

export default async function listVideosByPage({
  page = 1,
  pageSize = 50,
}: {
  page: number;
  pageSize: number;
}) {
  return await strapi
    .find<StrapiResponseData<{ videoId: Video['videoId']; }>[]>(
      'videos',
      {
        fields: [
          'videoId',
        ],
        filters: {
          provider: {
            $eq: 'youtube',
          },
        },
        sort: [
          'id:asc',
        ],
        pagination: {
          page,
          pageSize,
          withCount: true,
        },
      },
    )
    .then(res => {
      return res.data;
    });
}
