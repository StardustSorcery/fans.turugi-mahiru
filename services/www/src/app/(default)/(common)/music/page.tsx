import strapi from "@/app/api/_libs/strapi";
import Heading1 from "@/components/Heading/Heading1";
import { MusicVideo, StrapiResponseData } from "@/types/strapi";
import { Box, Container, Paper, Typography } from "@mui/material";
import Music from "./_components/Music";

export const metadata = {
  title: 'ミュージック | 剣城まひる.fans - 非公式ファンサイト',
  description: 'VTuber『剣城 (つるぎ) まひる』さんの非公式ファンサイト',
};

async function fetchMusicVideos(): Promise<{
  data: StrapiResponseData<MusicVideo>[] | null;
  error: Error | null;
}> {
  return await strapi
    .find<StrapiResponseData<MusicVideo>[]>(
      'music-videos',
      {
        populate: [
          'originalArtist',
          'video',
          'video.thumbnails',
        ],
        pagination: {
          page: 1,
          pageSize: 100,
          withCount: true,
        },
      }
    )
    .then(res => {
      const records = res.data;
      records.sort((a, b) => {
        const publishedAtA = new Date(a.attributes.video.data.attributes.videoPublishedAt || a.attributes.video.data.attributes.scheduledStartsAt || 0);
        const publishedAtB = new Date(b.attributes.video.data.attributes.videoPublishedAt || b.attributes.video.data.attributes.scheduledStartsAt || 0);

        return publishedAtA.getTime() - publishedAtB.getTime();
      });

      return {
        data: records,
        error: null,
      };
    })
    .catch((err: Error) => {
      console.error(err);
      return {
        data: null,
        error: err,
      };
    });
};

export default async function MusicPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const {
    data: musicVideos,
    error: musicVideosError,
  } = await fetchMusicVideos();

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
              text="ミュージック"
            />

            {(musicVideosError || !musicVideos) ? (
                <Typography
                  align="center"
                  component="p"
                  variant="subtitle1"
                >
                  データの取得に失敗しました.
                </Typography>
              ) : (
                <Music
                  defaultCategory="__all__"
                  musicVideos={musicVideos}
                />
              )}
          </Box>
        </Container>
      </Box>
    </>
  );

}
