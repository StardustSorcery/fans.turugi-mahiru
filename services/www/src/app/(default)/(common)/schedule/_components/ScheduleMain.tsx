'use client';
import Heading2 from "@/components/Heading/Heading2";
import VideoListItem from "@/components/Video/VideoListItem";
import { LiveScheduleByDate } from "@/types/schedule";
import { StrapiResponseData, Video } from "@/types/strapi";
import date2str from "@/utils/date2str";
import { Box, BoxProps, List, Typography } from "@mui/material";

export default function ScheduleMain({
  inProgressLiveStreams,
  schedule,
  error,
  ...props
}: BoxProps<
  any,
  {
    inProgressLiveStreams: StrapiResponseData<Video>[] | null;
    schedule: LiveScheduleByDate[] | null;
    error?: any;
  }
>) {
  return (
    <Box
    >
      {(error || !inProgressLiveStreams || !schedule) ? (
        <Typography
          align="center"
          component="p"
          variant="subtitle1"
        >
          スケジュールの取得に失敗しました.
        </Typography>
      ) : (
        (inProgressLiveStreams.length === 0 && schedule.length === 0) ? (
          <Box
            px={2}
            py={3}
          >
            <Typography
              align="center"
              component="p"
              variant="subtitle1"
            >
              直近の配信予定はありません.
            </Typography>
          </Box>
        ) : (
          <>
            {inProgressLiveStreams.length > 0 && (
              <Box
                component="section"
              >
                <Heading2
                  icon="▶"
                  text="現在ライブ配信中"
                  sx={{
                    mx: 2,
                  }}
                />

                <List
                >
                  {inProgressLiveStreams.map(video => (
                    <VideoListItem
                      key={`InProgress#${video.id}`}
                      video={video}
                    />
                  ))}
                </List>
              </Box>
            )}

            {schedule.map((bucket) => (
              <Box
                component="section"
                key={bucket.date}
              >
                <Heading2
                  text={`${date2str(new Date(bucket.date))} (${['日','月','火','水','木','金','土'][new Date(bucket.date).getDay()]})`}
                  sx={{
                    mx: 2,
                  }}
                />

                <List
                >
                  {bucket.videos.map(video => (
                    <VideoListItem
                      key={`Schedule#${video.id}`}
                      video={video}
                    />
                  ))}
                </List>
              </Box>
            ))}
          </>
        )
      )}
    </Box>
  )
}
