import NextLink from 'next/link';
import {
  Box,
  Button,
  Container,
  Divider,
  List,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Top from "./_components/Top";
import SideNavTriggerWrapper from "./_components/SideNavTriggerWrapper";
import TabNavigationWrapper from "./_components/TabNavigationWrapper";
import Heading1 from '@/components/Heading/Heading1';
import { StrapiResponse } from 'strapi-sdk-js';
import { News, StrapiResponseData, Video } from '@/types/strapi';
import NewsItem from '@/components/News/NewsItem';
import FloatingAccountMenu from './_components/FloatingAccountMenu';

export const metadata = {
  title: '剣城まひる.fans - 非公式ファンサイト',
  description: 'VTuber『剣城 (つるぎ) まひる』さんの非公式ファンサイト',
};

function fetchLatestLiveStream(): Promise<{
  data: StrapiResponseData<Video> | null;
  error: Error | null;
}> {
  const url = `http://localhost:${process.env.PORT || '80'}/api/schedule/latest`;

  return fetch(url, { cache: 'no-cache' })
    .then(resp => {
      if(!resp.ok) throw new Error(resp.status.toString());
      else return (resp.json() as unknown) as StrapiResponseData<Video> | null;
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

function fetchLatestNews(): Promise<{
  data: StrapiResponse<StrapiResponseData<News>[]> | null;
  error: Error | null;
}> {
  const url = `http://localhost:${process.env.PORT || '80'}/api/news?` + (new URLSearchParams({ page: '1', pageSize: '5' })).toString();

  return fetch(url, { cache: 'no-cache' })
    .then(resp => (resp.json() as unknown) as StrapiResponse<StrapiResponseData<News>[]>)
    .then(data => ({
      data,
      error: null,
    }))
    .catch((err: Error) => {
      console.error(err);
      return {
        data: null,
        error: err,
      };
    });
};

export default async function TopPage() {
  const {
    data: latestLiveStream,
    error: latestLiveStreamError,
  } = await fetchLatestLiveStream();

  const {
    data: latestNews,
    error: latestNewsError,
  } = await fetchLatestNews();

  return (
    <>
      <SideNavTriggerWrapper
      />

      <FloatingAccountMenu
      />

      <Top
        latestLiveStream={(latestLiveStreamError || !latestLiveStream) ? null : latestLiveStream.attributes}
      />

      <TabNavigationWrapper
      />

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
              text="最新ニュース"
            />
            <Divider
            />
            <Box
            >
              {(latestNewsError || !latestNews) ? (
                <Typography
                  align="center"
                  component="p"
                  variant="subtitle1"
                >
                  ニュースの取得に失敗しました.
                </Typography>
              ) : (
                <List
                >
                  {latestNews.data.map(newsItem => (
                    <NewsItem
                      key={newsItem.id}
                      newsItem={newsItem}
                      divider
                    />
                  ))}
                </List>
              )}

              <Stack
                px={2}
                pt={1}
                pb={2}
                alignItems="center"
              >
                <Button
                  LinkComponent={NextLink}
                  href="/news"
                  variant="outlined"
                  color="secondary"
                  sx={{
                    mr: 1,
                  }}
                >
                  すべてのニュースを見る
                </Button>
              </Stack>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}
