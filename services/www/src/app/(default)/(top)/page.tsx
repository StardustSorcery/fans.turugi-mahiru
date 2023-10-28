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
import { News, StrapiResponseData } from '@/types/strapi';
import NewsItem from '@/components/News/NewsItem';

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
    data: latestNews,
    error: latestNewsError,
  } = await fetchLatestNews();

  return (
    <>
      <SideNavTriggerWrapper
      />

      <Top
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
            <Stack
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Heading1
                icon="🩹"
                text="最新ニュース"
              />

              <Button
                LinkComponent={NextLink}
                href="/news"
                variant="outlined"
                color="secondary"
                sx={{
                  mx: 2,
                }}
              >
                ニュース 一覧
              </Button>
            </Stack>
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
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}
