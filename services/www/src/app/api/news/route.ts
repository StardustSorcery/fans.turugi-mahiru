import { NextRequest, NextResponse } from 'next/server';
import strapi from '@/app/api/_libs/strapi';
import type {
  News,
  StrapiResponseData,
} from '@/types/strapi';

export function GET(req: NextRequest): Promise<NextResponse> {
  console.log(strapi.axios.defaults.headers)
  const params = req.nextUrl.searchParams;

  const page = Number(params.get('page') || '1');
  const pageSize = Number(params.get('pageSize') || '25');

  return strapi.find<StrapiResponseData<News>[]>(
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
  ).then((resp) => {
    console.log('news:', resp);
    return NextResponse.json(resp);
  }).catch(err => {
    console.error(err);
    return NextResponse.json({}, { status: 500 });
  });
}
