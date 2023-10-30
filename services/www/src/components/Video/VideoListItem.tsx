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
  return (
    <ListItem
      {...props}
    >
      <ListItemButton
      >
        <Box
          component={Paper}
          variant="outlined"
          sx={{
            flexShrink: 0,
            aspectRatio: '16/9',
            height: theme => theme.spacing(16),
            overflow: 'hidden',
            mr: 1,
          }}
        >
          <Box
            component="img"
            display="block"
            src={video.attributes.thumbnails.find(t => t.height === size.near(video.attributes.thumbnails.map(t => t.height), 128))?.url || '/_resources/images/no-image.png'}
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
                      fontSize: theme => theme.typography.subtitle1.fontSize,
                      fontWeight: theme => theme.typography.fontWeightRegular,
                    }}
                  >
                    ライブ配信中
                  </Typography>
                </Box>
              )}

              {video.attributes.scheduledStartsAt && (
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
