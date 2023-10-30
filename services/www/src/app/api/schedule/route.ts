import { NextRequest, NextResponse } from 'next/server';
import strapi from '@/app/api/_libs/strapi';
import type {
  Video,
  StrapiResponseData,
} from '@/types/strapi';
import { StrapiRequestParams } from 'strapi-sdk-js';
import { LiveSchedule, LiveScheduleByDate } from '@/types/schedule';

export async function GET(req: NextRequest): Promise<NextResponse> {
  const searchParams = req.nextUrl.searchParams;

  const afterAtStr = searchParams.get('afterAt');
  const beforeAtStr = searchParams.get('beforeAt');
  const includeInProgressLive = (searchParams.get('includeInProgressLive') || 'false').toLowerCase() === 'true';

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
          $or: [
            {
              scheduledStartsAt: {
                $gte: afterAt,
                $lt: beforeAt,
              },
              isUpcomingLiveStream: true,
            },
            ...(includeInProgressLive ? [{
              isInProgressLiveStream: true,
            }] : []),
          ],
        },
      }
    )
    .then((resp) => {
      const schedule: LiveSchedule = {
        inProgress: [],
        byDate: [],
      };

      for(const video of resp.data) {
        const {
          isInProgressLiveStream,
          scheduledStartsAt: _scheduledStartsAt,
        } = video.attributes;
        const scheduledStartsAt = _scheduledStartsAt ? new Date(_scheduledStartsAt) : null;

        if(isInProgressLiveStream) {
          schedule.inProgress.push(video);
        }
        else if(scheduledStartsAt) {
          const dateBucket = (() => {
            const _dateBucket = schedule.byDate.find(e => e.date.getTime() === scheduledStartsAt.getTime());
            if(_dateBucket) return _dateBucket;
            const _newDateBucket: LiveScheduleByDate = {
              date: new Date(scheduledStartsAt.getFullYear(), scheduledStartsAt.getMonth(), scheduledStartsAt.getDate()),
              videos: [],
            };
            schedule.byDate.push(_newDateBucket);
            return _newDateBucket;
          })();

          dateBucket.videos.push(video);
        }
      }

      return NextResponse.json(schedule);
    })
    .catch(err => {
      console.error('/api/schedule', err);
      return NextResponse.json({}, { status: 500 });
    });
}
