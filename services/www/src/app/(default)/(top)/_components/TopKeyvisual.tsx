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
        src="/_resources/images/keyvisual_1_1_frame.png"
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: theme => theme.spacing(100),
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none',
        }}
      />
    </Box>
  )
}
