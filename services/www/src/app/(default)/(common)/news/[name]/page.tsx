import NextLink from "next/link";
import {
  Box,
  Breadcrumbs,
  Chip,
  Container,
  Divider,
  Link,
  Paper,
  Stack,
  Typography,
} from "@mui/material"
import Heading1 from "@/components/Heading/Heading1"
import { StrapiResponse } from "strapi-sdk-js";
import { News, StrapiResponseData } from "@/types/strapi";
import { notFound } from "next/navigation";
import NewsHeaderImg from "./_components/NewsHeaderImg";
import { NavigateNext } from "@mui/icons-material";
import MD2Material from "@/components/MD2Material/MD2Material";

function fetchNewsItem(name: string): Promise<{
  data: StrapiResponse<StrapiResponseData<News>> | null;
  error: Error | null;
}> {
  const url = `http://localhost:${process.env.PORT || '80'}/api/news/${name}`;

  return fetch(url, { cache: 'no-cache' })
    .then(resp => {
      if(!resp.ok) throw new Error(resp.status.toString());
      return (resp.json() as unknown) as StrapiResponse<StrapiResponseData<News>>;
    })
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

export async function generateMetadata({
  params,
}: {
  params: { name: string }
}
) {
  const {
    data: newsItem,
    error: newsItemError,
  } = await fetchNewsItem(params.name);

  if(newsItemError || !newsItem) {
    return {
      title: '剣城まひる.fans - 非公式ファンサイト',
      description: '個人VTuber『剣城 (つるぎ) まひる』さんの非公式ファンサイト',
    };
  }

  return {
    title: `${newsItem.data.attributes.title} | ニュース |剣城まひる.fans - 非公式ファンサイト`,
    description: '個人VTuber『剣城 (つるぎ) まひる』さんの非公式ファンサイト',
  };
};

export default async function NewsItemPage({
  params,
}: {
  params: { name: string }
}) {
  const {
    data: newsItem,
    error: newsItemError,
  } = await fetchNewsItem(params.name);

  if(newsItemError && Number(newsItemError.message) === 404) {
    return notFound();
  }

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
            {(newsItemError || !newsItem) ? (
              <Typography
                align="center"
                component="p"
                variant="subtitle1"
              >
                ニュースの取得に失敗しました.
              </Typography>
            ) : (
              <>
                <Box
                  px={3}
                  py={1}
                >
                  <Breadcrumbs
                    separator={<NavigateNext fontSize="small" />}
                  >
                    {[
                      <Link
                        key="1"
                        component={NextLink}
                        href="/news"
                        color="inherit"
                        underline="hover"
                      >
                        ニュース
                      </Link>,
                      <Typography
                        key="2"
                        color="text.primary"
                      >
                        {newsItem.data.attributes.title}
                      </Typography>
                    ]}
                  </Breadcrumbs>
                </Box>
                <Divider
                />

                <Heading1
                  text={newsItem.data.attributes.title}
                />
                <Stack
                  flexDirection="row"
                  gap={1}
                  px={2}
                  mb={.5}
                >
                  {newsItem.data.attributes.newsTags.data.sort((a,b) => a.id - b.id).map(tag => (
                    <Chip
                      key={tag.id}
                      label={tag.attributes.displayName}
                      size="small"
                    />
                  ))}
                </Stack>

                {newsItem.data.attributes.thumbnail.data && (
                  <Stack
                    alignItems="center"
                    px={2}
                    pb={2}
                  >
                    <NewsHeaderImg
                      src={new URL(newsItem.data.attributes.thumbnail.data.attributes.url, process.env.NEXT_PUBLIC_CMS_PUBLIC_URL).toString()}
                    />
                  </Stack>
                )}

                <Box
                  px={2}
                  py={3}
                >
                  <MD2Material
                    markdown={newsItem.data.attributes.body}
                  />
                </Box>
              </>
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
}
