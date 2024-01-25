import { Ranking, StrapiResponseData } from "@/types/strapi";
import strapi from "../../strapi";

export default async function getRanking({
  limit = 100,
}: {
  limit?: number;
} = {}): Promise<{ data: StrapiResponseData<Ranking>; error: null} | { data: null; error: any; }> {
  try {
    const ranking = await strapi
      .find<StrapiResponseData<Ranking>[]>(
        'rankings',
        {
          populate: [
            'scoredVideos',
            'scoredVideos.video',
            'scoredVideos.video.thumbnails',
            'scoredVideos.video.author',
          ],
          sort: [
            'aggregatedAt:desc',
          ],
          pagination: {
            page: 1,
            pageSize: 1,
            withCount: false,
          },
        }
      )
      .then(res => {
        const data = res.data[0] || null;

        if(data && data.attributes.scoredVideos.length > limit) {
          data.attributes.scoredVideos = data.attributes.scoredVideos.slice(0, limit);
        }

        return data;
      });

    return {
      data: ranking,
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
