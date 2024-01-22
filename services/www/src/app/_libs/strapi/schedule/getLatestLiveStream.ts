import strapi from '@/app/api/_libs/strapi';
import type {
  Video,
  StrapiResponseData,
  ScheduleExcluded,
} from '@/types/strapi';

export default async function getLatestLiveStream(): Promise<{ data: StrapiResponseData<Video> | null; error: any; }> {
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
      )
      .then(res => {
        return res.data[0] || null;
      });

    if(inProgressLiveStreams) {
      return {
        data: inProgressLiveStreams,
        error: null,
      };
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
      )
      .then(res => {
        return res.data[0] || null;
      });

    return {
      data: latestUpcomingLiveStreams,
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
