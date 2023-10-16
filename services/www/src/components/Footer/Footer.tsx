'use client';
import {
  useState,
  useEffect,
} from 'react';
import {
  Box,
  Stack,
  type BoxProps,
  Typography,
  Link,
} from "@mui/material";

export default function Footer({
  ...props
}: BoxProps): React.ReactNode {
  const [ year, setYear ] = useState<string>('');
  useEffect(() => {
    setYear((new Date()).getFullYear().toString());
  }, []);

  return (
    <Box
      component="footer"
      {...props}
    >
      <Stack
        py={4}
      >
        <Typography
          component="p"
          variant="caption"
          align="center"
        >
          &copy; {year} Stardust Sorcery
        </Typography>

        <Typography
          component="p"
          variant="caption"
          align="center"
        >
          この Web サイトは&nbsp;
          <Link
            href="https://ggtk.app/"
            target="_blank"
            color="secondary"
          >
            Stardust Sorcery
          </Link>
          &nbsp;が管理・運営するファンサイトであり, 剣城まひるさん公認のものではありません.
        </Typography>

        <Typography
          component="p"
          variant="caption"
          align="center"
        >
          <Link
            href="https://ggtk.app/privacy"
            target="_blank"
            color="secondary"
          >
            プライバシーポリシー
          </Link>
          &nbsp;|&nbsp;
          <Link
            href="https://ggtk.app/contact"
            target="_blank"
            color="secondary"
          >
            お問い合わせ
          </Link>
        </Typography>
      </Stack>
    </Box>
  );
}
