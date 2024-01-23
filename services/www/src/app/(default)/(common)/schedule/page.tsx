import getSchedule from "@/app/_libs/strapi/schedule/getSchedule";
import { listInProgressLiveStreams } from "@/app/_libs/strapi/schedule/listInProgressLiveStreams";
import Heading1 from "@/components/Heading/Heading1";
import { LiveScheduleByDate } from "@/types/schedule";
import { StrapiResponseData, Video } from "@/types/strapi";
import {
  Box,
  Container,
  Paper,
} from "@mui/material";
import { StrapiResponse } from "strapi-sdk-js";
import ScheduleMain from "./_components/ScheduleMain";
import { Metadata } from "next";
import deepmerge from "deepmerge";
import defaultMetadata from "@/constants/defaultMetadata";

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

            <ScheduleMain
              inProgressLiveStreams={inProgressLiveStreams}
              schedule={schedule}
              error={inProgressLiveStreamsError || scheduleError || null}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
}
