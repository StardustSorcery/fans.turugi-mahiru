'use client';
import { MusicVideo, StrapiResponseData } from "@/types/strapi";
import { near } from "@/utils/size";
import time2str from "@/utils/time2str";
import {
  Box,
  Chip,
  ListItem,
  ListItemButton,
  ListItemProps,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

export default function MusicListItem({
  musicVideo,
  showCategory,
  ...props
}: ListItemProps<
  'li',
  {
    musicVideo: StrapiResponseData<MusicVideo>;
    showCategory?: boolean;
  }
>) {
  const video = musicVideo.attributes.video.data;
  const isOriginal = musicVideo.attributes.originalArtist.authorId === 'youtube:UCSzT-rU62SSiham-g1Dj9yw';

  return (
    <ListItem
      {...props}
    >
      <ListItemButton
        LinkComponent="a"
        target="_blank"
        href={(() => {
          switch(video.attributes.provider) {
            default: return '#';
            case 'youtube': return `https://www.youtube.com/watch?v=${video.attributes.videoId}`;
          }
        })()}
      >
        <Box
          component={Paper}
          variant="outlined"
          sx={{
            aspectRatio: '16/9',
            width: theme => theme.spacing(28),
            overflow: 'hidden',
            mr: 2,
            flexShrink: 0,
          }}
        >
          <Box
            component="img"
            display="block"
            src={
              video.attributes.thumbnails
                .find(t => t.height === near(video.attributes.thumbnails.map(t => t.height), 480))
                ?.url ||
              '/_resources/images/no-image.jpg'
            }
            alt={video.attributes.title}
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
              gap={1}
            >
              <Box
              >
                <Typography
                  component="p"
                  sx={{
                    fontSize: theme => theme.typography.h6.fontSize,
                    fontWeight: theme => theme.typography.fontWeightRegular,
                    wordBreak: 'break-all',
                  }}
                >
                  {musicVideo.attributes.title}
                </Typography>

                {!isOriginal && (
                  <Typography
                    sx={{
                      fontSize: theme => theme.typography.subtitle2.fontSize,
                      fontWeight: theme => theme.typography.fontWeightRegular,
                    }}
                  >
                    原曲: {musicVideo.attributes.originalArtist.title}
                  </Typography>
                )}
              </Box>

              <Stack
                flexDirection="row"
              >
                {showCategory && (
                  <Chip
                    label={isOriginal ? 'オリジナル楽曲' : 'カバー楽曲'}
                    size="small"
                  />
                )}
              </Stack>

              <Typography
                sx={{
                  fontSize: theme => theme.typography.caption.fontSize,
                  fontWeight: theme => theme.typography.fontWeightLight,
                }}
              >
                {video.attributes.title}
              </Typography>
            </Stack>
          }
        />
      </ListItemButton>
    </ListItem>
  );
}
