import {
  Box,
  Container,
  List,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Heading1 from "@/components/Heading/Heading1";
import LinkPagination from "@/components/Pagination/LinkPagination";
import NewsItem from "@/components/News/NewsItem";
import listNews from "@/app/_libs/strapi/news/listNews";
import { Metadata } from "next";
import deepmerge from "deepmerge";
import defaultMetadata from "@/constants/defaultMetadata";

export const dynamic = 'force-dynamic';

export const metadata = deepmerge<Metadata>(
  defaultMetadata,
  {
    title: 'ニュース | 剣城まひる.fans - 非公式ファンサイト',
    openGraph: {
      title: 'ニュース | 剣城まひる.fans - 非公式ファンサイト',
    },
    twitter: {
      title: 'ニュース | 剣城まひる.fans - 非公式ファンサイト',
    },
  }
);

export default async function NewsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const {
    data: news,
    meta: newsMeta,
    error: newsError,
  } = await listNews({ page: Number(searchParams?.page) || 1, pageSize: 10 });

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
              text="ニュース"
            />

            {(newsError || !news) ? (
              <Typography
                align="center"
                component="p"
                variant="subtitle1"
              >
                ニュースの取得に失敗しました.
              </Typography>
            ) : (
              <>
                <List
                >
                  {news.map(newsItem => (
                    <NewsItem
                      key={newsItem.id}
                      newsItem={newsItem}
                      divider
                    />
                  ))}
                </List>

                {newsMeta && (
                  <Stack
                    alignItems="center"
                    p={2}
                  >
                    <LinkPagination
                      rootPath="/news"
                      variant="outlined"
                      shape="circular"
                      count={newsMeta.pagination?.pageCount || 1}
                      color="secondary"
                      boundaryCount={1}
                      siblingCount={0}
                    />
                  </Stack>
                )}
              </>
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
}
