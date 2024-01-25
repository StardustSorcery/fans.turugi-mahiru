'use client';
import {
  Box,
  Typography,
  Stack,
  Tooltip,
  IconButton,
  Paper,
  StackProps,
  IconButtonProps,
} from '@mui/material';
import {
  KeyboardArrowUpRounded,
  KeyboardArrowDownRounded,
  DeleteOutlineRounded,
  WarningAmberOutlined,
} from '@mui/icons-material';
import { StrapiResponseData, Video } from '@/types/strapi';
import { near } from '@/utils/size';
import VideoListItemContent from '@/components/Video/VideoListItemContent';

export function VideoItem({
  rank = 1,
  score = 5,
  video,
  warningMessage,
  toUpperButtonDisabled = false,
  onToUpperButtonClick = () => {},
  toLowerButtonDisabled = false,
  onToLowerButtonClick = () => {},
  onDeleteButtonClick = () => {},
  ...props
}: StackProps<
  any,
  {
    rank: number;
    score: number;
    video: StrapiResponseData<Video>;
    warningMessage?: React.ReactNode;
    toUpperButtonDisabled: boolean;
    onToUpperButtonClick: IconButtonProps['onClick'];
    toLowerButtonDisabled: boolean;
    onToLowerButtonClick: IconButtonProps['onClick'];
    onDeleteButtonClick: IconButtonProps['onClick'];
  }
>) {
  return (
    <Stack
      {...props}
    >
      <Stack
        flexDirection="row"
        alignItems="center"
      >
        <Stack
          mr={1}
          alignItems="center"
        >
          <IconButton
            disabled={toUpperButtonDisabled}
            onClick={onToUpperButtonClick}
          >
            <KeyboardArrowUpRounded
            />
          </IconButton>

          <Typography
            align="center"
          >
            {rank} 位
          </Typography>
          <Typography
            variant="caption"
            color="textSecondary"
          >
            ({score} pt)
          </Typography>

          <IconButton
            disabled={toLowerButtonDisabled}
            onClick={onToLowerButtonClick}
          >
            <KeyboardArrowDownRounded
            />
          </IconButton>
        </Stack>

        <VideoListItemContent
          video={video}
          thumbnailProps={{
            sx: {
              width: theme => theme.spacing(16),
              minWidth: theme => theme.spacing(16),
            },
          }}
          title={video.attributes.title}
        />

        <Stack
        >
          <IconButton
            onClick={onDeleteButtonClick}
          >
            <DeleteOutlineRounded
            />
          </IconButton>
        </Stack>
      </Stack>

      {warningMessage && (
        <Paper
          elevation={0}
          component={Stack}
          flexDirection="row"
          alignItems="center"
          gap={1}
          px={2}
          py={1}
          sx={{
            backgroundColor: theme => theme.palette.warning.main,
            color: theme => theme.palette.warning.contrastText,
          }}
        >
          <WarningAmberOutlined
            sx={{
              width: 18,
              height: 18,
            }}
          />

          <Typography
            component="div"
            variant="body2"
          >
            {warningMessage}
          </Typography>
        </Paper>
      )}
    </Stack>
  );
}
