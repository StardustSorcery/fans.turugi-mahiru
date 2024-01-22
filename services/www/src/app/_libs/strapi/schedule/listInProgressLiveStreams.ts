import strapi from '@/app/api/_libs/strapi';
import type {
  Video,
  StrapiResponseData,
} from '@/types/strapi';

export async function listInProgressLiveStreams(): Promise<{ data: StrapiResponseData<Video>[] | null; error: any; }> {
  try {
    const videos = await strapi
      .find<StrapiResponseData<Video>[]>(
        'videos',
        {
          filters: {
            isInProgressLiveStream: true,
          },
          populate: [
            'thumbnails',
            'auhtor',
          ],
        }
      )
      .then((res) => {
        return res.data;
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
}
