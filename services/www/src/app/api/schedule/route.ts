import { NextRequest, NextResponse } from 'next/server';
import strapi from '@/app/api/_libs/strapi';
import type {
  Video,
  StrapiResponseData,
} from '@/types/strapi';
import { StrapiRequestParams } from 'strapi-sdk-js';
import { LiveScheduleByDate } from '@/types/schedule';

export async function GET(req: NextRequest): Promise<NextResponse> {
  const searchParams = req.nextUrl.searchParams;

  const afterAtStr = searchParams.get('afterAt');
  const beforeAtStr = searchParams.get('beforeAt');

  if(!afterAtStr || !beforeAtStr) {
    return NextResponse.json({}, { status: 400 });
  }

  const afterAt = new Date(afterAtStr);
  const beforeAt = new Date(beforeAtStr);

  return strapi
    .find<StrapiResponseData<Video>[]>(
      'videos',
      {
        filters: {
          scheduledStartsAt: {
            $gte: afterAt,
            $lt: beforeAt,
          },
          isUpcomingLiveStream: true,
        },
        populate: [
          'thumbnails',
          'auhtor',
        ],
      }
    )
    .then((resp) => {
      const schedule: LiveScheduleByDate[] = [];

      for(const video of resp.data) {
        const {
          isInProgressLiveStream,
          scheduledStartsAt: _scheduledStartsAt,
        } = video.attributes;
        const scheduledStartsAt = _scheduledStartsAt ? new Date(_scheduledStartsAt) : null;

        if(!scheduledStartsAt) {
          continue;
        }

        const dateBucket = (() => {
          const _dateBucket = schedule.find(e => e.date.getTime() === scheduledStartsAt.getTime());
          if(_dateBucket) return _dateBucket;
          const _newDateBucket: LiveScheduleByDate = {
            date: new Date(scheduledStartsAt.getFullYear(), scheduledStartsAt.getMonth(), scheduledStartsAt.getDate()),
            videos: [],
          };
          schedule.push(_newDateBucket);
          return _newDateBucket;
        })();

        dateBucket.videos.push(video);
      }

      return NextResponse.json(schedule);
    })
    .catch(err => {
      console.error(err);
      return NextResponse.json({}, { status: 500 });
    });
}
