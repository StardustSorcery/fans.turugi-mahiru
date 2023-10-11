'use client';
import {
  Box,
  type BoxProps,
} from "@mui/material";

export default function TopName({
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
        src="/_resources/images/name_kanji.png"
        display="block"
        sx={{
          position: 'relative',
          maxWidth: theme => theme.spacing(120),
          width: '100%',
        }}
      />
      <Box
        component="img"
        src="/_resources/images/name_std.png"
        display="block"
        sx={{
          position: 'relative',
          width: '80%',
        }}
      />
    </Box>
  );
}
