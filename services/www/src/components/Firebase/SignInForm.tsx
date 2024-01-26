'use client';
import { singInWithGoogle, singInWithTwitter } from "@/utils/firebase/auth";
import {
  Box,
  Button,
  Link,
  Stack,
  StackProps,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import { useState } from "react";

export default function SignInForm({
  onError = () => {},
  ...props
}: StackProps<
  'div',
  {
    onError?: (error: any) => any;
  }
>): React.ReactNode {
  const [ isProcessing, setIsProcessing ] = useState<boolean>(false);

  return (
    <Stack
      gap={3}
      {...props}
    >
      <Stack
        gap={2}
      >
        <Button
          variant="outlined"
          color="inherit"
          fullWidth
          sx={{
            py: 0,
            textTransform: 'unset',
            color: theme => theme.palette.grey['800'],
          }}
          onClick={() => {
            setIsProcessing(true);
            singInWithGoogle()
              .catch(err => {
                onError(err);
                setIsProcessing(false);
              });
          }}
          disabled={isProcessing}
        >
          <Box
            component="img"
            src="/_resources/images/social/g-logo.png"
            sx={{
              boxSizing: 'content-box',
              width: '20px',
              height: '20px',
              p: '10px',
              ml: '2px',
            }}
          />
          Google でログイン
        </Button>

        <Button
          variant="outlined"
          color="inherit"
          fullWidth
          sx={{
            py: 0,
            textTransform: 'unset',
            color: theme => theme.palette.grey['800'],
          }}
          onClick={() => {
            setIsProcessing(true);
            singInWithTwitter()
              .catch(err => {
                onError(err);
                setIsProcessing(false);
              });
          }}
          disabled={isProcessing}
        >
          <Box
            component="img"
            src="/_resources/images/social/x_black.png"
            sx={{
              boxSizing: 'content-box',
              width: '20px',
              height: '20px',
              p: '10px',
              ml: '2px',
            }}
          />
          X (旧 Twitter) でログイン
        </Button>
      </Stack>

      <Typography
        component="p"
        variant="caption"
      >
        ログインすることで&nbsp;
        <Link
          component={NextLink}
          href="/privacy"
          target="_blank"
          color="secondary"
        >
          プライバシーポリシー
        </Link>
        &nbsp;と&nbsp;
        <Link
          component={NextLink}
          href="/terms"
          target="_blank"
          color="secondary"
        >
          利用規約
        </Link>
        &nbsp;に同意したものとみなします。

      </Typography>
    </Stack>
  );
}
