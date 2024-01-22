import strapi from "@/app/api/_libs/strapi";
import { MusicVideo, StrapiResponseData } from "@/types/strapi";

export default async function listMusicVideos(): Promise<{ data: StrapiResponseData<MusicVideo>[] | null; error: any; }> {
  try {
    const videos = await strapi
      .find<StrapiResponseData<MusicVideo>[]>(
        'music-videos',
        {
          populate: [
            'originalArtist',
            'video',
            'video.thumbnails',
          ],
          pagination: {
            page: 1,
            pageSize: 100,
            withCount: true,
          },
        }
      )
      .then(res => {
        const records = res.data;
        records.sort((a, b) => {
          const publishedAtA = new Date(a.attributes.video.data.attributes.videoPublishedAt || a.attributes.video.data.attributes.scheduledStartsAt || 0);
          const publishedAtB = new Date(b.attributes.video.data.attributes.videoPublishedAt || b.attributes.video.data.attributes.scheduledStartsAt || 0);

          return publishedAtA.getTime() - publishedAtB.getTime();
        });

        return records;
      });
  
    return {
      data: videos,
      error: null,
    };
  }
  catch(err) {
    return {
      data: null,
      error: err,
    };
  }
};