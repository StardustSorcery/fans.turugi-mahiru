'use client';
import { notoColorEmoji } from "@/app/fonts";
import {
  Box,
  Button,
  Link,
  Stack,
  StackProps,
  Typography,
  useMediaQuery,
} from "@mui/material";

export default function Profile({
  ...props
}: StackProps<
  'div',
  {}
>): React.ReactNode {
  const isMobile = useMediaQuery('(max-width:809px)'); // iPad 7 縦向き未満をモバイル判定

  return (
    <Stack
      display="flex"
      flexDirection={isMobile ? 'column' : 'row'}
      columnGap={4}
      rowGap={4}
      {...props}
    >
      <Stack
        alignItems="center"
        sx={isMobile ? {
          width: '100%',
          maxHeight: '55vh',
        } : {
          width: '55%',
          flexShrink: 0,
          py: 4,
        }}
      >
        <Box
          component="img"
          src="/_resources/images/keyvisual_1_1_frame.png"
          display="block"
          sx={{
            width: '100%',
            maxWidth: theme => theme.spacing(38),
            overflow:'hidden',
            objectFit: 'contain',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            msUserSelect: 'none',
            ...(isMobile ? {
              height: '100%',
            } : {
            }),
          }}
        />
      </Stack>

      <Stack
        gap={4}
        sx={isMobile ? {
        } : {
          flexGrow: 1,
        }}
      >
        <Box
        >
          <Typography
            align="center"
            sx={{
              fontSize: theme => theme.typography.h4.fontSize,
              fontWeight: theme => theme.typography.fontWeightBold,
            }}
          >
            剣城まひる
          </Typography>
          <Typography
            align="center"
            sx={{
              fontSize: theme => theme.typography.h6.fontSize,
              fontWeight: theme => theme.typography.fontWeightRegular,
            }}
          >
            Mahiru Tsurugi
          </Typography>
        </Box>

        <Box
        >
          <Typography
            paragraph
          >
            クズ系女子を目指してる怪我しがちな自称23歳童貞無職清楚系VTuber。
          </Typography>
          <Typography
            paragraph
          >
            2021年5月2日に事務所「はーれはれ」よりデビューし、2023年5月31日に独立。FANBOXの特典などを一新して個人VTuberとしての活動を開始した後、2023年10月16日に事務所「YES」に加入。
          </Typography>
          <Typography
            paragraph
          >
          </Typography>
        </Box>

        <Box
          display="grid"
          gridTemplateColumns="0.5fr 0.5fr"
          columnGap={2}
          rowGap={1}
        >
          {[
            {
              label: 'X (旧 Twitter)',
              url: 'https://x.com/turugi_mahiru',
            },
            {
              label: 'YouTube',
              url: 'https://www.youtube.com/@darekayashinatte_mahiu',
            },
            {
              label: 'pixivFANBOX',
              url: 'https://www.fanbox.cc/@turugimahiru',
            },
          ].map((link, index) => (
            <Button
              key={index}
              href={link.url}
              target="_blank"
              variant="outlined"
              color="secondary"
              fullWidth
              sx={{
                textTransform: 'unset',
              }}
            >
              {link.label}
            </Button>
          ))}
        </Box>

        <Stack
        >
          {[
            {
              term: '誕生日',
              description: '10月16日',
            },
            {
              term: '年齢',
              description: '23歳',
            },
            {
              term: '身長',
              description: '150cm',
            },
            {
              term: 'ファンネーム',
              description: '絆創膏パシリ隊',
            },
            {
              term: 'ファンマーク',
              description: (
                <Typography
                  component="span"
                  sx={{
                    fontFamily: notoColorEmoji.style.fontFamily,
                  }}
                >
                  🩹🐥
                </Typography>
              ),
            },
            {
              term: 'はじめの挨拶',
              description: 'こんまひ',
            },
            {
              term: 'おわりの挨拶',
              description: 'おつるぎ',
            },
            {
              term: '配信タグ',
              description: (
                <Link
                  href="https://x.com/hashtag/生ひる"
                  target="_blank"
                  color="inherit"
                  underline="hover"
                >
                  #生ひる
                </Link>
              ),
            },
            {
              term: '創作タグ',
              description: (
                <Link
                  href="https://x.com/hashtag/来世は絵描き"
                  target="_blank"
                  color="inherit"
                  underline="hover"
                >
                  #来世は絵描き
                </Link>
              ),
            },
            {
              term: 'R18 創作タグ',
              description: (
                <Link
                  href="https://x.com/hashtag/えちるぎ"
                  target="_blank"
                  color="inherit"
                  underline="hover"
                >
                  #えちるぎ
                </Link>
              ),
            },
            {
              term: 'コスプレタグ',
              description: (
                <Link
                  href="https://x.com/hashtag/来世はレイヤー"
                  target="_blank"
                  color="inherit"
                  underline="hover"
                >
                  #来世はレイヤー
                </Link>
              ),
            },
            {
              term: '汎用タグ',
              description: (
                <Link
                  href="https://x.com/hashtag/聞いてよつるぎさん"
                  target="_blank"
                  color="inherit"
                  underline="hover"
                >
                  #聞いてよつるぎさん
                </Link>
              ),
            },
            {
              term: 'スケジュールタグ',
              description: (
                <Link
                  href="https://x.com/hashtag/今週のまひる"
                  target="_blank"
                  color="inherit"
                  underline="hover"
                >
                  #今週のまひる
                </Link>
              ),
            },
          ].map((list, index) => (
            <Box
              key={index}
              component="dl"
              display="flex"
              m={0}
              p={0}
              sx={{
                borderBottom: theme => `1px solid ${theme.palette.divider}`,
              }}
            >
              <Stack
                component="dt"
                width="8em"
                m={0}
                p={1.5}
                flexShrink={0}
                justifyContent="center"
              >
                {list.term}
              </Stack>
              <Stack
                component="dd"
                width="calc(100% - 8em)"
                flexShrink={0}
                m={0}
                p={1.5}
                justifyContent="center"
              >
                {list.description}
              </Stack>
            </Box>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
}
