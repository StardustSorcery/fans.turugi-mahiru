import strapi from '@/app/api/_libs/strapi';
import type {
  News,
  StrapiResponseData,
  StrapiResponseMeta,
} from '@/types/strapi';

export default async function listNews({
  page = 1,
  pageSize = 10,
}: {
  page?: number;
  pageSize?: number;
}): Promise<{ data: StrapiResponseData<News>[] | null; meta: StrapiResponseMeta | null; error: any; }> {
  try {
    const news = await strapi
      .find<StrapiResponseData<News>[]>(
        'news',
        {
          populate: '*',
          filters: {
            targetServices: {
              value: {
                $eq: 'www',
              },
            },
          },
          publicationState: 'live',
          pagination: {
            page,
            pageSize,
            withCount: true,
          },
          sort: 'publishedAt:desc',
        }
      )
      .then((resp) => {
        return resp;
      });

    return {
      data: news.data,
      meta: news.meta as StrapiResponseMeta,
      error: null,
    };
  }
  catch(err) {
    return {
      data: null,
      meta: null,
      error: err,
    };
  }
}
