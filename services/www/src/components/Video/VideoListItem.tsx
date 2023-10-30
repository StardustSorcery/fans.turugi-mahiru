'use client';

import { StrapiResponseData, Video } from "@/types/strapi";
import {
  Box,
  ListItem,
  ListItemButton,
  ListItemProps,
  ListItemText,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import * as size from '@/utils/size';
import time2str from "@/utils/time2str";

export default function VideoListItem({
  video,
  ...props
}: ListItemProps<
  any,
  {
    video: StrapiResponseData<Video>;
  }
>) {
  const isMobile = useMediaQuery('(max-width:809px)'); // iPad 7 縦向き未満をモバイル判定

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
        sx={isMobile ? {
          flexDirection: 'column',
          alignItems: 'stretch',
        } : {
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
            display="block"
            src={video.attributes.thumbnails.find(t => t.width === size.near(video.attributes.thumbnails.map(t => t.width), 320))?.url || '/_resources/images/no-image.png'}
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
            >
              {video.attributes.isInProgressLiveStream && (
                <Box
                  display="inline-block"
                  sx={{
                    backgroundColor: '#f00',
                    color: '#fff',
                    borderRadius: theme => `${theme.shape.borderRadius / 2}px`,
                    px: 1,
                    mb: 1,
                  }}
                >
                  <Typography
                    component="span"
                    sx={{
                      fontSize: theme => theme.typography.subtitle2.fontSize,
                      fontWeight: theme => theme.typography.fontWeightRegular,
                    }}
                  >
                    ライブ配信中
                  </Typography>
                </Box>
              )}

              {video.attributes.isUpcomingLiveStream && video.attributes.scheduledStartsAt && (
                <Box
                  mb={1}
                >
                  <Typography
                    component="p"
                    sx={{
                      fontSize: theme => theme.typography.subtitle1.fontSize,
                      fontWeight: theme => theme.typography.fontWeightRegular,
                    }}
                  >
                    {time2str(new Date(video.attributes.scheduledStartsAt))} 開始予定
                  </Typography>
                </Box>
              )}

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
                  {video.attributes.title}
                </Typography>
              </Box>
            </Stack>
          }
        />
      </ListItemButton>
    </ListItem>
  );
}
