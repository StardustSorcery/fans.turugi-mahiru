import Heading1 from "@/components/Heading/Heading1";
import VideoListItem from "@/components/Video/VideoListItem";
import { LiveScheduleByDate } from "@/types/schedule";
import date2str from "@/utils/date2str";
import {
  Box,
  Container,
  List,
  Paper,
  Typography,
} from "@mui/material";

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
      else return (resp.json() as unknown) as (Omit<LiveScheduleByDate, 'date'> & { date: string })[];
    })
    .then(data => {
      const converted: LiveScheduleByDate[] = [];
      for(const bucket of data) {
        const convertedBucket: LiveScheduleByDate = {
          ...bucket,
          date: new Date(bucket.date),
        };
        converted.push(convertedBucket);
      }
      return converted;
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

            {(scheduleError || !schedule) ? (
              <Typography
                align="center"
                component="p"
                variant="subtitle1"
              >
                スケジュールの取得に失敗しました.
              </Typography>
            ) : (
              <>
                {/*schedule.inProgress.length > 0 && (
                  <Box
                    component="section"
                  >
                    <Typography
                    >
                      ライブ配信中
                    </Typography>

                    <List
                    >
                      <VideoListItem
                        video={schedule.inProgress[0]}
                      />
                    </List>
                  </Box>
                )*/}

                {schedule.map((bucket) => (
                  <>
                    <Typography
                    >
                      {`${date2str(bucket.date)} (${['日','月','火','水','木','金','土'][bucket.date.getDay()]})`}
                    </Typography>
                    <List
                    >
                      <VideoListItem
                        video={bucket.videos[0]}
                      />
                    </List>
                  </>
                ))}
              </>
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
}
