import getSchedule from "@/app/_libs/strapi/schedule/getSchedule";
import listInProgressLiveStreams from "@/app/_libs/strapi/schedule/listInProgressLiveStreams";
import Heading1 from "@/components/Heading/Heading1";
import {
  Box,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import ScheduleMain from "./_components/ScheduleMain";
import { Metadata } from "next";
import deepmerge from "deepmerge";
import defaultMetadata from "@/constants/defaultMetadata";

export const dynamic = 'force-dynamic';

export const metadata = deepmerge<Metadata>(
  defaultMetadata,
  {
    title: 'スケジュール | 剣城まひる.fans - 非公式ファンサイト',
    openGraph: {
      title: 'スケジュール | 剣城まひる.fans - 非公式ファンサイト',
    },
    twitter: {
      title: 'スケジュール | 剣城まひる.fans - 非公式ファンサイト',
    },
  }
);

export default async function SchedulePage() {
  const {
    data: inProgressLiveStreams,
    error: inProgressLiveStreamsError,
  } = await listInProgressLiveStreams();

  const now = new Date();
  const beforeAt = new Date((new Date(now.getFullYear(), now.getMonth(), now.getDate())).getTime() + (1000 * 60 * 60 * 24 * 7));
  const {
    data: schedule,
    error: scheduleError,
  } = await getSchedule({ afterAt: now, beforeAt });

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

            {(inProgressLiveStreamsError || scheduleError) && (
              <Box
                px={2}
                py={3}
              >
                <Typography
                  align="center"
                  component="p"
                  variant="subtitle1"
                >
                  スケジュールの取得に失敗しました.
                </Typography>
              </Box>
            )}

            {(inProgressLiveStreams && schedule) && (
              <ScheduleMain
                inProgressLiveStreams={inProgressLiveStreams}
                schedule={schedule}
              />
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
}
