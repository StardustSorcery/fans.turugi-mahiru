import { NextRequest, NextResponse } from 'next/server';
import strapi from '@/app/api/_libs/strapi';
import {
  type Video,
  type StrapiResponseData,
  ScheduleExcluded,
} from '@/types/strapi';
import { LiveScheduleByDate } from '@/types/schedule';

export async function GET(req: NextRequest): Promise<NextResponse> {
  const searchParams = req.nextUrl.searchParams;

  const afterAtStr = searchParams.get('afterAt');
  const beforeAtStr = searchParams.get('beforeAt');

  if(!afterAtStr || !beforeAtStr) {
    return NextResponse.json({}, { status: 400 });
  }

  const scheduleExcludedVideos = await strapi
    .find<StrapiResponseData<ScheduleExcluded>>(
      'schedule-excluded',
      {
        populate: '*',
      }
    )
    .then(resp => {
      return resp.data.attributes.videos.data;
    });

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
          videoId: {
            $notIn: scheduleExcludedVideos.map(video => video.attributes.videoId),
          },
        },
        populate: [
          'thumbnails',
          'auhtor',
        ],
        sort: 'scheduledStartsAt:asc',
        pagination: {
          start: 0,
          limit: 100,
          withCount: false,
        },
      }
    )
    .then((resp) => {
      const schedule: LiveScheduleByDate[] = [];

      for(const video of resp.data) {
        const {
          scheduledStartsAt: _scheduledStartsAt,
        } = video.attributes;
        const scheduledStartsAt = _scheduledStartsAt ? new Date(_scheduledStartsAt) : null;

        if(!scheduledStartsAt) {
          continue;
        }
        
        const scheduledStartsAtZero = new Date(scheduledStartsAt.getFullYear(), scheduledStartsAt.getMonth(), scheduledStartsAt.getDate());

        const dateBucket = (() => {
          const _dateBucket = schedule.find(e => e.date === scheduledStartsAtZero.toISOString());
          if(_dateBucket) return _dateBucket;
          const _newDateBucket: LiveScheduleByDate = {
            date: scheduledStartsAtZero.toISOString(),
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
