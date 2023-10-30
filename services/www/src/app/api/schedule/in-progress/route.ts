import { NextRequest, NextResponse } from 'next/server';
import strapi from '@/app/api/_libs/strapi';
import type {
  Video,
  StrapiResponseData,
} from '@/types/strapi';

export async function GET(req: NextRequest): Promise<NextResponse> {
  return strapi
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
    .then((resp) => {
      return NextResponse.json(resp);
    })
    .catch(err => {
      console.error(err);
      return NextResponse.json({}, { status: 500 });
    });
}
