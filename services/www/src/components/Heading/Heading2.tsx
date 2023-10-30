'use client';
import { notoEmoji } from "@/app/fonts";
import {
  Box,
  type BoxProps,
  Typography,
} from "@mui/material";

export default function Heading2({
  icon,
  text,
  ...props
}: BoxProps<
  any,
  {
    icon?: string;
    text: React.ReactNode;
  }
>) {
  return (
    <Box
      {...props}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        py: 1,
        px: 1,
        borderWidth: '0 0 1px 0',
        borderStyle: 'solid',
        borderColor: theme => theme.palette.mPurple.main,
        padding: theme => theme.spacing(.5, 0, .5, 1.5),
        margin: theme => theme.spacing(2, 0, 0, 0),
        ...props.sx,
      }}
    >
      {icon && (
        <Typography
          sx={{
            fontFamily: notoEmoji.style.fontFamily,
            fontSize: theme => theme.typography.h6.fontSize,
            color: theme => theme.palette.text.secondary,
            px: 1,
          }}
        >
          {icon}
        </Typography>
      )}

      <Typography
        component="h2"
        sx={{
          fontSize: theme => theme.typography.h6.fontSize,
          fontWeight: theme => theme.typography.fontWeightBold,
          ml: 1,
        }}
      >
        {text}
      </Typography>
    </Box>
  )
}
