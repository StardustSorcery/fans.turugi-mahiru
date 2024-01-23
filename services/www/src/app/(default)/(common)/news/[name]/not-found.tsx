import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import NotFound from "./_components/NotFound";
import { Metadata } from "next";
import deepmerge from "deepmerge";
import defaultMetadata from "@/constants/defaultMetadata";

export const metadata = deepmerge<Metadata>(
  defaultMetadata,
  {
    title: 'ページが見つかりませんでした | 剣城まひる.fans - 非公式ファンサイト',
    openGraph: {
      title: 'ページが見つかりませんでした | 剣城まひる.fans - 非公式ファンサイト',
    },
    twitter: {
      title: 'ページが見つかりませんでした | 剣城まひる.fans - 非公式ファンサイト',
    },
  }
);

export default function NewsItemNotFound() {
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
            <NotFound
            />
          </Box>
        </Container>
      </Box>
    </>
  );
}
