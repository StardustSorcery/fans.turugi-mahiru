import Heading1 from "@/components/Heading/Heading1";
import {
  Box,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import strapi from "@/app/_libs/strapi";
import { Ranking, StrapiResponseData } from "@/types/strapi";
import RankingMain from "./_components/Ranking";
import getRanking from "@/app/_libs/strapi/ranking/getRanking";
import { Metadata } from "next";
import deepmerge from "deepmerge";
import defaultMetadata from "@/constants/defaultMetadata";

export const metadata = deepmerge<Metadata>(
  defaultMetadata,
  {
    title: 'ランキング | 剣城まひる.fans - 非公式ファンサイト',
    openGraph: {
      title: 'ランキング | 剣城まひる.fans - 非公式ファンサイト',
    },
    twitter: {
      title: 'ランキング | 剣城まひる.fans - 非公式ファンサイト',
    },
  }
);

export default async function RankingPage() {
  const {
    data,
    error,
  } = await getRanking({ limit: 100 });

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
              text="ランキング"
            />

            <Box
              px={2}
              py={3}
            >
              {(data && !error) ? (
                <RankingMain
                  ranking={data}
                />
              ) : (
                <Typography
                  align="center"
                  component="p"
                  variant="subtitle1"
                >
                  データの読み込み中にエラーが発生しました。
                </Typography>
              )}
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}
