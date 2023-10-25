'use client';
import NextLink from "next/link";
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
      sx={isMobile ? {
        flexDirection: 'column',
        alignItems: 'stretch',
        ...props.sx,
      } : {
        ...props.sx,
      }}
    >
      <Box
        component={Paper}
        variant="outlined"
        sx={isMobile ? {
          aspectRatio: '16/9',
          width: '100%',
          overflow: 'hidden',
          mb: 1,
        } : {
          aspectRatio: '16/9',
          width: theme => theme.spacing(28),
          overflow: 'hidden',
          mr: 2,
          flexShrink: 0,
        }}
      >
        <Box
          component="img"
          src={newsItem.attributes.thumbnail.data ?
            new URL(newsItem.attributes.thumbnail.data.attributes.url, process.env.NEXT_PUBLIC_CMS_PUBLIC_URL).toString()
            : '/_resources/images/no-image.jpg'
          }
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
          <Link
            component={NextLink}
            href={`/news/${newsItem.attributes.name}`}
            color="inherit"
          >
            {newsItem.attributes.title}
          </Link>
        }
        secondary={
          <Stack
            flexDirection="row"
            alignItems="center"
            gap={2}
            py={.5}
          >
            <Typography
              variant="body2"
              sx={{
                color: theme => theme.palette.text.secondary,
              }}
            >
              {date2str(new Date(newsItem.attributes.publishedAt), false)}
            </Typography>
            
            <Stack
              flexDirection="row"
              gap={1}
            >
              {newsItem.attributes.newsTags.data.sort((a,b) => a.id - b.id).map(tag => (
                <Chip
                  key={tag.id}
                  label={tag.attributes.displayName}
                  size="small"
                />
              ))}
            </Stack>
          </Stack>
        }
      />
    </ListItem>
  );
}