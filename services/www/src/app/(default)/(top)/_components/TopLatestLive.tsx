'use client';
import {
  Box,
  Paper,
  type BoxProps,
  Typography,
} from "@mui/material";

export default function TopLatestLive({
  sx = {},
  ...props
}: BoxProps): React.ReactNode {

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
        <Typography
          component="p"
          variant="h5"
        >
          次のライブ配信
        </Typography>

        <Typography
          component="p"
          variant="subtitle1"
        >
          1024/512/256 (128) 64:32 〜
        </Typography>
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
        }}
      >
      </Box>
    </Box>
  );
}
