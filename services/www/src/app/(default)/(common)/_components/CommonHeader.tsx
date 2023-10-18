'use client';
import {
  AppBar,
  type AppBarProps,
  Box,
  Stack,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import TabNavigation from "@/components/TabNavigation/TabNavigation";
import NextLink from "next/link";
import SideNavTrigger from "../../_components/SideNavigation/SideNavTrigger";

export default function CommonHeader({
  ...props
}: AppBarProps): React.ReactNode {
  const isMobile = useMediaQuery('(max-width:809px)'); // iPad 7 縦向き未満をモバイル判定

  return (
    <AppBar
      position="sticky"
      color="inherit"
      {...props}
    >
      {isMobile ? (
        <Toolbar
          disableGutters
        >
          <Stack
            flexShrink={0}
            mr={1}
            flexDirection="row"
            alignItems="center"
          >
            <SideNavTrigger
            />

            <Box
              component={NextLink}
              display="block"
              href="/"
              p={1}
            >
              <Box
                component="img"
                display="block"
                src="/_resources/images/name_kanji.png"
                sx={{
                  height: theme => theme.spacing(3),
                }}
              />
            </Box>
          </Stack>

          <Box
            flexGrow={1}
          />

          <Box
          >
          </Box>
        </Toolbar>
      ) : (
        <Toolbar
        >
          <Box
            flexShrink={0}
            mr={1}
          >
            <Box
              component={NextLink}
              display="block"
              href="/"
              p={1}
            >
              <Box
                component="img"
                display="block"
                src="/_resources/images/name_kanji.png"
                sx={{
                  height: theme => theme.spacing(4),
                }}
              />
            </Box>
          </Box>

          <Box
            flexGrow={1}
          />

          <TabNavigation
            flexShrink={1}
            sx={{
              minWidth: 0,
            }}
          />
        </Toolbar>
      )}
    </AppBar>
  );
}
