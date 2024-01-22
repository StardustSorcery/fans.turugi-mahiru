import { NextRequest, NextResponse } from "next/server";
import strapi, { upsertVideo } from "../../_libs/strapi";
import { StrapiResponseData, Video } from "@/types/strapi";
import * as Youtubei from "../../_libs/youtubei";

export function GET(req: NextRequest): Promise<NextResponse> {
  return (async () => {
    const searchParams = req.nextUrl.searchParams;

    const provider = searchParams.get('provider');
    const videoId = searchParams.get('videoId');

    if(
      !provider
      || !videoId
    ) {
      return NextResponse.json({}, { status: 400 });
    }

    // Try to find from CMS.
    const record = await strapi
      .find<StrapiResponseData<Video>[]>(
        'videos',
        {
          filters: {
            provider,
            videoId,
          },
          populate: [
            'thumbnails',
            'author',
          ],
          pagination: {
            page: 1,
            pageSize: 1,
            withCount: false,
          },
        }
      )
      .then(res => {
        return res.data[0];
      });

    if(record) {
      return NextResponse.json(record);
    }

    // If not exist on CMS, get data from provider and insert record.
    switch(provider) {
      default: {
        return NextResponse.json({}, { status: 400 });
      }
      case 'youtube': {
        const youtubei = await Youtubei.init();

        const videoInfo = await youtubei
          .getInfo(videoId)
          .catch(err => {
            return null;
          });
        if(!videoInfo) return NextResponse.json({}, { status: 400 });

        if(videoInfo.basic_info.channel?.id !== 'UCSzT-rU62SSiham-g1Dj9yw') {
          return NextResponse.json({ code: 'invalid-video-owner' }, { status: 400 });
        }

        const record: Omit<Video, 'etag' | 'raw'> = {
          provider: 'youtube',
          videoId: videoId,
          type: 'LiveStream',
          title: videoInfo.basic_info.title || '',
          description: '',
          thumbnails:
            videoInfo.basic_info.thumbnail
              ?.map(t => ({
                url: t.url,
                width: t.width,
                height: t.height,
              }))
            || [{
              url: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
              width: -1,
              height: -1,
            }],
          author: {
            authorId: videoInfo.basic_info.channel.id || null,
            title: videoInfo.basic_info.channel.name || null,
          },
          isInProgressLiveStream: false,
          isUpcomingLiveStream: false,
          videoPublishedAt: null,
          scheduledStartsAt: null,
          scheduledEndsAt: null,
          startedAt: null,
          endedAt: null,
          client: 'youtubei.js',
        };

        const insertedRecord = await upsertVideo(record, videoInfo);
        if(!insertedRecord) {
          throw new Error('insertedRecord is empty');
        }

        return NextResponse.json(insertedRecord);
      }
    }

  })()
    .catch(err => {
      console.error(err);
      return NextResponse.json({}, { status: 500 });
    });
}
