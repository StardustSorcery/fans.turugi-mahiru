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
import { StrapiResponse } from "strapi-sdk-js";
import { News, StrapiResponseData, StrapiResponseMeta } from "@/types/strapi";
import NewsItem from "@/components/News/NewsItem";

function fetchNews(page: number): Promise<{
  data: StrapiResponse<StrapiResponseData<News>[]> | null;
  error: Error | null;
}> {
  const url = `http://localhost:${process.env.PORT || '80'}/api/news?` + (new URLSearchParams({ page: String(page), pageSize: '10' })).toString();

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

export default async function NewsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const {
    data: news,
    error: newsError,
  } = await fetchNews(Number(searchParams?.page) || 1);

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
                    {news.data.map(newsItem => (
                      <NewsItem
                        key={newsItem.id}
                        newsItem={newsItem}
                        divider
                      />
                    ))}
                  </List>

                  <Stack
                    alignItems="center"
                    p={2}
                  >
                    <LinkPagination
                      rootPath="/news"
                      variant="outlined"
                      shape="circular"
                      count={(news.meta as StrapiResponseMeta).pagination?.pageCount || 1}
                      color="secondary"
                      boundaryCount={1}
                      siblingCount={0}
                    />
                  </Stack>
                </>
              )}
          </Box>
        </Container>
      </Box>
    </>
  );
}
