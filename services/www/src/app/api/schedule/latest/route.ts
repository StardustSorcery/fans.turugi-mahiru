import { NextRequest, NextResponse } from 'next/server';
import strapi from '@/app/api/_libs/strapi';
import type {
  Video,
  StrapiResponseData,
  ScheduleExcluded,
} from '@/types/strapi';

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const now = Date.now();

    // fetch in-progress live stream
    const inProgressLiveStreams = await strapi
      .find<StrapiResponseData<Video>[]>(
        'videos',
        {
          populate: '*',
          filters: {
            isInProgressLiveStream: true,
          },
          pagination: {
            start: 0,
            limit: 1,
            withCount: false,
          },
        },
      );

    if(inProgressLiveStreams.data.length > 0) {
      return NextResponse.json(inProgressLiveStreams.data[0]);
    }

    // if not found, fetch latest upcoming
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

    const latestUpcomingLiveStreams = await strapi
      .find<StrapiResponseData<Video>[]>(
        'videos',
        {
          populate: '*',
          filters: {
            isUpcomingLiveStream: true,
            scheduledStartsAt: {
              $gte: new Date(now),
            },
            videoId: {
              $notIn: scheduleExcludedVideos.map(video => video.attributes.videoId),
            },
          },
          sort: 'scheduledStartsAt:asc',
          pagination: {
            start: 0,
            limit: 1,
            withCount: false,
          },
        },
      );

    if(latestUpcomingLiveStreams.data.length === 0) {
      return NextResponse.json(null);
    }

    return NextResponse.json(latestUpcomingLiveStreams.data[0]);
  }
  catch(err) {
    console.error(err);
    return NextResponse.json({}, { status: 500 });
  }
}
