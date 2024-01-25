import Heading1 from "@/components/Heading/Heading1";
import {
  Box,
  Container,
  Paper,
} from "@mui/material";
import About from "./_components/About";
import { Metadata } from "next";
import deepmerge from "deepmerge";
import defaultMetadata from "@/constants/defaultMetadata";

export const metadata = deepmerge<Metadata>(
  defaultMetadata,
  {
    title: 'このサイトについて | 剣城まひる.fans - 非公式ファンサイト',
    openGraph: {
      title: 'このサイトについて | 剣城まひる.fans - 非公式ファンサイト',
    },
    twitter: {
      title: 'このサイトについて | 剣城まひる.fans - 非公式ファンサイト',
    },
  }
);

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
