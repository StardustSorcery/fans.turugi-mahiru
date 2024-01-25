import { singInWithGoogle, singInWithTwitter } from "@/utils/firebase/auth";
import {
  Button,
  Link,
  Stack,
  StackProps,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import { useState } from "react";

export default function SignInForm({
  onComplete = () => {},
  onError = () => {},
  ...props
}: StackProps<
  'div',
  {
    onComplete?: () => any;
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
            textTransform: 'unset',
            color: theme => theme.palette.grey['800'],
          }}
          onClick={() => {
            setIsProcessing(true);
            singInWithGoogle()
              .then(() => {
                onComplete();
              })
              .catch(err => {
                onError(err);
              })
              .finally(() => {
                setIsProcessing(false);
              });
          }}
          disabled={isProcessing}
        >
          Google
        </Button>

        <Button
          variant="outlined"
          color="inherit"
          fullWidth
          sx={{
            textTransform: 'unset',
            color: theme => theme.palette.grey['800'],
          }}
          onClick={() => {
            setIsProcessing(true);
            singInWithTwitter()
              .then(() => {
                onComplete();
              })
              .catch(err => {
                onError(err);
              })
              .finally(() => {
                setIsProcessing(false);
              });
          }}
          disabled={isProcessing}
        >
          X (旧 Twitter)
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
