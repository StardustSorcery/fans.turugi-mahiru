'use client';
import TopName from "./TopName";
import TopKeyvisual from "./TopKeyvisual";

import {
  Box,
  Container,
  type ContainerProps,
  useMediaQuery,
} from "@mui/material";
import TopLatestLive from "./TopLatestLive";

export default function Top({
  sx = {},
  ...props
}: ContainerProps): React.ReactNode {
  const isMobile = useMediaQuery('(max-width:809px)'); // iPad 7 縦向き未満をモバイル判定

  return (
    <Container
      maxWidth="xl"
      sx={{
        ...sx,
      }}
      {...props}
    >
      <Box
        sx={{
          overflow: 'hidden',
        }}
      >
        <Box
          sx={isMobile ? {
            position: 'relative',
            width: '100%',
            height: '100%',
          } : {
            position: 'relative',
            width: '100%',
            height: '100%',
            maxHeight: theme => theme.spacing(120),
          }}
        >
          <Box
            sx={{
              width: '100%',
              paddingTop: '100%',
            }}
          />

          <TopName
            sx={{
              position: 'absolute',
              top: theme => theme.spacing(7),
              left: 0,
              zIndex: 1,
            }}
          />

          <TopKeyvisual
            sx={{
              position: 'absolute',
              top: theme => theme.spacing(11),
              right: 0,
              zIndex: 10,
            }}
          />

          <Box
            sx={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: '50%',
              width: '100dvw',
              transform: 'translateX(-50%)',
              zIndex: 99,
            }}
          />

          {!isMobile && (
            <TopLatestLive
              sx={{
                position: 'absolute',
                bottom: theme => theme.spacing(4),
                left: 0,
                zIndex: 100,
                width:'40%',
                minWidth: theme => theme.spacing(45),
              }}
            />
          )}
        </Box>
      </Box>

      {isMobile && (
        <TopLatestLive
          sx={{
            width:'100%',
          }}
        />
      )}
    </Container>
  );
}
