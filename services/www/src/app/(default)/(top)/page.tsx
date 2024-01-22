import NextLink from 'next/link';
import {
  Box,
  Button,
  Container,
  Divider,
  List,
  NoSsr,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Top from "./_components/Top";
import SideNavTriggerWrapper from "./_components/SideNavTriggerWrapper";
import TabNavigationWrapper from "./_components/TabNavigationWrapper";
import Heading1 from '@/components/Heading/Heading1';
import NewsItem from '@/components/News/NewsItem';
import FloatingAccountMenu from './_components/FloatingAccountMenu';
import getLatestLiveStream from '@/app/_libs/strapi/schedule/getLatestLiveStream';
import listNews from '@/app/_libs/strapi/news/listNews';
import getRanking from '@/app/_libs/strapi/ranking/getRanking';
import VideoListItem from '@/components/Video/VideoListItem';
import date2str from '@/utils/date2str';

export const metadata = {
  title: '剣城まひる.fans - 非公式ファンサイト',
  description: 'VTuber『剣城 (つるぎ) まひる』さんの非公式ファンサイト',
};

export default async function TopPage() {
  const {
    data: latestLiveStream,
    error: latestLiveStreamError,
  } = await getLatestLiveStream();

  const {
    data: latestNews,
    error: latestNewsError,
  } = await listNews({ page: 1, pageSize: 5 });

  const {
    data: ranking,
    error: rankingError,
  } = await getRanking({ limit: 5 });

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
        mb={4}
      >
        <Container
          maxWidth="lg"
        >
          <Box
            component={Paper}
            variant="outlined"
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
                  {latestNews.map(newsItem => (
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

          <Box
            mt={4}
            component={Paper}
            variant="outlined"
          >
            <Heading1
              icon="🐥"
              text="ランキング"
            />
            <Divider
            />
            <Box
            >
              {(rankingError || !ranking) ? (
                <Typography
                  align="center"
                  component="p"
                  variant="subtitle1"
                >
                  ランキングの取得に失敗しました.
                </Typography>
              ) : (
                <List
                >
                  {ranking.attributes.scoredVideos.map(scoredVideo => {
                    const video = scoredVideo.video.data;

                    return (
                      <VideoListItem
                        item={{
                          video,
                          title: video.attributes.title,
                          subtitle: (
                            video.attributes.videoPublishedAt
                              ? <NoSsr>公開日: {date2str(new Date(video.attributes.videoPublishedAt))}</NoSsr>
                              : undefined
                          ),
                        }}
                      />
                    );
                  })}
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
                  すべてのランキングを見る
                </Button>
              </Stack>
            </Box>
          </Box>

        </Container>
      </Box>
    </>
  );
}
