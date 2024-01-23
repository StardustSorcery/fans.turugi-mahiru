import { Button, Container, Paper, Stack, Typography } from "@mui/material";
import { Metadata } from "next";
import Link from "next/link";
import deepmerge from 'deepmerge';
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

export default function NotFound() {
  return (
    <Stack
      justifyContent="center"
      sx={{
        minHeight: '100dvh',
      }}
    >
      <Container
        maxWidth="sm"
      >
        <Stack
          component={Paper}
          elevation={6}
          p={4}
        >
          <Typography
            align="center"
          >
            お探しのページは見つかりませんでした。
          </Typography>

          <Button
            variant="outlined"
            color="secondary"
            LinkComponent={Link}
            href="/"
            sx={{
              mt: 4,
            }}
          >
            トップにもどる
          </Button>
        </Stack>
      </Container>
    </Stack>
  );
}
