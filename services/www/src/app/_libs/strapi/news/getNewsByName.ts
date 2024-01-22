import strapi from '@/app/api/_libs/strapi';
import type {
  News,
  StrapiResponseData,
} from '@/types/strapi';

export default async function getNewsByName(name: string): Promise<{ data: StrapiResponseData<News> | null; error: any; }> {
  try {
    const newsItem = await strapi
      .find<StrapiResponseData<News>[]>(
        'news',
        {
          populate: '*',
          filters: {
            name,
            targetServices: {
              value: {
                $eq: 'www',
              },
            },
          },
          publicationState: 'live',
          pagination: {
            start: 0,
            limit: 1,
            withCount: false,
          },
          sort: 'publishedAt:desc',
        }
      )
      .then((resp) => {
        return resp.data[0] || null;
      });
  
    return {
      data: newsItem,
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
