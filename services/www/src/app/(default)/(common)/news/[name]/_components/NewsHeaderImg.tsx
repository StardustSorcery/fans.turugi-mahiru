'use client';

import { Box, BoxProps } from "@mui/material";

export default function NewsHeaderImg({
  ...props
}: BoxProps<
  'img',
  {
    src: string;
    alt?: string;
  }
>) {
  return (
    <Box
      component="img"
      sx={{
        aspectRatio: '16/9',
        objectFit: 'cover',
        width: '100%',
        maxWidth: theme => theme.spacing(80),
      }}
      {...props}
    />
  );
}
