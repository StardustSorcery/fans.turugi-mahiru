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
  Container,
  List,
  ListItem,
  type LinkProps,
  ListItemText,
  type TypographyProps,
  useMediaQuery,
  ListItemIcon,
} from "@mui/material";
import {
  alpha,
  styled,
} from '@mui/material/styles';
import NextLink from 'next/link';
import { notoEmoji } from '@/app/fonts';

const FooterSectionTitle = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontSize: theme.typography.subtitle1.fontSize,
  fontWeight: theme.typography.fontWeightBold,
}))

const FooterLink = styled((props: LinkProps) => (
  <Link
    component={NextLink}
    color="inherit"
    {...props}
  />
))<LinkProps>(() => ({}));

const FooterListLink = styled((props: LinkProps) => (
  <Link
    component={NextLink}
    color="inherit"
    {...props}
  />
))<LinkProps>(() => ({}));

const FooterListItemText = (item: {
  label: React.ReactNode;
  subLabel?: React.ReactNode;
  href?: string;
  targetIsBlank?: boolean;
}) => (
  <ListItemText
    primary={item.label}
    primaryTypographyProps={item.href ? {
      component: FooterListLink,
      display: 'inline-block',
      href: item.href,
      ...(item.targetIsBlank && { target: '_blank' }),
    } : {
      sx: {
        color: 'inherit',
      },
    }}
    secondary={item.subLabel}
    secondaryTypographyProps={{
      color: 'inherit',
      sx: {
        opacity: .6,
      },
    }}
  />
);

export default function Footer({
  ...props
}: BoxProps): React.ReactNode {
  const [ year, setYear ] = useState<string>('');
  useEffect(() => {
    setYear((new Date()).getFullYear().toString());
  }, []);

  const isMobile = useMediaQuery('(max-width:809px)'); // iPad 7 縦向き未満をモバイル判定

  return (
    <Box
      component="footer"
      {...props}
      sx={{
        backgroundColor: theme => alpha(theme.palette.getContrastText(theme.palette.background.paper), 1),
        color: theme => theme.palette.background.paper,
        ...props.sx,
      }}
    >
      <Container
        maxWidth="md"
        sx={isMobile ? {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        } : {}}
      >
        <Box
          py={4}
          sx={isMobile ? {
            display: 'inline-flex',
            flexDirection: 'column',
            gap: theme => theme.spacing(1),
          } : {
            display: 'grid',
            gap: theme => theme.spacing(1),
            gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
            gridTemplateRows: '1fr',
          }}
        >
          <Stack
          >
            <FooterSectionTitle
            >
              関連リンク
            </FooterSectionTitle>

            <List
              dense
            >
              {[
                {
                  label: (
                      <>
                        剣城まひるの救急箱
                        <Box
                          component="span"
                          suppressHydrationWarning
                          sx={{
                            fontFamily: notoEmoji.style.fontFamily,
                          }}
                        >
                          🩹
                        </Box>
                      </>
                    ),
                  subLabel: 'Discord サーバー',
                  href: '/discord',
                  targetIsBlank: false,
                },
                {
                  label: 'このサイトについて',
                  subLabel: 'About',
                  href: '/about',
                  targetIsBlank: false,
                },
                {
                  label: 'お問い合わせ',
                  subLabel: 'Contact',
                  href: '/contact',
                  targetIsBlank: false,
                },
              ].map(item => (
                <ListItem
                  key={item.href}
                >
                  <FooterListItemText
                    {...item}
                  />
                </ListItem>
              ))}
            </List>
          </Stack>

          <Stack
          >
            <FooterSectionTitle
            >
              制作スタッフ
            </FooterSectionTitle>

            <List
              dense
            >
              {[
                {
                  label: 'ぐぐたく',
                  subLabel: 'デザイン, システム構築',
                  href: 'https://x.com/i/user/3247445996',
                  targetIsBlank: true,
                },
                {
                  label: '山田葵',
                  subLabel: 'キービジュアル',
                  href: 'https://x.com/AYamada0224',
                  targetIsBlank: true,
                },
                {
                  label: '絆創膏パシリ隊のみなさん',
                  subLabel: 'Special Thanks',
                }
              ].map((item) => (
                <ListItem
                  key={item.label}
                >
                  <FooterListItemText
                    {...item}
                  />
                </ListItem>
              ))}
            </List>
          </Stack>

          <Stack
          >
            <FooterSectionTitle
            >
              剣城まひる
            </FooterSectionTitle>

            <List
              dense
            >
              <ListItem
              >
                <ListItemIcon
                >
                  <Box
                    component="img"
                    src="/_resources/images/social/x.png"
                    sx={{
                      width: theme => theme.spacing(3),
                      height: theme => theme.spacing(3),
                      objectFit: 'contain',
                    }}
                  />
                </ListItemIcon>
                <FooterListItemText
                  label="X (旧 Twitter)"
                  subLabel="@turugi_mahiru"
                  href="https://x.com/turugi_mahiru"
                  targetIsBlank
                />
              </ListItem>

              <ListItem
              >
                <ListItemIcon
                >
                  <Box
                    component="img"
                    src="/_resources/images/social/youtube.png"
                    sx={{
                      width: theme => theme.spacing(3),
                      height: theme => theme.spacing(3),
                      objectFit: 'contain',
                    }}
                  />
                </ListItemIcon>
                <FooterListItemText
                  label="YouTube"
                  subLabel="@darekayashinatte_mahiru"
                  href="https://www.youtube.com/@darekayashinatte_mahiu"
                  targetIsBlank
                />
              </ListItem>

              <ListItem
              >
                <ListItemIcon
                >
                  <Box
                    component="img"
                    src="/_resources/images/social/pixiv-fanbox.png"
                    sx={{
                      width: theme => theme.spacing(3),
                      height: theme => theme.spacing(3),
                      objectFit: 'contain',
                    }}
                  />
                </ListItemIcon>
                <FooterListItemText
                  label="pixivFANBOX"
                  subLabel="@turugimahiru"
                  href="https://www.fanbox.cc/@turugimahiru"
                  targetIsBlank
                />
              </ListItem>
            </List>
          </Stack>
        </Box>

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
            <FooterLink
              href="https://ggtk.app/"
              target="_blank"
            >
              Stardust Sorcery
            </FooterLink>
            &nbsp;が管理・運営する非公式のファンサイトであり, 剣城まひるさんおよび所属事務所は一切関係ありません.
          </Typography>

          <Typography
            component="p"
            variant="caption"
            align="center"
          >
            <FooterLink
              href="/terms"
              target="_blank"
            >
              利用規約
            </FooterLink>
            ・
            <FooterLink
              href="/privacy"
              target="_blank"
            >
              プライバシーポリシー
            </FooterLink>
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
