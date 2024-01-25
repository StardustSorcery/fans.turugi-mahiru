'use client';

import { Button, Stack, Typography } from "@mui/material";
import Link from "next/link";

export default function NotFound() {
  return (
    <Stack
      alignItems="center"
      gap={3}
      px={2}
      py={4}
    >
      <Typography
        component="p"
        variant="subtitle1"
        align="center"
      >
        お探しのニュースは見つかりませんでした.
      </Typography>

      <Button
        LinkComponent={Link}
        href="/news"
        variant="outlined"
        color="secondary"
      >
        一覧にもどる
      </Button>
    </Stack>
  );
}
