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

export const metadata = {
  title: 'ランキング | 剣城まひる.fans - 非公式ファンサイト',
  description: 'VTuber『剣城 (つるぎ) まひる』さんの非公式ファンサイト',
};

async function fetchRanking(): Promise<{ data: StrapiResponseData<Ranking>; error: null} | { data: null; error: any; }> {
  return await strapi
    .find<StrapiResponseData<Ranking>[]>(
      'rankings',
      {
        populate: [
          'scoredVideos',
          'scoredVideos.video',
          'scoredVideos.video.thumbnails',
          'scoredVideos.video.author',
        ],
        sort: [
          'aggregatedAt:desc',
        ],
        pagination: {
          page: 1,
          pageSize: 1,
          withCount: false,
        },
      }
    )
    .then(res => {
      const data = res.data[0] || null;

      if(data && data.attributes.scoredVideos.length > 100) {
        data.attributes.scoredVideos = data.attributes.scoredVideos.slice(0, 100);
      }

      return {
        data: data,
        error: null,
      };
    })
    .catch(err => {
      console.error(err);
      return {
        data: null,
        error: err,
      };
    });
}

export default async function RankingPage() {
  const {
    data,
    error,
  } = await fetchRanking();

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
