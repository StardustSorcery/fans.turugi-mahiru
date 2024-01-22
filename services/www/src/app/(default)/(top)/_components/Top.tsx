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
import { Video } from "@/types/strapi";

export default function Top({
  latestLiveStream,
  sx = {},
  ...props
}: ContainerProps<
  any,
  {
    latestLiveStream: Video | null;
  }
>): React.ReactNode {
  const isMobile = useMediaQuery('(max-width:809px)'); // iPad 7 縦向き未満をモバイル判定

  return (
    <Container
      maxWidth="xl"
      sx={(isMobile && latestLiveStream) ? {
        mb: 4,
        ...sx,
      } : {
        ...sx,
      }}
      {...props}
    >
      <Box
        sx={{
          position: 'relative',
        }}
      >
        <Box
          sx={isMobile ? {
            position: 'absolute',
            top: 0,
            right: 0,
            left: 0,
            zIndex: 1,
            overflow: 'hidden',
          } : {
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
              sx={(isMobile && latestLiveStream) ? {
                width: '100%',
                paddingTop: '120%',
              } : {
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

            {!isMobile && latestLiveStream && (
              <>
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

                <TopLatestLive
                  video={latestLiveStream}
                  sx={{
                    position: 'absolute',
                    bottom: theme => theme.spacing(4),
                    left: 0,
                    zIndex: 100,
                    width:'40%',
                    minWidth: theme => theme.spacing(45),
                  }}
                />
              </>
            )}
          </Box>
        </Box>

        {isMobile && (
          <Box
            sx={{
              position: 'relative',
              zIndex: 10,
            }}
          >
            <Box
              sx={isMobile ? {
                width: '100%',
                height: '100%',
              } : {
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
            </Box>

            {latestLiveStream && (
              <TopLatestLive
                video={latestLiveStream}
                sx={{
                  width:'100%',
                }}
              />
            )}
          </Box>
        )}
      </Box>
    </Container>
  );
}
