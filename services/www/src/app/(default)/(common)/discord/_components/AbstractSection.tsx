'use client';
import {
  Box,
  BoxProps,
  Container,
  Typography,
} from "@mui/material";

export default function AbstractSection({
  ...props
}: BoxProps<
  'div',
  {}
>): React.ReactNode {
  return (
    <Box
      py={4}
      {...props}
      sx={{
        backgroundColor: theme => theme.palette.mBlue.main,
        color: theme => theme.palette.mBlue.contrastText,
        ...props.sx,
      }}
    >
      <Container
        maxWidth="md"
      >
        <Typography
          component="h2"
          paragraph
          align="center"
          sx={{
            fontSize: theme => theme.typography.h5.fontSize,
            fontWeight: theme => theme.typography.fontWeightBold,
          }}
        >
          剣城まひるのファン「絆創膏パシリ隊」が集まる Discord サーバー
        </Typography>

        <Box
          sx={{
            textAlign: 'center',
          }}
        >
          <Typography
            paragraph
          >
            剣城まひるのファン同士での交流や企画を目的としたファンサーバーです。
          </Typography>
          <Typography
            paragraph
          >
            雑談や情報共有のためのチャンネルに加え、サプライズ企画やコミックマーケットをはじめとした同人誌即売会への参加などをファン同士で企画できるチャンネルがあります。
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
