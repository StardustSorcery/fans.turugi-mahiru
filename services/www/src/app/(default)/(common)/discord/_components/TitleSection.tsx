'use client';
import { GroupAdd } from "@mui/icons-material";
import {
  Box,
  BoxProps,
  Button,
  Container,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import NextLink from 'next/link';
import { notoColorEmoji } from '@/app/fonts';

export default function TitleSection({
  isError,
  isActive,
  url,
  ...props
}: BoxProps<
  'div',
  {
    isError: boolean;
    isActive: boolean;
    url: string;
  }
>): React.ReactNode {
  return (
    <Box
      py={4}
      {...props}
      sx={{
        //backgroundColor: theme => theme.palette.background.paper,
        ...props.sx,
      }}
    >
      <Container
        maxWidth="md"
      >
        <Box
          component="img"
          src="/_resources/images/discord-logo.png"
          mt={4}
          mb={4}
          sx={{
            width: '100%',
          }}
        />
      </Container>

      <Container
        maxWidth="xs"
      >
        <Button
          variant="contained"
          size="large"
          color="secondary"
          fullWidth
          startIcon={
            <GroupAdd
            />
          }
          href={url}
          target="_blank"
          disabled={isError || !isActive || url.trim() === ''}
        >
          参加する
        </Button>

        <Typography
          component="p"
          variant="caption"
          align="center"
          mt={2}
        >
          {!isError && isActive && url.trim() !== '' && (
            <>
              Discord サーバーに参加することで&nbsp;
              <Link
                component={NextLink}
                href="/privacy"
                target="_blank"
                color="secondary"
              >
                プライバシーポリシー
              </Link>
              &nbsp;に同意したものとみなします。
            </>
          )}
          {!isError && (!isActive || url.trim() === '') && (
            <>
              現在、新規メンバーの受付を停止しています。
            </>
          )}
          {isError && (
            <>
              エラーが発生しました。
            </>
          )}
        </Typography>
      </Container>
    </Box>
  )
}
