'use client';
import { notoEmoji } from "@/app/fonts";
import {
  Box,
  type BoxProps,
  Typography,
} from "@mui/material";

export default function Heading1({
  icon,
  text,
  ...props
}: BoxProps<
  any,
  {
    icon?: React.ReactNode | string;
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
        ...props.sx,
      }}
    >
      {icon && typeof icon === 'string' ? (
        <Typography
          sx={{
            fontFamily: notoEmoji.style.fontFamily,
            fontSize: theme => theme.typography.h4.fontSize,
            color: theme => theme.palette.text.secondary,
            px: 1,
          }}
        >
          {icon}
        </Typography>
      ) : (
        icon
      )}

      <Typography
        component="h1"
        sx={{
          fontSize: theme => theme.typography.h4.fontSize,
          fontWeight: theme => theme.typography.fontWeightBold,
          ml: 1,
        }}
      >
        {text}
      </Typography>
    </Box>
  )
}
