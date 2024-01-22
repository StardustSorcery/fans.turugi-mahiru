'use client';
import { StrapiResponseData, Video } from "@/types/strapi";
import { near } from "@/utils/size";
import time2str from "@/utils/time2str";
import { Box, BoxProps, Chip, ListItemText, Paper, Stack, Typography } from "@mui/material";

export interface VideoListItemContentProps {
  video: StrapiResponseData<Video>;
  thumbnailProps?: BoxProps;
  isInProgress?: boolean;
  scheduledStartsAt?: Date;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  tags?: string[];
}

export default function VideoListItemContent({
  video,
  thumbnailProps,
  isInProgress,
  scheduledStartsAt,
  title,
  subtitle,
  tags,
}: VideoListItemContentProps) {
  return (
    <>
      <Box
        component={Paper}
        variant="outlined"
        {...thumbnailProps}
        sx={{
          aspectRatio: '16/9',
          width: theme => theme.spacing(28),
          maxWidth: '40%',
          overflow: 'hidden',
          mr: 2,
          flexShrink: 0,
          borderRadius: theme => `${theme.shape.borderRadius / 2}px`,
          ...thumbnailProps?.sx,
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
            gap={.5}
          >
            <Box
            >
              {isInProgress && (
                <Box
                  display="inline-block"
                  sx={{
                    backgroundColor: '#f00',
                    color: '#fff',
                    borderRadius: theme => `${theme.shape.borderRadius / 4}px`,
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

              {!isInProgress && scheduledStartsAt && (
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
                    {time2str(scheduledStartsAt)} 開始予定
                  </Typography>
                </Box>
              )}

              <Typography
                component="p"
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
                {title}
              </Typography>

              {subtitle && (
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
                  {subtitle}
                </Typography>
              )}
            </Box>

            {tags && tags.length > 0 && (
              <Stack
                flexDirection="row"
                columnGap={1}
                rowGap={.5}
              >
                {tags.map((label, index) => (
                  <Chip
                    key={`${label}:${index}`}
                    label={label}
                    size="small"
                  />
                ))}
              </Stack>
            )}
          </Stack>
        }
      />
    </>
  );
}
