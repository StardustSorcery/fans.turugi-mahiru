'use client';
import {
  Box,
  type BoxProps,
} from "@mui/material";

export default function TopKeyvisual({
  sx = {},
  ...props
}: BoxProps): React.ReactNode {
  return (
    <Box
      display="inline-block"
      sx={{
        position: 'relative',
        ...sx,
      }}
      {...props}
    >
      <Box
        component="img"
        src="/_resources/images/keyvisual_tmp.png"
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: theme => theme.spacing(100),
        }}
      />
    </Box>
  )
}
