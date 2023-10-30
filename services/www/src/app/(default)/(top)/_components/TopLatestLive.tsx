'use client';
import { Video } from "@/types/strapi";
import date2str from "@/utils/date2str";
import {
  Box,
  Paper,
  type BoxProps,
  Typography,
} from "@mui/material";
import * as size from '@/utils/size';

export default function TopLatestLive({
  video,
  sx = {},
  ...props
}: BoxProps<
  any,
  {
    video: Video;
  }
>): React.ReactNode {

  return (
    <Box
      component={Paper}
      variant="outlined"
      display="inline-block"
      sx={{
        ...sx,
      }}
      {...props}
    >
      <Box
        sx={{
          mx: 2,
          mt: 2,
        }}
      >
        {video.isInProgressLiveStream && (
          <Typography
            component="p"
            sx={{
              fontSize: theme => theme.typography.h5.fontSize,
              fontWeight: theme => theme.typography.fontWeightBold,
            }}
          >
            現在ライブ配信中
          </Typography>
        )}

        {video.isUpcomingLiveStream && (
          <>
            <Typography
              component="p"
              sx={{
                fontSize: theme => theme.typography.h5.fontSize,
                fontWeight: theme => theme.typography.fontWeightBold,
              }}
            >
              次のライブ配信
            </Typography>

            {video.scheduledStartsAt && (
              <Typography
                component="p"
                variant="subtitle1"
              >
                {date2str(new Date(video.scheduledStartsAt), true)}
              </Typography>
            )}
          </>
        )}
      </Box>

      <Box
        component={Paper}
        elevation={0}
        sx={{
          aspectRatio: '16/9',
          overflow: 'hidden',
          mx: 2,
          my: 2,
          backgroundColor: theme => theme.palette.grey['500'],
          position: 'relative',
        }}
      >
        {(() => {
          switch(video.provider) {
            default: {
              return (
                <Box
                  component="img"
                  src={video.thumbnails.find(t => t.height === size.near(video.thumbnails.map(t => t.height), 128))?.url || '/_resources/images/no-image.png'}
                  alt={video.title}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              );
            }
            case 'youtube': {
              return (
                <>
                  <Box
                    component="img"
                    src={video.thumbnails.find(t => t.height === size.near(video.thumbnails.map(t => t.height), 128))?.url || '/_resources/images/no-image.png'}
                    alt={video.title}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />

                  <Box
                    component="iframe"
                    src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&modestbranding=1&rel=0`}
                    width="100%"
                    height="100%"
                    sx={{
                      border: 0,
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      bottom: 0,
                      left: 0,
                    }}
                  />
                </>
              );
            }
          }
        })()}
      </Box>
    </Box>
  );
}
