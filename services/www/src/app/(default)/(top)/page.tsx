import {
  Box,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import Top from "./_components/Top";
import SideNavTriggerWrapper from "./_components/SideNavTriggerWrapper";
import TabNavigationWrapper from "./_components/TabNavigationWrapper";
import { type StrapiResponse } from "strapi-sdk-js";
import type {
  News,
  StrapiResponseData,
} from '@/types/strapi';

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
            <Typography
            >
              最新ニュース
            </Typography>

            {(latestNewsError || !latestNews) ? (
              <Typography
              >
                ニュースの取得に失敗しました.
              </Typography>
            ) : (
              <>
                {latestNews.data.map(newsItem => (
                  <Typography
                    key={newsItem.id}
                  >
                    {newsItem.attributes.title}
                  </Typography>
                ))}
              </>
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
}
