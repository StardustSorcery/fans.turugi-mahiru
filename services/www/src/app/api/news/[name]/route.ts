import { NextRequest, NextResponse } from 'next/server';
import strapi from '@/app/api/_libs/strapi';
import type {
  News,
  StrapiResponseData,
} from '@/types/strapi';
import { StrapiResponse } from 'strapi-sdk-js';

export function GET(
  req: NextRequest,
  { params }: { params: { name: string } }
): Promise<NextResponse> {
  return strapi.find<StrapiResponseData<News>[]>(
    'news',
    {
      populate: '*',
      filters: {
        name: params.name,
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
  ).then((resp) => {
    const data = resp.data[0];
    if(!data) {
      return NextResponse.json({}, { status: 404 });
    }

    const single: StrapiResponse<StrapiResponseData<News>> = {
      meta: resp.meta,
      data,
    };
    return NextResponse.json(single);
  }).catch(err => {
    console.error(err);
    return NextResponse.json({}, { status: 500 });
  });
}
