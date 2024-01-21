import Heading1 from "@/components/Heading/Heading1";
import {
  Box,
  Container,
  Paper,
} from "@mui/material";
import Ranking from "./_components/Ranking";

export const metadata = {
  title: 'ランキング | 剣城まひる.fans - 非公式ファンサイト',
  description: 'VTuber『剣城 (つるぎ) まひる』さんの非公式ファンサイト',
};

export default async function RankingPage() {
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

            <Ranking
            />
          </Box>
        </Container>
      </Box>
    </>
  );
}
