import Heading1 from "@/components/Heading/Heading1";
import {
  Box,
  Container,
  Paper,
} from "@mui/material";
import About from "./_components/About";

export const metadata = {
  title: 'このサイトについて | 剣城まひる.fans - 非公式ファンサイト',
  description: 'VTuber『剣城 (つるぎ) まひる』さんの非公式ファンサイト',
};

export default function AboutPage() {
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
              text="このサイトについて"
            />

            <About
              px={2}
              pb={3}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
}
