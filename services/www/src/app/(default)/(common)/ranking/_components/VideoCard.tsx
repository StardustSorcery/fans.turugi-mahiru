'use client';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardProps,
  Box,
  Chip,
  Paper,
  NoSsr,
} from '@mui/material';
import Link from 'next/link';
import { StrapiResponseData, Video } from '@/types/strapi';
import { near } from '@/utils/size';
import date2str from '@/utils/date2str';

export function VideoCard({
  video,
  score,
  ...props
}: CardProps<
  any,
  {
    video: StrapiResponseData<Video>;
    score: number;
  }
>) {
  return (
    <Card
      {...props}
    >
      <CardActionArea
        component={Link}
        href={(() => {
          switch(video.attributes.provider) {
            default: return '#';
            case 'youtube': {
              return `https://www.youtube.com/watch?v=${video.attributes.videoId}`;
            }
          }
        })()}
        target="_blank"
        sx={{
          width: '100%',
          height: '100%',
        }}
      >
        <Box
          sx={{
            position: 'relative',
          }}
        >
          <CardMedia
            image={
              video.attributes.thumbnails
                .find(t => t.height === near(video.attributes.thumbnails.map(t => t.height), 480))
                ?.url ||
              '/_resources/images/no-image.jpg'
            }
            sx={{
              aspectRatio: '16 / 9',
              objectFit: 'contain',
              width: '100%',
            }}
          />

          <Paper
            variant="outlined"
            sx={{
              position: 'absolute',
              bottom: theme => theme.spacing(1),
              left: theme => theme.spacing(1),
              px: 1.5,
              py: 0.25,
              borderRadius: '1000px',
            }}
          >
            <Typography
              sx={{
                fontSize: theme => theme.typography.body2.fontSize,
              }}
            >
              {score} pt
            </Typography>
          </Paper>
        </Box>
  
        <CardContent
        >
          <Typography
            component="div"
            variant="body1"
            sx={{
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
              overflow: 'hidden',
            }}
          >
            {video.attributes.title}
          </Typography>
          <Typography
            component="div"
            variant="body2"
            color="textSecondary"
            sx={{
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 1,
              overflow: 'hidden',
            }}
          >
            <NoSsr
            >
              {video.attributes.videoPublishedAt && date2str(new Date(video.attributes.videoPublishedAt))}
            </NoSsr>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
