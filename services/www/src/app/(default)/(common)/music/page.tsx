import Heading1 from "@/components/Heading/Heading1";
import { Box, Container, Paper, Typography } from "@mui/material";
import MusicMain from "./_components/MusicMain";
import listMusicVideos from "@/app/_libs/strapi/music/listMusicVideos";
import { Metadata } from "next";
import deepmerge from "deepmerge";
import defaultMetadata from "@/constants/defaultMetadata";

export const dynamic = 'force-dynamic';

export const metadata = deepmerge<Metadata>(
  defaultMetadata,
  {
    title: 'ミュージック | 剣城まひる.fans - 非公式ファンサイト',
    openGraph: {
      title: 'ミュージック | 剣城まひる.fans - 非公式ファンサイト',
    },
    twitter: {
      title: 'ミュージック | 剣城まひる.fans - 非公式ファンサイト',
    },
  }
);

export default async function MusicPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const {
    data: musicVideos,
    error: musicVideosError,
  } = await listMusicVideos();

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
                <MusicMain
                  defaultCategory="__all__"
                  musicVideos={musicVideos}
                  error={musicVideosError || !musicVideos || undefined}
                />
              )}
          </Box>
        </Container>
      </Box>
    </>
  );

}
