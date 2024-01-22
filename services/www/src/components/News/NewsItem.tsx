'use client';
import NextLink, {
  LinkProps as NextLinkProps,
} from "next/link";
import {
  ListItem,
  type ListItemProps,
  ListItemText,
  Stack,
  Link,
  Typography,
  Chip,
  Box,
  Paper,
  useMediaQuery,
  PaperProps,
} from "@mui/material";
import type {
  News,
  StrapiResponseData,
} from "@/types/strapi";
import date2str from "@/utils/date2str";

export default function NewsItem({
  cmsPublicURL,
  newsItem,
  ...props
}: ListItemProps<
  any,
  {
    newsItem: StrapiResponseData<News>;
  }
>): React.ReactNode {
  const isMobile = useMediaQuery('(max-width:809px)'); // iPad 7 縦向き未満をモバイル判定

  return (
    <ListItem
      {...props}
    >
      <Box
        component={(props: PaperProps<'a', NextLinkProps>) => (
          <Paper
            component={NextLink}
            {...props}
          />
        )}
        href={`/news/${newsItem.attributes.name}`}
        variant="outlined"
        sx={{
          aspectRatio: '16/9',
          width: theme => theme.spacing(28),
          maxWidth: '40%',
          overflow: 'hidden',
          mr: 2,
          flexShrink: 0,
          borderRadius: theme => `${theme.shape.borderRadius / 2}px`,
        }}
      >
        <Box
          component="img"
          display="block"
          src={
            newsItem.attributes.thumbnail.data
              ? new URL(newsItem.attributes.thumbnail.data.attributes.url, process.env.NEXT_PUBLIC_CMS_PUBLIC_URL).toString()
              : '/_resources/images/no-image.jpg'
          }
          alt={newsItem.attributes.title}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Box>

      <ListItemText
        disableTypography
        primary={
          <Stack
            alignItems="flex-start"
            gap={.5}
          >
            <Link
              component={NextLink}
              href={`/news/${newsItem.attributes.name}`}
              color="inherit"
              sx={{
                fontSize: theme => theme.typography.body1.fontSize,
                fontWeight: theme => theme.typography.fontWeightRegular,
                wordBreak: 'break-all',
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 2,
                overflow: 'hidden',
              }}
            >
              {newsItem.attributes.title}
            </Link>

            <Typography
              sx={{
                fontSize: theme => theme.typography.subtitle2.fontSize,
                fontWeight: theme => theme.typography.fontWeightRegular,
                color: theme => theme.palette.text.secondary,
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 1,
                overflow: 'hidden',
              }}
            >
              {date2str(new Date(newsItem.attributes.publishedAt), false)}
            </Typography>

            {newsItem.attributes.newsTags.data.length > 0 && (
              <Stack
                flexDirection="row"
                flexWrap="wrap"
                columnGap={1}
                rowGap={.5}
              >
                {
                  newsItem.attributes.newsTags.data
                    .sort((a,b) => a.id - b.id)
                    .map(tag => (
                      <Chip
                        key={tag.id}
                        label={tag.attributes.displayName}
                        size="small"
                      />
                    ))
                }
              </Stack>
            )}
          </Stack>
        }
      />
    </ListItem>
  );
}