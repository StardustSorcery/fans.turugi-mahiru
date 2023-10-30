import Heading1 from "@/components/Heading/Heading1";
import Heading2 from "@/components/Heading/Heading2";
import VideoListItem from "@/components/Video/VideoListItem";
import { LiveScheduleByDate } from "@/types/schedule";
import { StrapiResponseData, Video } from "@/types/strapi";
import date2str from "@/utils/date2str";
import {
  Box,
  Container,
  List,
  Paper,
  Typography,
} from "@mui/material";
import { StrapiResponse } from "strapi-sdk-js";

function fetchInProgressLiveStreams(): Promise<{
  data: StrapiResponse<StrapiResponseData<Video>[]> | null;
  error: Error | null;
}> {
  const url = `http://localhost:${process.env.PORT || '80'}/api/schedule/in-progress`;

  return fetch(url, { cache: 'no-cache' })
    .then(resp => {
      if(!resp.ok) throw new Error(resp.status.toString());
      else return (resp.json() as unknown) as StrapiResponse<StrapiResponseData<Video>[]>;
    })
    .then(data => ({
      data,
      error: null,
    }))
    .catch((err: Error) => {
      console.error('schedule req', err);
      return {
        data: null,
        error: err,
      };
    });
};

function fetchSchedule(): Promise<{
  data: LiveScheduleByDate[] | null;
  error: Error | null;
}> {
  const now = new Date();
  const todayZeroDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const url =
    `http://localhost:${process.env.PORT || '80'}/api/schedule?`
    + (new URLSearchParams({
        afterAt: now.toString(),
        beforeAt: (new Date(todayZeroDate.getTime() + (1000 * 60 * 60 * 24 * 7))).toString(),
      })).toString();

  return fetch(url, { cache: 'no-cache' })
    .then(resp => {
      if(!resp.ok) throw new Error(resp.status.toString());
      else return (resp.json() as unknown) as LiveScheduleByDate[];
    })
    .then(data => ({
      data,
      error: null,
    }))
    .catch((err: Error) => {
      console.error('schedule req', err);
      return {
        data: null,
        error: err,
      };
    });
};

export default async function SchedulePage() {
  const {
    data: inProgressLiveStreams,
    error: inProgressLiveStreamsError,
  } = await fetchInProgressLiveStreams();

  const {
    data: schedule,
    error: scheduleError,
  } = await fetchSchedule();

  return (
    <>
      <Box
        component="main"
        my={4}
      >
        <Container
          maxWidth="lg"
        >
          <Box
            component={Paper}
            elevation={6}
          >
            <Heading1
              icon="🩹"
              text="スケジュール"
            />

            {(inProgressLiveStreamsError || !inProgressLiveStreams || scheduleError || !schedule) ? (
              <Typography
                align="center"
                component="p"
                variant="subtitle1"
              >
                スケジュールの取得に失敗しました.
              </Typography>
            ) : (
              <>
                {inProgressLiveStreams.data.length > 0 && (
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
                      {inProgressLiveStreams.data.map(video => (
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
                          video={bucket.videos[0]}
                        />
                      ))}
                    </List>
                  </Box>
                ))}
              </>
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
}
