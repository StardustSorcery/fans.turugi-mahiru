import {
  Box,
  Chip,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material"
import Heading1 from "@/components/Heading/Heading1"
import { notFound } from "next/navigation";
import NewsHeaderImg from "./_components/NewsHeaderImg";
import MD2Material from "@/components/MD2Material/MD2Material";
import getNewsByName from "@/app/_libs/strapi/news/getNewsByName";
import NewsBreadcrumbs from "./_components/NewsBreadcrumbs";
import { Metadata } from "next";
import deepmerge from "deepmerge";
import defaultMetadata from "@/constants/defaultMetadata";

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: { name: string }
}
) {
  const {
    data: newsItem,
    error: newsItemError,
  } = await getNewsByName(params.name);

  if(newsItemError || !newsItem) {
    return deepmerge<Metadata>(
      defaultMetadata,
      {
        title: '剣城まひる.fans - 非公式ファンサイト',
      }
    );
  }

  return deepmerge<Metadata>(
    defaultMetadata,
    {
      title: `${newsItem.attributes.title} | ニュース | 剣城まひる.fans - 非公式ファンサイト`,
      openGraph: {
        title: `${newsItem.attributes.title} | ニュース | 剣城まひる.fans - 非公式ファンサイト`,
      },
      twitter: {
        title: `${newsItem.attributes.title} | ニュース | 剣城まひる.fans - 非公式ファンサイト`,
      },
    }
  );
};

export default async function NewsItemPage({
  params,
}: {
  params: { name: string }
}) {
  const {
    data: newsItem,
    error: newsItemError,
  } = await getNewsByName(params.name);

  if(!newsItem && !newsItemError) {
    return notFound();
  }

  return (
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
                <NewsBreadcrumbs
                  title={newsItem.attributes.title}
                />
              </Box>
              <Divider
              />

              <Heading1
                text={newsItem.attributes.title}
              />
              <Stack
                flexDirection="row"
                gap={1}
                px={2}
                mb={.5}
              >
                {newsItem.attributes.newsTags.data.sort((a,b) => a.id - b.id).map(tag => (
                  <Chip
                    key={tag.id}
                    label={tag.attributes.displayName}
                    size="small"
                  />
                ))}
              </Stack>

              {newsItem.attributes.thumbnail.data && (
                <Stack
                  alignItems="center"
                  px={2}
                  pb={2}
                >
                  <NewsHeaderImg
                    src={new URL(newsItem.attributes.thumbnail.data.attributes.url, process.env.NEXT_PUBLIC_CMS_PUBLIC_URL).toString()}
                  />
                </Stack>
              )}

              <Box
                px={2}
                py={3}
              >
                <MD2Material
                  markdown={newsItem.attributes.body}
                />
              </Box>
            </>
          )}
        </Box>
      </Container>
    </Box>
  );
}
